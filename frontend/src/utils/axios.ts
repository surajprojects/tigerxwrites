import axios from "axios";
import { VITE_API_URL } from "../../base.config";

const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;