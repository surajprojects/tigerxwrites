---

# Auxiliary Backend

This is the backend service for handling real-time push notifications in the Tiger Writes ecosystem. It is built using Express and leverages Server-Sent Events (SSE) to notify clients whenever a new blog is published.

## Features

- Real-time push notifications using Server-Sent Events (SSE)
- Dedicated endpoint for streaming updates to connected clients
- Event-driven architecture for blog publish notifications
- Lightweight and fast Express-based server
- Redis integration for scalable pub/sub messaging
- Environment-based configuration using dotenv
- CORS-enabled for cross-origin requests
- Type-safe development with TypeScript
- Unit testing support with Vitest

## Tech Stack

- Express – Backend framework
- Redis – Pub/Sub for event broadcasting
- Server-Sent Events (SSE) – Real-time communication
- dotenv – Environment variable management
- CORS – Cross-origin support
- TypeScript – Type safety
- Vitest – Testing framework
- ESLint + Prettier – Code linting & formatting

## How It Works

- When a new blog is created in the main backend
    - An event is published (optionally via Redis pub/sub)
- This service listens for that event
- Connected clients (via SSE endpoint) instantly receive a notification

## Deployment

This backend is deployed using [Render](https://render.com) by Tiger. You can access the live version here [Tiger Writes Auxiliary Backend](https://tigerxwrites.onrender.com)

## How to Run Locally

1. Clone the repository  
2. Navigate to the folder
3. Install dependencies
4. Set up environment variables
5. Run development server
6. Test API locally

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---
