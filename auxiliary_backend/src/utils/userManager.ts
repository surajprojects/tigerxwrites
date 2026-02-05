import { Response } from "express";

export interface UserManager {
  addUser(user: Response): void;
  removeUser(user: Response): void;
  broadcast(message: string): void;
}

export abstract class BaseUserManager implements UserManager {
  protected users: Response[] = [];

  abstract addUser(user: Response): void;
  abstract removeUser(user: Response): void;
  abstract broadcast(message: string): void;
}

export class InMemoryUserManager extends BaseUserManager {
  private static instance: InMemoryUserManager;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new InMemoryUserManager();
    }
    return this.instance;
  }

  addUser(user: Response) {
    this.users.push(user);
  }

  removeUser(user: Response) {
    const index = this.users.indexOf(user);
    if (index !== -1) this.users.splice(index, 1);
  }

  broadcast(message: string) {
    console.log("Broadcasting to memory users:", message, this.users.length);
    for (const user of this.users) {
      user.write(`data:${message}\n\n`);
    }
  }
}

export const inMemoryUserManager = InMemoryUserManager.getInstance();

// export class RedisUserManager extends BaseUserManager {
//   constructor(private redisClient: Redis) {
//     super();
//   }

//   async addUser(user: User) {
//     await this.redisClient.sadd("online_users", user.id);
//   }

//   async removeUser(userId: string) {
//     await this.redisClient.srem("online_users", userId);
//   }

//   async broadcast(message: string) {
//     await this.redisClient.publish("broadcast_channel", message);
//   }
// }

// export const redisUserManager = RedisUserManager.g
