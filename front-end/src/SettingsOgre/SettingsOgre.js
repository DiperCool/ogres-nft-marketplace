import { useContext } from "react";
import { OgresContext } from "../Ogres/OgresContext";
import { Form, Button, InputNumber, Switch } from 'antd';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { sendOptions } from '../sendOptions';
import { Navigate, useParams } from "react-router-dom";
export const SettingsOgre = ()=>{
    let {Moralis}= useMoralis();
    let match  = useParams();
    let tokenId = Number(match.tokenId);
    let {fetch}= useWeb3ExecuteFunction();
    let {ogres}= useContext(OgresContext);
    let ogre = ogres.find(x=>Number(x.tokenId)===tokenId);
    const onFinish = async(values) => {
        if(values.price!==Moralis.Units.FromWei(ogre.price)){
            await fetch({
                params:{
                    ...sendOptions,
                    functionName:"setPrice",
                    params:{
                        "tokenId":tokenId,
                        "newPrice": Moralis.Units.ETH(values.price)
                    }
                },
                onSuccess:(res)=>{
                    console.log(res);
                },
                onError:(res)=>{
                    console.log(res);
                }
            });
        }
        else if(values.forSale!==ogre.forSale){
            await fetch({
                params:{
                    ...sendOptions,
                    functionName:"toggleSale",
                    params:{
                        "tokenId":tokenId,
                    }
                },
                onSuccess:(res)=>{

                },
                onError:(res)=>{
                    console.log(res);
                }
            });

            
        }
    }
    if(!ogres.length) return null;
    if(!ogre) return <Navigate to="/ogres"/>
    return (
        <div>
          <Form
          name="basic"
          initialValues={{ price: Moralis.Units.FromWei(ogre.price), forSale: ogre.forSale }}
          onFinish={onFinish}
          autoComplete="off"
          >
            <Form.Item 
            name="price"
            label="Price in eth" 
            rules={[{ required: true, message: 'Please input price!' }]}>
                <InputNumber
                    style={{ width: 200 }}
                    min="0"
                    step="0.1"
                    />
                </Form.Item>
            <Form.Item
            name="forSale"
            label="For sale"
            rules={[{ required: true, message: 'Please input for sale!' }]}
            >
                <Switch defaultChecked={ogre.forSale}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

          </Form>    
        </div>
      );
}