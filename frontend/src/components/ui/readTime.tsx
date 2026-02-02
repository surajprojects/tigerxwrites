import { ClockIcon } from "@heroicons/react/24/outline";

export default function ReadTime({
  content = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.",
}: {
  content?: string;
}) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(" ").length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return (
    <>
      <p className="flex justify-center items-center font-sans text-sm">
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>
          {minutes} {minutes > 1 ? "mins" : "min"} read
        </span>
      </p>
    </>
  );
}
