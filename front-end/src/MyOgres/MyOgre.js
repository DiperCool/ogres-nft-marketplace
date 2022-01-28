import { Card, Button } from "antd";

import React from "react";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
let styles = {
    image:{
        width:"250px",
        height:"250px",
        display:"block",
        marginLeft:"auto",
        marginRight:"auto"
    },
    card:{
        width:"300px",
        marginLeft:"10px",
        marginTop:"10px",
        padding:0,
        display:"inline-block"
    },
    button:{
        width:"100%"
    },
    name:{
        fontSize:"17px",
        fontWeight:"700"
    },
    price:{
        fontSize:"16px"
    },
    notSale:{
        color:"red",
        fontSize:"13px"
    }
}
export const MyOgre = ({ ogre })=>{
    let {Moralis}= useMoralis();
    let [uri, setUri]=useState(null)
    useEffect(()=>{
        let loadURI=async()=>{
            let response= await fetch(ogre.tokenURI);
            if(response.ok){
                let json = await response.json();
                setUri(json);
            }
        }
        loadURI();
    },[ogre.tokenURI]);
    if(uri==null) return null;
    return(
        <Card style={styles.card} bodyStyle={{padding: "10px"}}>
            <div>
                <img src={uri.image} style={styles.image} alt={ogre.name}/>
            </div>
            <div style={styles.name}>
                {ogre.name}
            </div>
            <div style={styles.price}>
                {Moralis.Units.FromWei(ogre.price.toString())} eth
            </div>
            
            <div>
                <NavLink to={`/settingsOgre/${ogre.tokenId.toString()}`}>
                    <Button style={styles.button}>Settings</Button>
                </NavLink>
            </div>
        </Card>
    )
}