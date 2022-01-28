import { useMoralis } from "react-moralis";

import React,{useContext} from "react";
import { OgresContext } from "../Ogres/OgresContext";
import { MyOgre } from "./MyOgre";

export const MyOgres=()=>{
    let{user}=useMoralis();
    
    let{ogres}= useContext(OgresContext);
    return(
        <div>
            {ogres.filter(x=>x.owner.toLowerCase()===user.get("ethAddress"))
                .map(x=><MyOgre ogre={x} key={x.tokenId}/>)}
        </div>
    )
}