import React, { useEffect } from 'react'
import { getUser, logout } from '../../actions/securityActions';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom'
import { Menu, Dropdown, Typography, Divider } from 'antd';
function AccountSettings() {
    const dispatch = useDispatch();
    const security = useSelector(state => state.security);
    const history = useHistory();
    useEffect(() => {
        dispatch(getUser())
      }, [dispatch])
    const { Text } = Typography;

    const handleLogout = () => {
        dispatch(logout())
    }

    const menu = (
        <Menu style={{ padding: "1rem" }}>
            {security.user.fullName ? <>
                <Text strong>Hello {security.user.fullName}</Text>
                <Divider style={{ margin: 0 }}></Divider>
                <Menu.Item key="/profile" >Profile</Menu.Item>
                <Menu.Item key="/inventory" >Inventory</Menu.Item>
                <Menu.Item key="/transactions" >Transactions</Menu.Item>
                <Menu.Item key="/logout" onClick={handleLogout}>Logout</Menu.Item>
            </> : <>

                <Menu.Item key="/login" onClick={() => history.push('login')}>Login</Menu.Item>
                <Menu.Item key="/register" onClick={() => history.push('register')}>Register</Menu.Item>
            </>}

        </Menu>
    );
    return (
        <Dropdown.Button style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",

        }} overlay={menu} placement="bottomRight" icon={<UserOutlined />} />
    )
}

export default withRouter(AccountSettings)
