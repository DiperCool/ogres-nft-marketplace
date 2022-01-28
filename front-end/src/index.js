import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { OgresProvider } from "./Ogres/OgresProvider";
import { APP_ID, SERVER_URL } from "./ABI/abi";


ReactDOM.render(
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <OgresProvider>
        <App />
      </OgresProvider>
    </MoralisProvider>,
  document.getElementById("root")
);
