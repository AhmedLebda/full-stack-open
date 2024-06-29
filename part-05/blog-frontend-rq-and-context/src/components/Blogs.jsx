import SectionHeader from "./SectionHeader";
import BlogDetails from "./BlogDetails";

import { useSelector } from "react-redux";

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs);

    const blogElements =
        blogs.length > 0 &&
        blogs.map((blog) => <BlogDetails key={blog.id} blog={blog} />);

    return (
        <div className="mt-8">
            <SectionHeader text="All blogs" />
            {blogElements}
        </div>
    );
};

export default Blogs;
