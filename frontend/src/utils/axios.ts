import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8787/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;