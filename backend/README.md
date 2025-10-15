---

# Tiger Writes Backend

This is the backend for the **Tiger Writes** blogging web app. It is built using **Hono**, **Prisma**, and serverless architecture deployed on **Cloudflare Workers** using **Wrangler**.

## Features

- User authentication (register, login, logout)  
- CRUD operations for blogs (create, read, update, delete)  
- Password hashing with `bcryptjs`  
- JWT-based authentication for secure API access  
- Input validation with `zod`  
- Serverless deployment using Cloudflare Workers  
- Prisma ORM for database management  

## Tech Stack

- **Hono** – Lightweight backend framework  
- **Prisma** – ORM for database interaction  
- **bcryptjs** – Password hashing  
- **jsonwebtoken** – JWT-based authentication  
- **Zod** – Schema validation  
- **TypeScript** – Type-safe development  
- **Cloudflare Workers** – Serverless deployment  
- **Wrangler** – Tool for deploying on Cloudflare  

## Deployment

This backend is deployed using [Cloudflare](https://www.cloudflare.com/) by Tiger. You can access the live version here: [Tiger Writes Backend](https://tigerwrites.suraj23082002.workers.dev/api/v1/blog/bulk)

## How to Run Locally

1. Clone the repository  
2. Install dependencies
3. Set up environment variables (JWT_SECRET, database URL, etc.)
4. Run development server
5. Test APIs locally

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---