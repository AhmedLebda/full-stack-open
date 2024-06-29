import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// ==> Components
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";
// ===> Redux Actions
import { initializeBlogs } from "./features/blogs/blogsSlice";
// ===> Context
import useNotification from "./contexts/notification/useNotification";

const App = () => {
    const [isCreate, setIsCreate] = useState(false);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { notification, showNotification } = useNotification();

    // Get all blogs when app loads for first time or when user re-log
    useEffect(() => {
        const getBlogs = async () => {
            if (user) {
                try {
                    await dispatch(initializeBlogs(user.access_token));
                } catch (error) {
                    console.log(error.message);
                    showNotification("error", error.message);
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
