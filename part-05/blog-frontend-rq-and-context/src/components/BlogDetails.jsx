import { useState } from "react";
// Custom hooks
import useNotification from "../contexts/notification/useNotification";
import useUser from "../contexts/user/useUser";
// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// React Router
import { useParams, Link, Navigate } from "react-router-dom";
// API
import BlogApi from "../api/blog";

const BlogDetails = () => {
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    const {
        data: blog,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["blogs", id],
        queryFn: () => BlogApi.getBlogById(id),
    });

    // context
    const { showNotification } = useNotification();
    const userActions = useUser();
    const currentUsername = userActions.getUsername();
    const blogAuthorUsername = blog?.user.username;
    const isBlogOwner = currentUsername === blogAuthorUsername;
    const accessToken = userActions.getAccessToken();

    // React Query: Mutations
    const queryClient = useQueryClient();

    const likeMutation = useMutation({
        mutationFn: ({ accessToken, blog }) =>
            BlogApi.likeBlog(accessToken, blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs", id] });
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
            queryClient.invalidateQueries({ queryKey: ["blogs", id] });
            showNotification("success", "Blog deleted");
            setRedirect(true);
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", e.message);
        },
    });

    // Event Handlers:
    const handleBlogLike = async (blog) => {
        likeMutation.mutate({ accessToken, blog });
    };

    const handleBlogDelete = async (blogId) => {
        deleteMutation.mutate({ accessToken, blogId });
    };

    if (isLoading) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    if (redirect) return <Navigate to="/blogs" />;

    return (
        <div id={blog.id} className="p-4 mb-4 rounded-md">
            <header className="flex gap-2 items-center justify-between mb-4 border-b-2 pb-2">
                <div className="flex gap-2 items-center">
                    <span className="w-8 h-8 flex items-center justify-center font-bold text-xs rounded-full bg-gray-600 text-white capitalize">
                        {blog.user.name.slice(0, 1)}
                    </span>
                    <Link
                        to={`/users/${blog.user.id}`}
                        className="text-blue-500 font-serif italic font-bold"
                    >
                        {blog.user.name}
                    </Link>
                </div>

                {/* Only show the delete button if the current user is the owner of the blog */}
                {isBlogOwner && (
                    <button
                        className="border p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleBlogDelete(blog.id)}
                    >
                        Delete
                    </button>
                )}
            </header>
            <p className="capitalize font-bold text-2xl text-slate-800 mb-4">
                {blog.title}
            </p>

            <div>
                <a href="#" className="text-blue-500 underline">
                    {blog.url}
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
        </div>
    );
};

export default BlogDetails;
