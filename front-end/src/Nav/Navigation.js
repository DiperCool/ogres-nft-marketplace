
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
    const { pathname } = useLocation();
    return (
        <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "left",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/ogres">
        <NavLink to="/ogres">👹 Ogres</NavLink>
      </Menu.Item>
    </Menu>
    );
}