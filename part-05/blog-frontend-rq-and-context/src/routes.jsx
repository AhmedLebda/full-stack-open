import { createBrowserRouter } from "react-router-dom";
// Layouts
import RootLayout from "./pages/layouts/RootLayout";
// Pages
import ErrorPage from "./pages/error/ErrorPage";
import Home from "./pages/home/Home";
import Blogs from "./pages/blogs/Blogs";
import LoginForm from "./pages/login/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlogForm from "./pages/create_blog/CreateBlogForm";
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
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/blogs",
                        element: <Blogs />,
                    },
                    {
                        path: "/create",
                        element: <CreateBlogForm />,
                    },
                ],
            },
        ],
    },
]);

export default router;
