// Context
import useUser from "../../../contexts/user/useUser";
// Api
import UserApi from "../../../api/user";
// React Query
import { useQuery } from "@tanstack/react-query";
// React Router
import { useParams, Link } from "react-router-dom";
// Components
import SectionHeader from "../../../components/SectionHeader";

const UserDetail = () => {
    const { id } = useParams();
    const { getAccessToken } = useUser();
    const token = getAccessToken();
    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ["users", id],
        queryFn: () => UserApi.getUserById(token, id),
    });

    if (isLoading) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    return (
        <div>
            <SectionHeader text={data.name} />
            <h3 className="text-3xl font-bold italic p-4 border-b-2 mb-4">
                Blogs:
            </h3>
            {data.posts.length > 0 ? (
                <ul className="list-disc px-8">
                    {data.posts.map((post) => (
                        <li
                            key={post.id}
                            className="text-blue-600 underline underline-offset-2 p-4 m-2  "
                        >
                            <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <pre className="px-4">{data.name} doesn't have any blogs</pre>
            )}
        </div>
    );
};

export default UserDetail;
