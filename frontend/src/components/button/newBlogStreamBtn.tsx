import Spinner from "../ui/spinner";
import { useContext, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { BlogStreamContext } from "../../store/streamContext";
import NotificationCard from "../notification/notificationCard";
import NotificationData from "../notification/notificationData";

export default function NewBlogStreamBtn() {
  const blogs = useContext(BlogStreamContext);
  const [showUpdates, setShowUpdates] = useState<boolean>(false);

  const toggleShowUpdates = () => {
    setShowUpdates((prevData) => !prevData);
  };
  return (
    <>
      <button
        onClick={toggleShowUpdates}
        className="mx-1.5 duration-300 transition ease-in-out cursor-pointer hover:text-orange-500"
      >
        <div>
          <div className="size-2 bg-orange-500/80 absolute rounded-full animate-pulse translate-x-2.5"></div>
          <BellIcon className="size-5" />
        </div>
      </button>
      {showUpdates && (
        <NotificationCard>
          {blogs.isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner customize={true} />
            </div>
          ) : blogs.blogs.length > 0 ? (
            blogs.blogs.map((newBlog) => {
              return (
                <NotificationData
                  key={newBlog.id}
                  blogData={newBlog}
                  toggleShowUpdates={toggleShowUpdates}
                />
              );
            })
          ) : (
            <p className="text-center mt-2 font-normal text-xs">No new blog posted!!!</p>
          )}
        </NotificationCard>
      )}
    </>
  );
}
