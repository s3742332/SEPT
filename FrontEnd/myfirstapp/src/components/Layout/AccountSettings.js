import React, { useEffect, useState } from 'react'
import { getUser, logout } from '../../actions/securityActions';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom'
import { Menu, Dropdown, Typography, Divider, Modal, Button } from 'antd';
import { createNewUser } from "../../actions/securityActions";
import { bookEdit } from "../../actions/bookActions";
import faker from 'faker'
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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const createUser = () => {
        for (let i = 0; i < 10; i++) {
            const password = faker.internet.password()
            const user = {
                fullName: faker.name.findName(),
                username: faker.internet.email(),
                userType: "customer",
                approved: true,
                password: password,
                confirmPassword: password,
                address: faker.address.streetAddress(),
                phoneNumber: faker.phone.phoneNumber(),
                abn: null
            }
            dispatch(createNewUser(user, history, true))
        }
    }

    const createSeller = () => {
        for (let i = 0; i < 10; i++) {
            const password = faker.internet.password()
            const user = {
                fullName: faker.name.findName(),
                username: faker.internet.email(),
                userType: "seller",
                password: password,
                confirmPassword: password,
                address: faker.address.streetAddress(),
                phoneNumber: faker.phone.phoneNumber(),
                abn: faker.datatype.number(),
            }
            dispatch(createNewUser(user, history, true))
        }
    }
    const createBook = () => {
        for (let i = 0; i < 10; i++) {
            const book = {
                companyName: faker.company.companyName(),
                bookTitle: faker.name.title(),
                author: faker.name.findName(),
                bookDescription: faker.commerce.productDescription(),
                bookCost: faker.commerce.price(),
                stockLevel: faker.datatype.number(),
                approved: false
            }
            dispatch(bookEdit(book, history, true))
        }
    }
    const createAdmin = () => {
        const user = {
            fullName: faker.name.findName(),
            username: "admin@admin.com",
            userType: "admin",
            approved: true,
            password: "123123",
            confirmPassword: "123123",
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
            abn: null
        }
        dispatch(createNewUser(user, history, true))
    }
    const menu = (
        <Menu style={{ padding: "1rem" }}>
            {security.user.fullName ? <>
                <Text strong>Hello {security.user.fullName}</Text>
                <Divider style={{ margin: 0 }}></Divider>
                <Menu.Item key="/profile" >Profile</Menu.Item>
                {security.user.userType !== "admin" ? <>
                    <Menu.Item key="/inventory" onClick={() => history.push('inventory')}>Inventory</Menu.Item>
                    <Menu.Item key="/transactions" onClick={() => history.push('transactions')}>Transactions</Menu.Item> </> : null}
                <Menu.Item key="/logout" onClick={handleLogout}>Logout</Menu.Item>
            </> : <>

                <Menu.Item key="/login" onClick={() => history.push('login')}>Login</Menu.Item>
                <Menu.Item key="/register" onClick={() => history.push('register')}>Register</Menu.Item>
            </>}
            <Menu.Item key="/devtools" onClick={showModal}>Dev Tools</Menu.Item>
        </Menu>

    );
    return (
        <>
            <Dropdown.Button style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",

            }} overlay={menu} placement="bottomRight" icon={<UserOutlined />} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Button type="primary" onClick={createUser}>
                    Insert 10 Users
                </Button>
                <Button type="primary" onClick={createSeller}>
                    Insert 10 Sellers
                </Button>
                <Button type="primary" onClick={createAdmin}>
                    Insert 1 Admin
                </Button>
                <Button type="primary" onClick={createBook}>
                    Insert 10 Books
                </Button>
            </Modal>
        </>
    )
}

export default withRouter(AccountSettings)
