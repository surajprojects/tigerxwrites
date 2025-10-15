---

# Tiger Writes

Tiger Writes is a full-stack **blogging web app** built with a modern serverless architecture.  
It allows users to create, edit, and read blogs — powered by **Hono (Cloudflare Workers)** on the backend, **React + Vite** on the frontend, and a custom **shared npm package** for type-safe validation using Zod.

## Tech Stack

### Shared Package (`@tigerxinsights/tigerxwrites`)
A published npm package containing **Zod validation schemas** and **TypeScript types** for both backend and frontend.

#### Features
- Input validation for user signup/login and blog CRUD.
- Type-safe data models shared across backend and frontend.
- Published to npm: `@tigerxinsights/tigerxwrites`

#### Tech Used
- Zod
- TypeScript

### Backend (Hono + Cloudflare Workers)

#### Overview
- Built using **Hono** framework.
- Deployed serverlessly via **Cloudflare Workers** using **Wrangler**.
- Uses **Prisma ORM** with **Accelerate Extension** for database management.
- Implements authentication using **JWT** and **bcryptjs**.

#### Key Packages
```
"hono", "jsonwebtoken", "bcryptjs", "prisma", "@prisma/client",
"@prisma/extension-accelerate", "zod"
```

#### Dev Tools
```
"wrangler", "typescript", "vitest", "@cloudflare/vitest-pool-workers"
```

#### Scripts Example
```bash
# Run local dev environment
pnpm dev

# Deploy to Cloudflare
pnpm deploy
```

### Frontend (React + Vite + TailwindCSS)

#### Overview
- Built using **Vite + React**.
- Styled with **TailwindCSS** and **Heroicons**.
- Routing handled with **React Router v7**.
- Toast notifications with **React Toastify**.
- Uses the shared npm package for type-safe communication with backend.

#### Key Packages
```
"react", "react-router-dom", "axios", "react-toastify",
"@heroicons/react", "@tigerxinsights/tigerxwrites"
```

#### Dev Tools
```
"vite", "eslint", "typescript", "@vitejs/plugin-react"
```

#### Scripts Example
```bash
# Run frontend
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Folder Structure

```
tiger-writes/
├── packages/                 # Shared npm package (Zod + Types)
│   └── tigerxwrites/         
├── backend/                  # Hono + Cloudflare Worker backend
│   ├── src/
│   ├── prisma/
│   └── wrangler.toml
├── frontend/                 # React + Vite frontend
│   ├── src/
│   └── index.html
└── README.md
```

## Setup Instructions

1. Clone the repo
2. Install dependencies
3. Run each part
4. Deploy

## Key Concepts
- Full-stack **Type safety** via shared npm package.
- **Serverless backend** on Cloudflare Workers.
- **Fast frontend** with Vite + React.
- Secure authentication using JWT and bcrypt.
- Modern dev tools: TypeScript, ESLint, Vitest.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---