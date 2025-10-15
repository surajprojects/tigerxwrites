import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
import { errorHandle } from "../utils/errors/errorHandle";

export function useUser() {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [userId, setUserId] = useState<string>("");
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const result = await axiosInstance.get("/user/me");
                setUserId(result.data.userId);
            } catch (error) {
                errorHandle(error);
            }
            setIsLoading(false);
        }
        getData();
    }, []);
    return { userId, isLoading };
};