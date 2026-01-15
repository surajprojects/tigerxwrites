import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "https://api.tigerxwrites.codax.cloud/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;