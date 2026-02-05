import { useEffect, useState } from "react";
import { VITE_SSE_API_URL } from "../../base.config";
import { errorHandle } from "../utils/errors/errorHandle";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function useNewBlogStream() {
  const [blogsData, setBlogsData] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchEventSource(`${VITE_SSE_API_URL}stream`, {
      method: "POST",
      signal: controller.signal,

      onmessage(event) {
        setBlogsData((prevData) => [...prevData, event.data]);
      },

      onclose() {
        console.log("Stream connection closed!!!");
      },

      onerror(err) {
        console.error("Stream error", err);
        errorHandle(err);
      },
    });

    return () => controller.abort();
  }, []);

  return { blogsData };
}
