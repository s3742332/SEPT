import { Card, List, Input, Button } from "antd";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserAccountsList } from "../../actions/userActions";
import { useLocation } from "react-router";
import { sellerReviewSave } from "../../actions/sellerReviewActions";

export default (props) => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const location = useLocation()
    const [account, setAccount] = useState({});
    const { seller } = location.state;
    const [review, setReview] = useState({})

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

    const updateReviewText = (event) => {
        setReview({
            username: seller,
            review: event.target.value
        })
    }

    const submitReview = async () => {
        await dispatch(sellerReviewSave(review));
        window.location.reload(false);
    }

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
                    <TextArea showCount maxLength={255} placeholder="Submit a Review" onChange={updateReviewText} />
                    <br />
                    <Button type="primary" onClick={submitReview}>Submit</Button>
                    <br />
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
