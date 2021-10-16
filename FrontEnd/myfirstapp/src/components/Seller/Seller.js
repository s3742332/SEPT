import { Card, List } from "antd";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserAccountsList } from "../../actions/userActions";
import { useLocation } from "react-router";

export default (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const location = useLocation()
    const [account, setAccount] = useState({});
    const { seller } = location.state;

    useEffect(() => {
        dispatch(getUserAccountsList())
    }, [dispatch])
    useEffect(() => {
        if (!user.loading) {
            user.userAccounts.forEach(user => {
                if (user.fullName == seller) {
                    setAccount(user);
                }
            });
        }
    }, [user.loading, account])

    return (
        !account ? 'LOADING' :
            <div style={{ display: 'flex' }}>
                <Card style={{ width: '30%', margin: '5%' }}>
                    <h1>{account.fullName}</h1>
                    <br /><br />
                    <h5>{account.username}</h5>
                    <h5>{account.phoneNumber}</h5>
                    <h5>{account.abn}</h5>
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
