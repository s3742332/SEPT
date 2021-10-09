import { ShoppingCartOutlined } from '@ant-design/icons';
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
                    <Menu.Item key="/message" onClick={() => history.push('/message')}>Contact Us</Menu.Item>
                </Menu>
                <AccountSettings/>
                
            </Row>)
    }

    if (["admin"].includes(props.user.userType)) {
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div style={{ height: "32px", margin: "16px" }}><img src="/logo192.png" style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                }} /></div>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item key="/" onClick={() => history.push('/')}>Dashboard</Menu.Item>
                    <SubMenu key={"users"} title="Users">
                        <Menu.Item key="/users/pending" onClick={() => history.push('/users/pending')}>Pending Account Approvals</Menu.Item>
                        <Menu.Item key="/users/edit" onClick={() => history.push('/users/edit')}>Account Profiles</Menu.Item>
                    </SubMenu>
                    <SubMenu key={"books"} title="Books">
                        <Menu.Item key="/books/pending" onClick={() => history.push('/books/pending')}>Pending Book Approvals</Menu.Item>
                        <Menu.Item key="/books/edit" onClick={() => history.push('/books/edit')}>Book Collection</Menu.Item>
                    </SubMenu>
                    <SubMenu key={"moderation"} title="Moderation">
                        <Menu.Item key="/moderation/bookreviews" onClick={() => history.push('/moderation/bookreviews')}>Book Reviews</Menu.Item>
                    </SubMenu>
                    <SubMenu key={"reports"} title="Reports">
                        <Menu.Item key="/reports/transactions" onClick={() => history.push('/reports/transactions')}>Generate Transaction Report</Menu.Item>
                    </SubMenu>
                    <SubMenu key={"messages"} title="Messages">
                        <Menu.Item key="/messages/all-messages" onClick={() => history.push('/view-messages')}>View Messages</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>)
    }
}

export default withRouter(NavBar)
