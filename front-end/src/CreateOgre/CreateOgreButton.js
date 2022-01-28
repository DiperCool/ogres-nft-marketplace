import React from "react";
import { Button } from "antd";
import { useMoralis } from "react-moralis";
import {  OWNER_ADDRESS } from "../ABI/abi";
import { NavLink } from "react-router-dom";
export const CreateOgreButton=()=>{
    const {user, isAuthenticated}= useMoralis();
    if(isAuthenticated && user.get("ethAddress")===OWNER_ADDRESS){
        return(
            <NavLink to="/create">
                <Button>
                    Create Ogre
                </Button>
            </NavLink>
        )
    }
    return null;
}