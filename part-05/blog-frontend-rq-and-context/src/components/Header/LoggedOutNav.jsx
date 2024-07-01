import { Link } from "react-router-dom";

const LoggedOutNav = () => {
    return (
        <Link
            to="/login"
            className="text-blue-700 underline font-bold capitalize"
        >
            Login
        </Link>
    );
};

export default LoggedOutNav;
