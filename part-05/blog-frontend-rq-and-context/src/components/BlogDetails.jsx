import { useState } from "react";
// Custom hooks
import useNotification from "../contexts/notification/useNotification";
import useUser from "../contexts/user/useUser";
// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import BlogApi from "../api/blog";

const BlogDetails = ({ blog }) => {
    // View blog details state
    const [viewDetails, setViewDetails] = useState(false);

    // context
    const { showNotification } = useNotification();
    const userActions = useUser();
    const author = userActions.getName();
    const accessToken = userActions.getAccessToken();

    // React Query: Mutations
    const queryClient = useQueryClient();

    const likeMutation = useMutation({
        mutationFn: ({ accessToken, blog }) =>
            BlogApi.likeBlog(accessToken, blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            showNotification("success", "Blog Liked");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", e.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: ({ accessToken, blogId }) =>
            BlogApi.deleteBlog(accessToken, blogId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            showNotification("success", "Blog deleted");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", e.message);
        },
    });

    // Only show delete button on posts of the logged in user
    const showDeleteButton = (currentUser, blogAuthor) => {
        return currentUser === blogAuthor;
    };

    // Event Handlers:
    const handleBlogLike = async (blog) => {
        likeMutation.mutate({ accessToken, blog });
    };

    const handleBlogDelete = async (blogId) => {
        deleteMutation.mutate({ accessToken, blogId });
    };

    return (
        <div
            id={blog.id}
            className="p-4 border-l-4 border-blue-900 mb-4 rounded-md shadow-md"
        >
            <header className="flex gap-2 items-center justify-between mb-4 border-b-2 pb-2">
                <div className="flex gap-2 items-center">
                    <span className="w-8 h-8 flex items-center justify-center font-bold text-xs rounded-full bg-gray-600 text-white capitalize">
                        {blog.user.name.slice(0, 1)}
                    </span>
                    <a
                        href="#"
                        className="text-blue-500 font-serif italic font-bold"
                    >
                        {blog.user.name}
                    </a>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        className="border p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                        onClick={() => setViewDetails(!viewDetails)}
                    >
                        {viewDetails ? "collapse" : "expand"}
                    </button>
                    {showDeleteButton(author, blog.user.name) && (
                        <button
                            className="border p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                            onClick={() => handleBlogDelete(blog.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </header>
            <p className="capitalize font-bold text-2xl text-slate-800 mb-4">
                {blog.title}
            </p>
            {viewDetails && (
                <div>
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
                            <button
                                className="bg-slate-900 hover:bg-slate-950 rounded-md px-6 py-2 font-bold capitalize text-white"
                                onClick={() => handleBlogLike(blog)}
                            >
                                like
                            </button>
                            <button className="bg-slate-900 hover:bg-slate-950 rounded-md px-6 py-2 font-bold capitalize text-white">
                                comment
                            </button>
                            <button className="bg-slate-900 hover:bg-slate-950 rounded-md px-6 py-2 font-bold capitalize text-white">
                                share
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;
