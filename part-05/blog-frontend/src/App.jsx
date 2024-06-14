import { useState, useEffect } from "react";
// ==> Components
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
// ==> API
import authApi from "./api/auth";
import blogApi from "./api/blog";
// ===> Utilities
import { sleep } from "./utils";
import Header from "./components/Header";

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [notification, setNotification] = useState(null);
    const [createBlogData, setCreateBlogData] = useState({
        title: "",
        url: "",
    });
    const [isCreate, setIsCreate] = useState(false);

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

    const handleCreateBlogDataChange = (e) => {
        setCreateBlogData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateBlogSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdBlog = await blogApi.createBlog(
                user.access_token,
                createBlogData
            );
            setBlogs([...blogs, createdBlog]);
            setCreateBlogData((prevData) => ({ title: "", url: "" }));
            setIsCreate(false);
            showNotification("success", "A new blog has been added");
        } catch (error) {
            console.log(error.message);
            showNotification("error", error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const toggleIsCreate = () => {
        setIsCreate(!isCreate);
    };
    return (
        <>
            <Header
                fullName={user?.name}
                onLogout={handleLogout}
                onCreate={toggleIsCreate}
            />
            <div className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
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
                    <>
                        {isCreate && (
                            <CreateBlogForm
                                data={createBlogData}
                                onDataChange={handleCreateBlogDataChange}
                                onSubmit={handleCreateBlogSubmit}
                            />
                        )}
                        <Blogs blogsData={blogs} />
                    </>
                )}
            </div>
        </>
    );
};

export default App;
