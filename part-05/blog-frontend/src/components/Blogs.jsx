import SectionHeader from "./SectionHeader";
import BlogDetails from "./BlogDetails";

const Blogs = ({ blogsData, author, onBlogLike, onBlogDelete }) => {
    const blogElements =
        blogsData &&
        blogsData
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
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
