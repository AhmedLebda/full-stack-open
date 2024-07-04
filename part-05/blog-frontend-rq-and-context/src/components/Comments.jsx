// React Query
import { useQuery } from "@tanstack/react-query";
// React Router
import { useParams, Link } from "react-router-dom";
// API
import BlogApi from "../api/blog";

const Comments = () => {
    const { blogId } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["comments", blogId],
        queryFn: () => BlogApi.getCommentsByBlogId(blogId),
    });

    const commentList = data?.map((comment) => {
        const createdAt = new Date(comment.createdAt).toLocaleString();

        return (
            <li
                key={comment.id}
                className="p-4 mb-4 border-l-4 border-blue-700"
            >
                <Link
                    to={`/users/${comment.user.id}`}
                    className="text-blue-600 font-bold italic capitalize mb-2 block"
                >
                    {comment.user.name}
                </Link>
                <p className="ml-4 text-lg">{comment.content}</p>
                <pre className="ml-auto text-right">{createdAt}</pre>
            </li>
        );
    });

    if (isLoading)
        return <h1 className="text-3xl font-bold">Loading Comments...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    if (data.length === 0) return <pre> This blog doesn't have comments </pre>;

    return <ul>{commentList}</ul>;
};

export default Comments;
