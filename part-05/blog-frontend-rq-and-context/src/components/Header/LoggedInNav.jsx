import { NavLink, Link } from "react-router-dom";
import useUser from "../../contexts/user/useUser";

const LoggedInNav = () => {
    const { getName, logout, getUserId } = useUser();

    const fullName = getName();
    const userId = getUserId();

    return (
        <nav className="flex gap-4 items-center flex-1 justify-end">
            <Link to={`/users/${userId}`} className="italic font-bold mx-auto">
                welcome <span className="text-blue-900">{fullName}</span>
            </Link>
            <NavLink
                to="/blogs"
                className="text-blue-700 underline font-bold capitalize"
            >
                blogs
            </NavLink>
            <NavLink
                to="/users"
                className="text-blue-700 underline font-bold capitalize"
            >
                Users Info
            </NavLink>
            <Link
                to="/"
                className="bg-red-600 hover:bg-red-650 rounded-md px-6 py-2 font-bold capitalize text-white"
                onClick={logout}
            >
                Logout
            </Link>
            <NavLink
                to="/blogs/create"
                className="bg-green-600 hover:bg-green-650 rounded-md px-6 py-2 font-bold capitalize text-white"
            >
                Create blog
            </NavLink>
        </nav>
    );
};

export default LoggedInNav;
