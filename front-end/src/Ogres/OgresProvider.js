import { OgresContext } from "./OgresContext"
import React, {useEffect, useState} from "react";
import { useMoralis,useWeb3ExecuteFunction,useMoralisSubscription } from "react-moralis";
import { sendOptions } from "../sendOptions";
export const OgresProvider=({children})=>{
    let { isWeb3Enabled } = useMoralis();
    let [isLoaded, setLoaded]= useState(false);
    let [totalOgres, setTotalOgres]= useState(0);
    let [ogres, setOgres]= useState([]);
    let { fetch } = useWeb3ExecuteFunction();
    useMoralisSubscription("ChangePricesTable", q => q, [], {
        onCreate: data => changePrice(data.attributes.tokenId, data.attributes.price),
    });
    useMoralisSubscription("MintingNftTable", q => q, [], {
        onCreate: data => addOgre(
                data.attributes.tokenId,
                data.attributes.name,
                data.attributes.tokenURI,
                data.attributes.owner,
                data.attributes.price,
                data.attributes.forSale,
            )
    });
    useMoralisSubscription("ToggleSaleTable", q => q, [], {
        onCreate: data => toggleForSale(data.attributes.tokenId, data.attributes.forSale)
    });
    useMoralisSubscription("BuyOgreEventTable", q => q, [], {
        onCreate: data => changeOwner(data.attributes.tokenId, data.attributes.owner)
    });
    let optionsGetTotalOgres = {
        ...sendOptions,
        functionName:"getTotalOgres"

    };
    useEffect(()=>{
        let countOgres=async()=>{
                fetch({ 
                    params: optionsGetTotalOgres, 
                    onError:(e)=>{
                        console.log(e);
                    },
                    onSuccess: (res)=>{
                        setTotalOgres(res.toNumber());
                        loadOgres(res.toNumber());
                    }
            });
        };
        if(isWeb3Enabled && !isLoaded ){
            countOgres();
            setLoaded(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isWeb3Enabled,isLoaded, fetch]);
    const loadOgres = async(count)=>{
        let arr=[];
        for(let i = 0; i< count; i++){
            await fetch({
                params:{
                    ...sendOptions,
                    functionName:"ogres",
                    params:{
                    '':i+1
                    }
                },
                onSuccess: (res)=>{
                    arr.push(res);
                }
            })
        }
        setOgres(arr);
    }
    const changeOwner =(idToken, newOwner)=>{
        let items = [...ogres];
        let itemsCopy = items.map((item)=>{
            let itemCopy =  Object.assign({}, item);
            if(itemCopy.tokenId.toString()===idToken){
                itemCopy.forSale=false;
                itemCopy.owner = newOwner;
            }
            return itemCopy;
        })
        setOgres(itemsCopy);
    }
    const toggleForSale=(idToken, forSale)=>{
        let items = [...ogres];
        let itemsCopy = items.map((item)=>{
            let itemCopy =  Object.assign({}, item);
            if(itemCopy.tokenId.toString()===idToken){
                itemCopy.forSale=!forSale;
            }
            return itemCopy;
        })
        setOgres(itemsCopy);
    }
    const changePrice=(idToken, newPrice)=>{
        let items = [...ogres];
        let itemsCopy= items.map((item)=>{
            let itemCopy =  Object.assign({}, item);
            if(itemCopy.tokenId.toString()===idToken){
                itemCopy.price= newPrice;
            }
            return itemCopy;
        })
        setOgres(itemsCopy);
    }
    const addOgre=(tokenId, name, tokenURI,owner,price,forSale)=>{
        let ogre= {
            tokenId: tokenId,
            name:name,
            tokenURI:tokenURI,
            owner:owner,
            price: price,
            forSale: forSale,
        }
        setTotalOgres(totalOgres+1);
        setOgres([...ogres, ogre]);
    }
    return(
        <OgresContext.Provider value={{totalOgres, addOgre, changePrice,toggleForSale,ogres, changeOwner}}>
            {children}
        </OgresContext.Provider>
    )
}