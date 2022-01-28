import { Button } from "antd"
import { NavLink } from "react-router-dom"

export const MyOgresButton = ()=>{
    return(
        <NavLink to="/myOgres">
            <Button>My Ogres</Button>
        </NavLink>
    )
}