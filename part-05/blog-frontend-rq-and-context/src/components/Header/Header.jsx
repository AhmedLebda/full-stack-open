// Context
import useUser from "../../contexts/user/useUser";
// React Router
import { Link } from "react-router-dom";
// Components
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const Header = () => {
    const { getAccessToken } = useUser();
    const token = getAccessToken();

    return (
        <header className="flex justify-between items-center py-4 px-6 shadow-md">
            <Link to="/" className="font-bold text-3xl text-blue-900">
                Pharaoh's Papyrus
            </Link>
            {token ? <LoggedInNav /> : <LoggedOutNav />}
        </header>
    );
};

export default Header;
