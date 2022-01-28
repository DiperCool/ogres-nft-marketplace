import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { useMoralis } from "react-moralis";
function PrivateRoute() {
    const { isAuthenticated, isInitialized}= useMoralis();
    if(!isInitialized) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;