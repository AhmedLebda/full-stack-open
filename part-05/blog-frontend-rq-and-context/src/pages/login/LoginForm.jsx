import { useState } from "react";
// Components
import OptionButton from "../../components/OptionButton";
// Context
import useNotification from "../../contexts/notification/useNotification";
import useUser from "../../contexts/user/useUser";
// React Router
import { Navigate } from "react-router-dom";

const LoginForm = () => {
    // Form state
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    // Context
    const { showNotification } = useNotification();
    const userActions = useUser();
    const token = userActions.getAccessToken();

    // Redirect to home page if user is already logged in
    if (token) {
        return <Navigate to="/" />;
    }

    // Event Handlers
    const handleChange = (e) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = credentials;
        try {
            await userActions.login(username, password);
            showNotification("success", "Welcome");
        } catch (error) {
            showNotification("error", error.message);
        }
    };

    return (
        <form
            className=" mb-6 pb-6 border-b-2 text-center"
            onSubmit={handleLogin}
        >
            <h1 className="italic font-serif font-bold text-4xl text-blue-900 p-4">
                Login:
            </h1>
            <div className="p-4 capitalize">
                <label htmlFor="username">username:</label>
                <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    className="border ml-4 px-2"
                    value={credentials.username}
                    onChange={handleChange}
                />
            </div>

            <div className="p-4 capitalize">
                <label htmlFor="password">password:</label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    className="border ml-4 px-2"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>

            <div className="p-4">
                <OptionButton text="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
