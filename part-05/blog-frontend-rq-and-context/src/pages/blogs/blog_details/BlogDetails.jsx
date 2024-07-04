import { useState } from "react";
// Components
import Comments from "../../../components/Comments";
import SectionHeader from "../../../components/SectionHeader";
// Custom hooks
import useNotification from "../../../contexts/notification/useNotification";
import useUser from "../../../contexts/user/useUser";
// React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// React Router
import { useParams, Link, Navigate } from "react-router-dom";
// API
import BlogApi from "../../../api/blog";

const BlogDetails = () => {
    const [redirect, setRedirect] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const { blogId } = useParams();

    const {
        data: blog,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["blogs", blogId],
        queryFn: () => BlogApi.getBlogById(blogId),
    });

    const { data: comments } = useQuery({
        queryKey: ["comments", blogId],
        queryFn: () => BlogApi.getCommentsByBlogId(blogId),
    });

    // context
    const { showNotification } = useNotification();
    const userActions = useUser();
    const currentUsername = userActions.getUsername();
    const blogAuthorUsername = blog?.user.username;
    const isBlogOwner = currentUsername === blogAuthorUsername;
    const accessToken = userActions.getAccessToken();
    const isAuthenticated = userActions.isAuthenticated();

    // React Query: Mutations
    const queryClient = useQueryClient();

    const likeMutation = useMutation({
        mutationFn: ({ accessToken, blog }) =>
            BlogApi.likeBlog(accessToken, blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs", blogId] });
            showNotification("success", "Blog Liked");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", "Please log in first");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: ({ accessToken, blogId }) =>
            BlogApi.deleteBlog(accessToken, blogId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs", blogId] });
            showNotification("success", "Blog deleted");
            setRedirect("/blogs");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", "Please log in first");
        },
    });

    const commentMutation = useMutation({
        mutationFn: ({ accessToken, blogId, content }) =>
            BlogApi.createComment(accessToken, blogId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", blogId] });
            showNotification("success", "Comment added");
        },
        onError: (e) => {
            console.log(e.message);
            showNotification("error", "Please log in first");
        },
    });

    // Event Handlers:
    const handleBlogLike = async (blog) => {
        if (!isAuthenticated) {
            setRedirect("/login");
        }
        likeMutation.mutate({ accessToken, blog });
    };

    const handleBlogDelete = async (blogId) => {
        if (!isAuthenticated) {
            setRedirect("/login");
        }
        deleteMutation.mutate({ accessToken, blogId });
    };
    const handleCommentBoxOpen = () => {
        if (!isAuthenticated) {
            showNotification("error", "Please log in first");
            setRedirect("/login");
            return;
        }
        setShowCommentBox(!showCommentBox);
    };

    const handleCommentAdd = async (e, blogId) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setRedirect("/login");
        }

        commentMutation.mutate({ accessToken, blogId, content: comment });
        setComment("");
    };

    if (isLoading) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    if (redirect) return <Navigate to={redirect} />;

    return (
        <div id={blog.id} className="p-4 mb-4 rounded-md">
            <div className="flex gap-2 items-center justify-between mb-4 border-b-2 pb-2">
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
            </div>

            <div>
                <p className="capitalize font-bold text-2xl text-slate-800 mb-4">
                    {blog.title}
                </p>
                <a href="#" className="text-blue-500 underline">
                    {blog.url}
                </a>
            </div>

            <div className="mb-8">
                <div className="flex gap-4 justify-end mb-4">
                    <p>{blog.likes} Likes</p>
                    <p>{comments?.length} Comments</p>
                    <p>0 Shares</p>
                </div>
                <div className="flex gap-6 ">
                    <button
                        className="bg-blue-800 hover:bg-blue-900 rounded-md px-4 py-2 font-bold capitalize text-white"
                        onClick={() => handleBlogLike(blog)}
                    >
                        like
                    </button>
                    <button
                        className="bg-blue-800 hover:bg-blue-900 rounded-md px-4 py-2 font-bold capitalize text-white"
                        onClick={handleCommentBoxOpen}
                    >
                        comment
                    </button>
                    <button className="bg-blue-800 hover:bg-blue-900 rounded-md px-4 py-2 font-bold capitalize text-white">
                        share
                    </button>
                </div>
            </div>

            {showCommentBox && (
                <form onSubmit={(e) => handleCommentAdd(e, blog.id)}>
                    <label htmlFor="comment" className="hidden">
                        comment
                    </label>
                    <textarea
                        name="comment"
                        id="comment"
                        placeholder="Write a comment"
                        className="p-2 w-full border-2 border-slate-800 rounded-lg"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-800 text-white font-bold py-2 px-4 rounded-md ml-auto block"
                    >
                        Post
                    </button>
                </form>
            )}

            <SectionHeader text="Comments" />
            <Comments />
        </div>
    );
};

export default BlogDetails;
