import { Redis } from "@upstash/redis";

export async function clearCache(redis: Redis, matchKey: string) {
  let cursor = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: matchKey,
      count: 200,
    });

    cursor = Number(nextCursor);

    if (keys.length) {
      await redis.del(...keys);
    }
  } while (cursor !== 0);
}

export { Redis } from "@upstash/redis";
