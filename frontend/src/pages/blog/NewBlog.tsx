import BlogForm from "../../components/blog/blogForm";
import type { BlogInput } from "../../utils/types/blogInput";

export default function NewBlog() {
    const handleSubmit = async (formData: BlogInput) => {
        try {
            console.log(formData);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    return (
        <>
            <section>
                <BlogForm handleSubmit={handleSubmit} />
            </section>
        </>
    );
};