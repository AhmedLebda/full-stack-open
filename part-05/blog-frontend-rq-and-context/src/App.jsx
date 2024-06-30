import { useState } from "react";
import { useSelector } from "react-redux";
// ==> Components
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import CreateBlogForm from "./components/CreateBlogForm";
import Notification from "./components/Notification";

// ===> Context
import useNotification from "./contexts/notification/useNotification";
import useUser from "./contexts/user/useUser";

const App = () => {
    const [isCreate, setIsCreate] = useState(false);

    // const user = useSelector((state) => state.user);
    const userActions = useUser();
    const user = userActions.getName();
    const { notification } = useNotification();

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
