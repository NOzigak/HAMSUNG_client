import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

function PrivateRoutes() {
    const isAuthenticated = useSelector(state => state.auth.user);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
