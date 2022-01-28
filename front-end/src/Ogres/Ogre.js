import { Card, Button } from "antd";
import { useMoralis,useWeb3ExecuteFunction } from "react-moralis";
import { sendOptions } from "../sendOptions";
import { message } from 'antd';
import React,{useContext, useEffect, useState} from "react";
import { OgresContext } from "./OgresContext";
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
export const Ogre = ({ ogre })=>{
    let {Moralis, user }= useMoralis();
    let {fetch: fetchWeb3}= useWeb3ExecuteFunction();
    let [uri, setUri]=useState(null)
    let {changeOwner}= useContext(OgresContext);
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

    const handleBuying=async()=>{
        await fetchWeb3({
            params:{
                ...sendOptions,
                functionName:"buyOgre",
                params:{
                    tokenId: ogre.tokenId.toString(),
                },
                onSucces:(res)=>{
                    message.success("you've bought this ogre");
                    changeOwner(ogre.tokenId.toString(), user.get("ethAddress"));
                },
                onFailed:(res)=>{
                    console.log(res);
                }
                ,
                msgValue: Moralis.Units.ETH(Moralis.Units.FromWei(ogre.price.toString()))
            }
        })
    }
    const isButtonDisabled=()=>{
        return (user.get("ethAddress")===ogre.owner.toLowerCase()) || !ogre.forSale;
    }
    const getReasonWhyDisabled=()=>{
        if(user.get("ethAddress")===ogre.owner.toLowerCase()){
            return "You own this ogre!";
        }
        else if(!ogre.forSale){
            return "ogre is not for sale";
        }
        return "";
    }
    if(!uri) return null;
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
            {isButtonDisabled()?<div style={styles.notSale}>{getReasonWhyDisabled()}</div>:null}
            <div>
                <Button style={styles.button} onClick={handleBuying} >Buy</Button>
            </div>
        </Card>
    )
}