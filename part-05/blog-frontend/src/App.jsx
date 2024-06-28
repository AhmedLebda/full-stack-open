import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// ==> Components
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
// ==> API
import authApi from "./api/auth";
import blogApi from "./api/blog";
// ===> Redux Actions
import { showNotification } from "./features/notification/notificationSlice";

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [isCreate, setIsCreate] = useState(false);

    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    // Get user data from local storage when app loads for the first time
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // fetch all blogs from api
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
                    dispatch(showNotification("error", error.message));
                }
            }
        };
        getBlogs();
    }, [user]);

    const login = async (username, password) => {
        try {
            const userData = await authApi.login(username, password);

            setUser(userData);

            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            console.log(error.message);
            dispatch(showNotification("error", error.message));
        }
    };

    const createBlog = async (blog) => {
        try {
            const createdBlog = await blogApi.createBlog(
                user.access_token,
                blog
            );
            setBlogs([...blogs, createdBlog]);
            setIsCreate(false);
            dispatch(showNotification("success", "A new blog has been added"));
        } catch (error) {
            console.log(error.message);
            dispatch(showNotification("error", error.message));
        }
    };

    const handleBlogLike = async (blog) => {
        try {
            const updatedBlog = await blogApi.likeBlog(user.access_token, blog);

            setBlogs(
                blogs.map((blog) =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            );

            dispatch(showNotification("success", "Blog Liked"));
        } catch (error) {
            console.log(error.message);
            dispatch(showNotification("error", error.message));
        }
    };

    const handleBlogDelete = async (blogId) => {
        try {
            const deletedBlog = await blogApi.deleteBlog(
                user.access_token,
                blogId
            );

            setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));

            dispatch(showNotification("success", "Blog Deleted Successfully"));
        } catch (error) {
            console.log(error.message);
            dispatch(showNotification("error", error.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    // Toggle the blog create form
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

            <main className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
                {notification && <Notification notification={notification} />}

                {!user && <LoginForm login={login} />}

                {user && (
                    <>
                        {isCreate && <CreateBlogForm createBlog={createBlog} />}

                        <Blogs
                            blogsData={blogs}
                            author={user.name}
                            onBlogLike={handleBlogLike}
                            onBlogDelete={handleBlogDelete}
                        />
                    </>
                )}
            </main>
        </>
    );
};

export default App;
