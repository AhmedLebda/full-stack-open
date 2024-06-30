// Components
import SectionHeader from "./SectionHeader";
import BlogDetails from "./BlogDetails";
// React Query
import { useQuery } from "@tanstack/react-query";
// API
import BlogApi from "../api/blog";

// Get all blogs
const Blogs = () => {
    const {
        data: blogs,
        error,
        isPending,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: BlogApi.getAllBlogs,
    });

    const blogElements = blogs?.map((blog) => (
        <BlogDetails key={blog.id} blog={blog} />
    ));

    if (isPending) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    return (
        <div className="mt-8">
            <SectionHeader text="All blogs" />
            {blogElements}
        </div>
    );
};

export default Blogs;
