import React,{useContext} from "react";
import { OgresContext } from "./OgresContext"

import { Ogre } from "./Ogre";
const styles={
    list:{
        margin:"0 auto",
    }
}
export const Ogres=()=>{
    let {ogres, totalOgres, addOgre}= useContext(OgresContext);
    return (
        <div>
            <h1>Total Ogres: {totalOgres}</h1>
            <button onClick={()=>{addOgre("2", "Chort", "https://ipfs.moralis.io:2053/ipfs/QmPWLtPmAbovEf4JZ6bNk2Rmd9EXnMas58Po2z9umn3Wvk","IAM",5000,true)}}>Add</button>
            <div style={styles.list}>
                {ogres.map(x=><Ogre ogre={x} key={x.tokenId}/>)}
            </div>
        </div>
    )
}