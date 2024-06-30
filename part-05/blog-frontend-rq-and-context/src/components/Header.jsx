// Context
import useUser from "../contexts/user/useUser";

const Header = ({ onCreate }) => {
    const userActions = useUser();

    const fullName = userActions.getName();

    const handleLogout = () => {
        userActions.logout();
    };

    return (
        <header className="flex justify-between items-center py-4 px-6 shadow-md">
            <a href="/" className="font-bold text-3xl text-blue-900">
                Pharaoh's Papyrus
            </a>
            {fullName && (
                <nav className="flex gap-4 items-center">
                    <a href="/" className="italic font-bold">
                        welcome{" "}
                        <span className="text-blue-900">{fullName}</span>
                    </a>
                    <button
                        className="bg-red-600 hover:bg-red-650 rounded-md px-6 py-2 font-bold capitalize text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        className="bg-green-600 hover:bg-green-650 rounded-md px-6 py-2 font-bold capitalize text-white"
                        onClick={onCreate}
                    >
                        Create blog
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
