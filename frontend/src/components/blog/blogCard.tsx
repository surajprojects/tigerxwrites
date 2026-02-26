import NameDate from "../ui/nameDate";
import ReadTime from "../ui/readTime";
import UserAvatar from "../ui/userAvatar";
import { useNavigate } from "react-router-dom";
import EditBlogBtn from "../button/editBlogBtn";
import type { Blog } from "../../utils/types/blog";
import DeleteBlogBtn from "../button/deleteBlogBtn";
import type { DeepPartial } from "../../utils/utils";

export default function BlogCard({
  id = "#",
  title = "The Art of Storytelling in the Digital Age",
  excerpt = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates consequuntur quae, perferendis error.",
  content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, nostrum cupiditate architecto doloremque ducimus earum. Eligendi, impedit ipsam nemo, aliquam excepturi tempora velit alias ad voluptatum eveniet nulla, provident fugiat.",
  createdAt = "2025-10-08",
  author = {
    name: "Sarah Chen",
  },
  showBtns = false,
}: DeepPartial<Blog> & { showBtns?: boolean }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white w-full p-6 rounded-lg border border-[#ebe6e0] hover:shadow-xl hover:shadow-orange-200 duration-300 ease-out">
        {/* Title & Excerpt */}
        <div
          onClick={() => navigate(`/blogs/${id}`)}
          className="border-b border-[#ebe6e0] hover:cursor-pointer hover:text-orange-500 ease-out duration-200"
        >
          <h6 className="font-bold text-2xl my-2 ">{title}</h6>
          <p className="text-[#7c706a] my-4 line-clamp-3">{excerpt}</p>
        </div>
        {/* Author & Posted On */}
        <div className="flex justify-between mt-4 items-center text-[#7c706a] text-sm">
          <div className="flex items-center">
            <UserAvatar name={author.name} size="SMALL" />
            <NameDate name={author.name} date={createdAt} size="SMALL" />
          </div>
          <ReadTime content={content} />
        </div>
        {/* Buttons */}
        {showBtns && (
          <div className="w-full flex mt-5 border-t border-[#ebe6e0] pt-4">
            <EditBlogBtn linkTo={`/blogs/${id}/edit`} />
            <DeleteBlogBtn blogId={id} />
          </div>
        )}
      </div>
    </>
  );
}
