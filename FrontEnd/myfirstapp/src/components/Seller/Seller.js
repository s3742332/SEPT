import { Card, List } from "antd";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserAccountsList } from "../../actions/userActions";
import { useLocation } from "react-router";

export default (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [account, setAccount] = useState({});
    const {seller} = location.state;


    useEffect(() => {
        console.log('seller',seller)
        dispatch(getUserAccountsList())
        setLoading(false)
    }, [dispatch])
    useEffect(() => {
        if (!loading) {
            setUserList(user.userAccounts);
            console.log('userlist',userList)
        }
    }, [loading])
    useEffect(() => {
        if (userList) {
            userList.forEach(user => {
                if (user.email == seller) {
                    setAccount(user);
                    console.log('acc',account)
                }
            });
        }
    }, [])
    return (
        !account ? 'LOADING' :
        <div style={{ display: 'flex' }}>
            <Card style={{ width: '30%', margin: '5%' }}>
                <h1>SELLER</h1>
                <br /><br />
                <h5>PENGUIN BOOKS</h5>
                <h5>{account.email}</h5>
                <h5>0123456789</h5>
                <h5>0987654321123456</h5>
            </Card>

            <Card style={{ width: '50%', margin: '5%' }}>
                <List
                    itemLayout="horizontal"
                    // dataSource={}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title="USER'S NAME"
                                description="REVIEW"
                            />
                        </List.Item>
                    )}
                />

            </Card>
        </div>
    );
}
