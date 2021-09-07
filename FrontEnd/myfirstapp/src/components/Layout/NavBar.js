import { Menu, Dropdown, message, Row, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/securityActions';
function NavBar(props) {
    const { SubMenu } = Menu;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props.user)
    }, [props.user])
    const handleLogout = () => {
        dispatch(logout())
    }
    const {Text} = Typography;
    const menu = (
        
        <Menu style={{ padding: "1rem"}}>
        
            {props.user.fullName ? <>
                <Text strong>Hello {props.user.fullName}</Text>
                <Divider style={{margin: 0}}></Divider>
                <Menu.Item key="/logout" onClick={handleLogout}>Logout</Menu.Item>
            </> : <>

                <Menu.Item key="/login" onClick={() => history.push('login')}>Login</Menu.Item>
                <Menu.Item key="/register" onClick={() => history.push('register')}>Register</Menu.Item>
            </>}

        </Menu>
    );


    return (
        <Row style={{ display: "flex", maxHeight: "64px" }}>
            <div style={{ display: "flex", flex: 1, justifyContent: "flex-start", alignItems: "center" }} >
                <img src="logo192.png" alt='user' style={{
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

                {props.user.userType === "admin" &&
                    <>
                        <Menu.Item key="/" onClick={() => history.push('/')}>Dashboard</Menu.Item>
                        <SubMenu key={"users"} title="Users">
                            <Menu.Item key="/pendingusers" onClick={() => history.push('pendingusers')}>Pending Seller Accounts</Menu.Item>
                            <Menu.Item key="/accountedit" onClick={() => history.push('accountedit')}>Account Profiles</Menu.Item>
                        </SubMenu>
                        <SubMenu key={"books"} title="Books">
                            <Menu.Item key="5">3rd menu item</Menu.Item>
                            <Menu.Item key="6">4th menu item</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="7">Reports</Menu.Item>
                    </>
                }
                {props.user.userType === "customer" && <>
                    <Menu.Item key="/" onClick={() => history.push('/')}>Home</Menu.Item>
                    <Menu.Item key="/buy" onClick={() => history.push('buy')}>Buy</Menu.Item>
                    <Menu.Item key="/sell" onClick={() => history.push('sell')}>Sell</Menu.Item>
                    <Menu.Item key="/sell" onClick={() => history.push('inventory')}>Inventory</Menu.Item>
                </>
                }

            </Menu>
            <Dropdown.Button style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",

            }} overlay={menu} placement="bottomRight" icon={<UserOutlined />} />
        </Row>
    )
}

export default withRouter(NavBar)
