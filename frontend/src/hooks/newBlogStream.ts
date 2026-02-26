import { useEffect, useState } from "react";
import type { Blogs } from "../utils/types/blog";
import { VITE_SSE_API_URL } from "../../base.config";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export function useNewBlogStream() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogsData, setBlogsData] = useState<Blogs>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchEventSource(`${VITE_SSE_API_URL}stream`, {
      method: "POST",
      signal: controller.signal,

      async onopen(response) {
        if (response.ok && response.headers.get("content-type") === "text/event-stream") {
          setIsLoading(false);
          return; // everything's good
        }
      },

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
        setIsLoading(true);
      },
    });

    return () => controller.abort();
  }, []);

  return { blogsData, isLoading };
}
