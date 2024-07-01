import useUser from "../contexts/user/useUser";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { getAccessToken } = useUser();
    const token = getAccessToken();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet></Outlet>;
};

export default ProtectedRoute;
