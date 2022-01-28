import React from "react";
import { useMoralis } from "react-moralis";

export const Authorization = ()=>{
    const { authenticate, isAuthenticated, user, logout } = useMoralis();
    if (!isAuthenticated) {
      return (
        <div>
          <button onClick={() => authenticate({ signingMessage: "Hello World!" })}>Authenticate</button>
  
        </div>
      );
    }
    return (
        <div>
          <h1>Welcome {user.get("ethAddress")}</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      );
}