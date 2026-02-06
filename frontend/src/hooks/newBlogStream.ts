import { useEffect, useState } from "react";
import type { Blogs } from "../utils/types/blog";
import { VITE_SSE_API_URL } from "../../base.config";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function useNewBlogStream() {
  const [blogsData, setBlogsData] = useState<Blogs>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchEventSource(`${VITE_SSE_API_URL}stream`, {
      method: "POST",
      signal: controller.signal,

      onmessage(event) {
        try {
          const blog = JSON.parse(event.data);
          setBlogsData((prevData) => [...prevData, blog]);
        } catch (error) {
          console.warn("Invalid SSE data!!!", error);
        }
      },

      onclose() {
        console.log("Stream connection closed!!!");
      },

      onerror(err) {
        console.error("Stream error", err);
      },
    });

    return () => controller.abort();
  }, []);

  return { blogsData };
}
