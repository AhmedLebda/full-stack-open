import { createBrowserRouter } from "react-router-dom";
// Layouts
import RootLayout from "./pages/layouts/RootLayout";
// Pages
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import Blogs from "./pages/blogs/index/Blogs";
import LoginForm from "./pages/login/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlogForm from "./pages/blogs/create_blog/CreateBlogForm";
import UsersInfo from "./pages/users/index/UsersInfo";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "blogs",
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <Blogs />,
                    },
                    {
                        path: "create",
                        element: <CreateBlogForm />,
                    },
                ],
            },
            {
                path: "users",
                element: <ProtectedRoute />,
                children: [{ index: true, element: <UsersInfo /> }],
            },
        ],
    },
]);

export default router;
