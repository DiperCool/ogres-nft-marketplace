import React, { useState} from "react";
import { Button, Card, Modal } from "antd";
import { useMoralis } from "react-moralis";
import { CreateOgreButton } from "../CreateOgre/CreateOgreButton";
import { MyOgresButton } from "../MyOgres/MyOgresButton";
const styles = {
    account: {
      height: "42px",
      padding: "0 15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "12px",
      backgroundColor: "rgb(244, 244, 244)",
      cursor: "pointer",
    },
    text: {
      color: "#21BF96",
    },
    connector: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px 5px",
      cursor: "pointer",
    },
    icon: {
      alignSelf: "center",
      fill: "rgb(40, 13, 95)",
      flexShrink: "0",
      marginBottom: "8px",
      height: "30px",
    },
  };
export const Account = ()=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { authenticate, isAuthenticated, user, logout } = useMoralis();
    if (!isAuthenticated) {
        return (
            <>
                <Card style={styles.account} onClick={async() => await authenticate({ signingMessage: "Sign in" })}>
                Authorize
                </Card>
            </>
        )
    }
    return(
        <>
            <Card style={styles.account} onClick={() => setIsModalVisible(true)}>
                {user.get("ethAddress").substr(0, 6)+"..."}
            </Card>
            <Modal visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                bodyStyle={{
                    padding: "15px",
                    fontSize: "17px",
                    fontWeight: "500",
                }}
                style={{ fontSize: "16px", fontWeight: "500" }}
                
            >
                <div>
                {user.get("ethAddress")}
                <br></br>
                <CreateOgreButton/>
                <br/>
                <MyOgresButton/>
                </div>
                <div>
                    <Button onClick={async()=>{
                        await logout();
                        setIsModalVisible(false);
                    }}>Logout</Button>
                </div>
            </Modal>
        </>
    )
}