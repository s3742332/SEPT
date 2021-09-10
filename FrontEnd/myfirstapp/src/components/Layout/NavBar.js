import { Menu, Dropdown, message, Row, Typography, Divider, Layout } from 'antd';

import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'


import AccountSettings from './AccountSettings';
function NavBar(props) {
    const [collapsed, setCollapsed] = useState(false)
    const { SubMenu } = Menu;
    const history = useHistory();
    const location = useLocation();

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }
    const { Header, Content, Footer, Sider } = Layout;
    const { Text } = Typography;




    if (["seller", "customer", undefined].includes(props.user.userType)) {
        return (
            <Row style={{ display: "flex", maxHeight: "64px" }}>
                <div style={{ display: "flex", flex: 1, justifyContent: "flex-start", alignItems: "center" }} >
                    <img src="favicon.ico" style={{
                        height: "auto",
                        width: "auto",
                        maxHeight: "64px"
                    }} />
                </div>

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]} style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <Menu.Item key="/" onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item key="/browse" onClick={() => history.push('/browse')}>Browse</Menu.Item>
                    {["seller"].includes(props.user.userType) && <Menu.Item key="/sell" onClick={() => history.push('/sell')}>Sell</Menu.Item>}
                    <Menu.Item key="/about" onClick={() => history.push('/about')}>About</Menu.Item>
                </Menu>
                <AccountSettings/>
            </Row>)
    }

    if (["admin"].includes(props.user.userType)) {
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div style={{ height: "32px", margin: "16px" }}><img src="logo192.png" style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                }} /></div>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item key="/" onClick={() => history.push('/')}>Dashboard</Menu.Item>
                    <SubMenu key={"users"} title="Users">
                        <Menu.Item key="/users/pendingusers" onClick={() => history.push('/users/pendingusers')}>Pending Seller Accounts</Menu.Item>
                        <Menu.Item key="/users/accountedit" onClick={() => history.push('/users/accountedit')}>Account Profiles</Menu.Item>
                    </SubMenu>
                    <SubMenu key={"books"} title="Books">
                        <Menu.Item key="5">3rd menu item</Menu.Item>
                        <Menu.Item key="6">4th menu item</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="7">Reports</Menu.Item>
                </Menu>
            </Sider>)
    }
}

export default withRouter(NavBar)
