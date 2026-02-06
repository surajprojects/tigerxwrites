import { useNavigate } from "react-router-dom";
import type { Blog } from "../../utils/types/blog";

export default function NotificationData({
  blogData,
  toggleShowUpdates,
}: {
  blogData: Blog;
  toggleShowUpdates: () => void;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          toggleShowUpdates();
          navigate(`/blogs/${blogData.id}`);
        }}
        className="border border-gray-200 p-2 rounded-xl bg-gray-50/30 hover:bg-gray-50/60 cursor-pointer"
      >
        <p className="text-sm text-gray-700">{blogData.title}</p>
        {/* <p className="text-right text-xs italic text-gray-600">--{blogData.author}</p> */}
      </div>
    </>
  );
}
