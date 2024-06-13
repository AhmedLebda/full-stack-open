import { useState, useEffect } from "react";
// ==> Components
import SectionHeader from "./components/SectionHeader";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
// ==> API
import authApi from "./api/auth";
import blogApi from "./api/blog";
// ===> Utilities
import { sleep } from "./utils";

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const getBlogs = async () => {
            if (user) {
                try {
                    const blogsData = await blogApi.getAllBlogs(
                        user.access_token
                    );
                    setBlogs([...blogsData]);
                } catch (error) {
                    console.log(error.message);
                    showNotification("error", error.message);
                }
            }
        };

        getBlogs();
    }, [user]);

    const showNotification = async (type, msg) => {
        if (!notification) {
            setNotification({ type, msg });
            await sleep();
            setNotification(null);
        }
    };

    const handleCredentialsChange = (e) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = credentials;
        try {
            const userData = await authApi.login(username, password);

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            console.log(error.message);
            showNotification("error", error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
            <SectionHeader text="Pharaoh's Papyrus" />

            {notification && (
                <p
                    className={`${
                        notification?.type === "success"
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                    } capitalize font-bold p-2 rounded-lg text-center`}
                >
                    {notification.msg}
                </p>
            )}
            {!user && (
                <LoginForm
                    loginData={credentials}
                    onDataChange={handleCredentialsChange}
                    onSubmit={handleLoginFormSubmit}
                />
            )}

            {user && (
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-xl">
                            Welcome{" "}
                            <span className="text-blue-900">{user.name}</span>
                        </p>
                        <button
                            className="bg-red-600 hover:bg-red-650 rounded-md px-6 py-2 font-bold capitalize text-white"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <Blogs blogsData={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
