import { createBrowserRouter } from "react-router-dom";
// Layouts
import RootLayout from "./pages/layouts/RootLayout";
// ==> Pages
import ErrorPage from "./pages/error/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import LoginForm from "./pages/login/LoginForm";
// Blogs
import Blogs from "./pages/blogs/index/Blogs";
import CreateBlogForm from "./pages/blogs/create_blog/CreateBlogForm";
// Users
import UsersInfo from "./pages/users/index/UsersInfo";
import UserDetail from "./pages/users/user_detail/UserDetail";
import BlogDetails from "./pages/blogs/blog_details/BlogDetails";
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
                path: "login",
                element: <LoginForm />,
            },
            {
                path: "blogs",
                element: <Blogs />,
            },
            {
                path: "blogs/:blogId",
                element: <BlogDetails />,
            },
            {
                path: "blogs/create",
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        element: <CreateBlogForm />,
                    },
                ],
            },
            {
                path: "users",
                element: <ProtectedRoute />,
                children: [
                    { index: true, element: <UsersInfo /> },
                    { path: ":id", element: <UserDetail /> },
                ],
            },
        ],
    },
]);

export default router;
