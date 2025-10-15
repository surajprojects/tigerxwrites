import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://tigerwrites.suraj23082002.workers.dev/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosInstance;