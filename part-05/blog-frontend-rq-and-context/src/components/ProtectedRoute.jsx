import useUser from "../contexts/user/useUser";
import { Navigate, Outlet } from "react-router-dom";
import { isJwtExpired } from "../utils";
const ProtectedRoute = () => {
    const { getAccessToken } = useUser();
    const token = getAccessToken();

    if (!token || isJwtExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet></Outlet>;
};

export default ProtectedRoute;
