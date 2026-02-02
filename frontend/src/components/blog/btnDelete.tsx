import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { errorHandle } from "../../utils/errors/errorHandle";

export default function BtnDelete({ blogId }: { blogId: string }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await axiosInstance.delete(`/blog/${blogId}`);
      navigate("/blogs");
      toast.success("Blog deleted successfully!!!");
    } catch (error) {
      errorHandle(error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-red-500 mx-2 rounded-md px-2 py-1 hover:cursor-pointer"
      >
        Delete
      </button>
    </>
  );
}
