import NameDate from "../ui/nameDate";
import ReadTime from "../ui/readTime";
import UserAvatar from "../ui/userAvatar";
import type { Blog } from "../../utils/types/blog";
import type { DeepPartial } from "../../utils/utils";

export default function ShowBlog({
  title = "Title",
  excerpt = "Excerpt",
  content = "Content",
  createdAt = "2025-10-08",
  author = {
    name: "Author Name",
    bio: "Author Bio",
  },
}: DeepPartial<Blog>) {
  return (
    <>
      <div className="w-full md:w-3xl px-4 md:px-8 mx-auto">
        <h1 className="text-5xl md:text-6xl text-[#2a2522] font-bold mb-8">{title}</h1>
        <div className="flex mt-4 items-center text-[#7c706a] text-sm border-b pb-7 border-[#ebe6e0]">
          <div className="flex items-center">
            <UserAvatar name={author.name} size="NORMAL" />
            <div className="ml-2">
              <NameDate name={author.name} date={createdAt} size="NORMAL" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">•</span>
            <div className="">
              <ReadTime content={content} />
            </div>
          </div>
        </div>
        <p className="text-slate-800 leading-7 my-8">{excerpt}</p>
        <p className="text-slate-800 leading-7 my-8 mb-10">{content}</p>
        <div className="flex items-center border-t border-[#ebe6e0] pt-8">
          <UserAvatar name={author.name} size="LARGE" />
          <div className="mx-4 font-sans">
            <p className="font-bold text-[#2a2522] text-lg">{author.name}</p>
            <p className="text-[#7c706a] mt-2">{author.bio ? author.bio : "Placeholder bio..."}</p>
          </div>
        </div>
      </div>
    </>
  );
}
