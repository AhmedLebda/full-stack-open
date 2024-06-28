import SectionHeader from "./SectionHeader";
import BlogDetails from "./BlogDetails";

const Blogs = ({ blogsData, author, onBlogLike, onBlogDelete }) => {
    const blogElements =
        blogsData.length > 0 &&
        blogsData.map((blog) => (
            <BlogDetails
                key={blog.id}
                blog={blog}
                author={author}
                onBlogLike={onBlogLike}
                onBlogDelete={onBlogDelete}
            />
        ));

    return (
        <div className="mt-8">
            <SectionHeader text="All blogs" />
            {blogElements}
        </div>
    );
};

export default Blogs;
