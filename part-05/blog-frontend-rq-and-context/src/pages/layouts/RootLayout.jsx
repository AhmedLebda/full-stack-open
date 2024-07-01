// React router
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/Header/Header";
import Notification from "../../components/Notification";
// Context
import useNotification from "../../contexts/notification/useNotification";

const RootLayout = () => {
    const { notification } = useNotification();

    return (
        <>
            <Header />
            {notification && <Notification />}
            <main className="border max-w-screen-md mx-auto my-8 p-4 rounded-md shadow-lg min-h-[80vh]">
                <Outlet></Outlet>
            </main>
        </>
    );
};

export default RootLayout;
