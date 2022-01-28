import React, {useEffect} from "react";
import { useMoralis } from "react-moralis";
import { Ogres } from "./Ogres/Ogres";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Authorization } from "./Authorization/Authorization";
import { Navigation } from "./Nav/Navigation";
import "antd/dist/antd.css";
import { Account } from "./Account/Account";
import PrivateRoute from "./PrivateRoute";
import OnlyOwnerRoute from "./OnlyOwnerRoute";
import { CreateOgre } from "./CreateOgre/CreateOgre";
import { MyOgres } from "./MyOgres/MyOgres";
import { SettingsOgre } from "./SettingsOgre/SettingsOgre";
const App = () => {
	const {isAuthenticated,isWeb3Enabled,isWeb3EnableLoading,enableWeb3} = useMoralis();
	const styles = {
		content: {
			display: "flex",
			justifyContent: "center",
			fontFamily: "Roboto, sans-serif",
			color: "#041836",
			marginTop: "130px",
			padding: "10px",
			background:"silver"
		},
		header: {
			zIndex: 1,
			width: "100%",
			background: "#fff",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			fontFamily: "Roboto, sans-serif",
			borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
			padding: "0 10px",
			boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
		},
		headerRight: {
			display: "flex",
			gap: "20px",
			alignItems: "center",
			fontSize: "15px",
			fontWeight: "600",
		},
	};
	useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
	
	return(
    <div>
		 <Router>
        <header style={styles.header}>
          <Navigation/>
          <div style={styles.headerRight}>
            <Account></Account>
          </div>
        </header>
				<Routes>
					<Route path="/auth" element={<Authorization />}/>
					<Route path="/ogres" element={<PrivateRoute/>}>
						<Route path="/ogres" element={<Ogres />}/>
					</Route>
					<Route path="/create" element={<OnlyOwnerRoute/>}>
						<Route path="/create" element={<CreateOgre/>}/>
					</Route>
					<Route path="/myOgres" element={<PrivateRoute/>}>
						<Route path="/myOgres" element={<MyOgres/>}/>
					</Route>
					<Route path="/settingsOgre/:tokenId" element={<PrivateRoute/>}>
						<Route path="/settingsOgre/:tokenId" element={<SettingsOgre/>}/>
					</Route>
				</Routes>
        </Router>
    </div>
  )
  
};

export default App;
