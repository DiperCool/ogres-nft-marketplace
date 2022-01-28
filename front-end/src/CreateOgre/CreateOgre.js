import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Form, Input, Button, InputNumber, Upload } from 'antd';
import React,{useState} from "react";
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { sendOptions } from '../sendOptions';
export const CreateOgre = () => {
  let[isLoading, setLoding]= useState(false);
  const {Moralis} = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const onFinish = async(values) => {
    setLoding(true);
    let data = values.upload[0];
    let filePhoto = new Moralis.File(data.name+".img", data.originFileObj)
    await filePhoto.saveIPFS();
    let photoHash = filePhoto.hash();
    let uri = {
      "description": values.description,
      "image": `https://ipfs.moralis.io:2053/ipfs/${photoHash}`,
      "name": values.name
    }
    let fileUri = new Moralis.File(values.name+".json", {base64 : btoa(JSON.stringify(uri))});
    await fileUri.saveIPFS();
    let uriUrl = `https://ipfs.moralis.io:2053/ipfs/${fileUri.hash()}`;
    await fetch({
      params:{
        ...sendOptions,
        functionName:'mintNFT',
        params:{
          name: values.name,
          price: Moralis.Units.ETH(values.price),
          tokenURI: uriUrl
        }
      }
    });
    setLoding(false);

    
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Form
      name="basic"
      initialValues={{ price: "0.5" }}
      onFinish={onFinish}
      autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          style={{ width: 200 }}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
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
          label="Description"
          name="description"
          style={{ width: 400 }}
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please input photo!' }]}
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
      >
          <Upload name="logo" listType="picture" beforeUpload={() => false} >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {isLoading?<div>Loading...</div>: null}

    </div>
  );
};