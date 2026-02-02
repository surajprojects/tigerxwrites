export default function BlogSkeletonCard() {
  return (
    <>
      <div className="bg-white w-full p-6 rounded-lg border border-[#ebe6e0] animate-pulse">
        {/* Title & Excerpt */}
        <div className="border-b border-[#ebe6e0] hover:cursor-pointer hover:text-orange-500 ease-out duration-200">
          <h6 className="my-2 w-full bg-gray-200 h-8 rounded-md"></h6>
          <h6 className="my-2 w-64 bg-gray-200 h-8 rounded-md"></h6>
          <p className="mt-4 line-clamp-3 h-4 bg-gray-200 rounded-sm w-full"></p>
          <p className="my-2 line-clamp-3 h-4 bg-gray-200 rounded-sm w-full"></p>
          <p className="line-clamp-3 h-4 bg-gray-200 rounded-sm w-64"></p>
        </div>
        {/* Author & Posted On */}
        <div className="flex justify-between mt-5 items-center">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <div className="bg-gray-200 rounded-full size-8"></div>
            </div>
            <div className="mx-3">
              <p className="bg-gray-200 rounded-sm w-14 h-4"></p>
              <p className="bg-gray-200 rounded-sm w-20 mt-2 h-3.5"></p>
            </div>
          </div>
          <p className="w-14 h-4 bg-gray-200 rounded-sm"></p>
        </div>
      </div>
    </>
  );
}
