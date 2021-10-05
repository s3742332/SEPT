import React, { useEffect, useState } from 'react'
import { getUser, logout } from '../../actions/securityActions';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom'
import { Menu, Dropdown, Typography, Divider, Modal, Button } from 'antd';
import { createNewUser } from "../../actions/securityActions";
import { bookEdit } from "../../actions/bookActions";
import faker from 'faker'
import { transactionEdit } from '../../actions/transactionActions';
import { reviewEdit } from '../../actions/reviewActions';
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
    const createDummyUser = () => {
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

    const createDummySeller = () => {
        for (let i = 0; i < 10; i++) {
            const password = faker.internet.password()
            const user = {
                fullName: faker.name.findName(),
                username: faker.internet.email(),
                userType: "seller",
                password: password,
                approved: false,
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
                seller: "seller@seller.com",
                bookTitle: faker.name.title(),
                author: faker.name.findName(),
                bookDescription: faker.commerce.productDescription(),
                bookCost: faker.commerce.price(),
                stockLevel: faker.datatype.number(),
                category: ["Fantasy", "Romance"],
                approved: true,
                cover: faker.image.imageUrl(),
                isbn: faker.datatype.number()
            }
            dispatch(bookEdit(book, history, true))
        }
    }
    const createUser = () => {
        const user = {
            fullName: faker.name.findName(),
            username: "user@user.com",
            userType: "customer",
            approved: true,
            password: "123123",
            confirmPassword: "123123",
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
            abn: null
        }
        dispatch(createNewUser(user, history, true))
    }
    const createSeller = () => {
        const user = {
            fullName: faker.name.findName(),
            username: "seller@seller.com",
            userType: "seller",
            approved: true,
            password: "123123",
            confirmPassword: "123123",
            address: faker.address.streetAddress(),
            phoneNumber: faker.phone.phoneNumber(),
            abn: faker.datatype.number()
        }
        dispatch(createNewUser(user, history, true))
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

    const createReviews = () => {
        for (let i = 0; i < 10; i++) {
            const review = {
                username: "user@user.com",
                rating: faker.datatype.number(5),
                bookId: faker.datatype.number(10),
                review: faker.lorem.paragraph()
            }
            dispatch(reviewEdit(review, history, true))
        }
    }
    const createTransactions = () => {
        for (let i = 0; i < 10; i++) {
            const book = {
                userName: "user@user.com",
                bookIds: [faker.datatype.number(10),faker.datatype.number(10),faker.datatype.number(10),faker.datatype.number(10)],
            }
            dispatch(transactionEdit(book, history, true))
        }
    }
    const menu = (
        <Menu style={{ padding: "1rem" }}>
            {security.user.fullName ? <>
                <Text strong>Hello {security.user.fullName}</Text>
                <Divider style={{ margin: 0 }}></Divider>
                <Menu.Item key="/profile" onClick={() => history.push('profile')}>Profile</Menu.Item>
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
        <div style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",

        }}>
            <Button onClick={()=>history.push("/shoppingcart")} icon={<ShoppingCartOutlined />} />
            <Dropdown.Button  overlay={menu} placement="bottomRight" icon={<UserOutlined />} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Button type="primary" onClick={createDummyUser}>
                    Insert 10 Dummy Users
                </Button>
                <Button type="primary" onClick={createDummySeller}>
                    Insert 10 Dummy Sellers
                </Button>
                <Button type="primary" onClick={createBook}>
                    Insert 10 Dummy Books
                </Button>
                <Button type="primary" onClick={createAdmin}>
                    Insert 1 Admin
                </Button>
                <Button type="primary" onClick={createUser}>
                    Insert 1 User
                </Button>
                <Button type="primary" onClick={createSeller}>
                    Insert 1 Seller
                </Button>
                <Button type="primary" onClick={createReviews}>
                    Insert 10 Reviews
                </Button>
                <Button type="primary" onClick={createTransactions}>
                    Insert 10 Transaction
                </Button>
            </Modal>
        </div>
    )
}

export default withRouter(AccountSettings)
