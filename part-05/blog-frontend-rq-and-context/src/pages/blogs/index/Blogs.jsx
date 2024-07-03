// Components
import SectionHeader from "../../../components/SectionHeader";
import BlogDetails from "../../../components/BlogDetails";
// React Query
import { useQuery } from "@tanstack/react-query";
// API
import BlogApi from "../../../api/blog";
// React Router
import { Link } from "react-router-dom";

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

    const blogsList = blogs?.map((blog) => (
        <li className=" capitalize font-bold text-lg p-4 border-b-2">
            <Link
                key={blog.id}
                to={blog.id}
                className="text-blue-600 hover:text-blue-800 "
            >
                {blog.title}
            </Link>
        </li>
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
            <ul className="list-disc px-8">{blogsList}</ul>
        </div>
    );
};

export default Blogs;
