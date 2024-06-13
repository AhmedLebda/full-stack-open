import SectionHeader from "./SectionHeader";
import OptionButton from "./OptionButton";

const Blogs = ({ blogsData }) => {
    const blogElements =
        blogsData &&
        blogsData.map((blog) => {
            return (
                <div
                    key={blog.id}
                    id={blog.id}
                    className="p-4 border-l-4 border-blue-900 mb-2 rounded-md shadow-md"
                >
                    <p className="capitalize font-bold text-2xl text-slate-800 mb-4">
                        {blog.title}
                    </p>
                    <a href="#" className="text-blue-500 underline">
                        {" "}
                        {blog.url}{" "}
                    </a>
                    <footer>
                        <div className="flex gap-4 justify-end mb-4">
                            <p>{blog.likes} Likes</p>
                            <p>0 Comments</p>
                            <p>0 Shares</p>
                        </div>
                        <div className="flex gap-6 ">
                            <OptionButton text="like" />
                            <OptionButton text="comment" />
                            <OptionButton text="share" />
                        </div>
                    </footer>
                </div>
            );
        });

    return (
        <div className="mt-8">
            <SectionHeader text="All blogs" />
            {blogElements}
        </div>
    );
};

export default Blogs;
