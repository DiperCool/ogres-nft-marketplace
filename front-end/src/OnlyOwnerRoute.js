import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { useMoralis } from "react-moralis";
import {  OWNER_ADDRESS } from "./ABI/abi";

function OnlyOwnerRoute() {
    const { isAuthenticated, user,isInitialized}= useMoralis();
    if(!isInitialized) return null;
    return isAuthenticated && user.get("ethAddress")===OWNER_ADDRESS ? <Outlet /> : <Navigate to="/login" />;
}

export default OnlyOwnerRoute;