import { useQuery } from "@tanstack/react-query";
import useUser from "../../../contexts/user/useUser";
import UserApi from "../../../api/user";
import { Link } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
const UsersInfo = () => {
    const { getAccessToken } = useUser();

    const token = getAccessToken();

    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ["users"],
        queryFn: () => UserApi.getUsers(token),
    });

    let usersList = null;
    if (isSuccess) {
        usersList = data.map((user) => (
            <li
                key={user.id}
                className="flex justify-between p-4 capitalize border-b-2 hover:bg-gray-100"
            >
                <Link
                    to={user.id}
                    className="text-blue-600 underline underline-offset-2"
                >
                    {user.name}
                </Link>
                <p>{user.posts.length}</p>
            </li>
        ));
    }

    if (isLoading) return <h1 className="text-3xl font-bold">Loading...</h1>;

    if (error) return <pre>An error has occurred: {error.message}</pre>;

    return (
        <div>
            <SectionHeader text="Users" />
            <ul className="max-w-screen-sm mx-auto">
                <li className="flex justify-between p-4 capitalize border-b-2 font-bold text-xl">
                    <p>Name</p>
                    <p>blogs created</p>
                </li>
                {usersList}
            </ul>
        </div>
    );
};

export default UsersInfo;
