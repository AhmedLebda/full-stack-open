import { NavLink, Link } from "react-router-dom";
import useUser from "../../contexts/user/useUser";

const LoggedInNav = () => {
    const { getName, logout } = useUser();
    const fullName = getName();

    return (
        <nav className="flex gap-4 items-center flex-1 justify-end">
            <a href="/" className="italic font-bold mx-auto">
                welcome <span className="text-blue-900">{fullName}</span>
            </a>
            <NavLink
                to="/blogs"
                className="text-blue-700 underline font-bold capitalize"
            >
                blogs
            </NavLink>
            <Link
                to="/"
                className="bg-red-600 hover:bg-red-650 rounded-md px-6 py-2 font-bold capitalize text-white"
                onClick={logout}
            >
                Logout
            </Link>
            <NavLink
                to="/create"
                className="bg-green-600 hover:bg-green-650 rounded-md px-6 py-2 font-bold capitalize text-white"
            >
                Create blog
            </NavLink>
        </nav>
    );
};

export default LoggedInNav;
