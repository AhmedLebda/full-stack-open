// Components
import SectionHeader from "../../../components/SectionHeader";
import BlogDetails from "../../../components/BlogDetails";
// React Query
import { useQuery } from "@tanstack/react-query";
// API
import BlogApi from "../../../api/blog";

// Get all blogs
const Blogs = () => {
    const {
        data: blogs,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: BlogApi.getAllBlogs,
    });

    if (error) console.log(error);

    const blogElements = blogs?.map((blog) => (
        <BlogDetails key={blog.id} blog={blog} />
    ));

    if (isLoading) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error)
        return (
            <pre>
                An error has occurred: Server is down right now please try again
                later
            </pre>
        );

    return (
        <div className="mt-8">
            <SectionHeader text="All blogs" />
            {blogElements}
        </div>
    );
};

export default Blogs;
