import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// ==> Components
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
// ===> Redux Actions
import { showNotification } from "./features/notification/notificationSlice";
import { initializeBlogs } from "./features/blogs/blogsSlice";

const App = () => {
    const [isCreate, setIsCreate] = useState(false);

    const user = useSelector((state) => state.user);
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    // Get all blogs when app loads for first time or when user re-log
    useEffect(() => {
        const getBlogs = async () => {
            if (user) {
                try {
                    await dispatch(initializeBlogs(user.access_token));
                } catch (error) {
                    console.log(error.message);
                    dispatch(showNotification("error", error.message));
                }
            }
        };
        getBlogs();
    }, [user]);

    // Toggle the blog create form
    const toggleIsCreate = () => {
        setIsCreate(!isCreate);
    };

    return (
        <>
            <Header onCreate={toggleIsCreate} />

            <main className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
                {notification && <Notification />}

                {!user && <LoginForm />}

                {user && (
                    <>
                        {isCreate && (
                            <CreateBlogForm toggleIsCreate={toggleIsCreate} />
                        )}

                        <Blogs />
                    </>
                )}
            </main>
        </>
    );
};

export default App;
