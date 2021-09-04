import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react'
import {withRouter, useHistory } from 'react-router-dom'
function NavBar() {
    const { SubMenu } = Menu;
    const history = useHistory();
    return (
        <div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <SubMenu title="Users">
                    <Menu.Item key="2" onClick={() => history.push('pendingusers')}>Pending Seller Accounts</Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('accountedit')}>Account Profiles</Menu.Item>
                </SubMenu>
                <SubMenu title="Books">
                    <Menu.Item key="5">3rd menu item</Menu.Item>
                    <Menu.Item key="6">4th menu item</Menu.Item>
                </SubMenu>
                <Menu.Item key="7">Reports</Menu.Item>
            </Menu>
        </div>
    )
}

export default withRouter(NavBar)
