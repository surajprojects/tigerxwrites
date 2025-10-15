---

# Tiger Writes Frontend

This is the **frontend** of the Tiger Writes blogging platform — a modern, minimal, and responsive web app built using **React + Vite**.  
It allows users to **register, log in, create blogs, edit, delete, and read** other users’ blogs.  
Each user can manage only their own blogs, while all blogs remain publicly viewable.

## Features

- **Authentication** (Register, Login, Logout)  
- **Create, Edit, Delete Blogs**  
- **View All Blogs** (publicly visible)  
- User-specific access control (only creator can edit/delete their blogs)  
- JWT-based authentication stored securely in cookies  
- Integrated with custom validation package `@tigerxinsights/tigerxwrites`  
- Toast notifications for actions and errors  
- Responsive UI built with **Tailwind CSS**  

## Technologies Used

- **Vite** – Lightning-fast development environment  
- **React 19** – Component-based frontend library  
- **TypeScript** – Type-safe development  
- **Tailwind CSS** – Utility-first CSS framework  
- **React Router DOM v7** – Client-side routing  
- **Axios** – API communication  
- **React Toastify** – Notifications  
- **Heroicons** – Icon set for UI elements  
- **@tigerxinsights/tigerxwrites** – Shared validation and type package  

## ScreenShots

![Screenshot](tiger-writes-frontend.jpg)

## Deployment

This frontend is deployed using [Vercel](https://vercel.com/) by Tiger. You can access the live version here: [Tiger Writes Frontend](https://tigerxwrites.vercel.app/)

## Installation & Setup

1. Clone the repository
2. Navigate to the folder
3. Install dependencies
4. Start the development server
5. Open the app in your browser at http://localhost:5173

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Made with ❤️ by Tiger

---