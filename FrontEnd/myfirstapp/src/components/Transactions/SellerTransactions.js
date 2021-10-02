import React, { useState, useEffect } from 'react'
import { getUser } from '../../actions/securityActions';
import { getSellerTransaction } from '../../actions/transactionActions'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Typography, List, Space } from 'antd';
import { Link } from 'react-router-dom';


function SellerTransactions() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const transactions = useSelector(state => state.transaction)
    const [transaction, setTransaction] = useState([])
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    useEffect(() => {
        dispatch(getSellerTransaction(user.user.username))
    }, [dispatch, user])

    useEffect(() => {
        if (transactions.sellerTransaction) {
            var groupBy = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, []);
            };
            var groubedByTeam = groupBy(transactions.sellerTransaction, 'id');
            var filtered = groubedByTeam.filter(function (x) {
                return x !== undefined;
            });
            setTransaction(filtered)
        }
    }, [transactions.sellerTransaction])

useEffect(() => {
    console.log("T",transaction)
}, [transaction])
    const { Title } = Typography;
    return (
        <Row justify="center" style={{ height: "calc(100vh - 134px)" }}>
            <Col span={12}>
                <Title style={{ textAlign: "center" }}>Order History</Title>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={transaction}
                    footer={
                        <div>
                            <b>Total Books Sold: </b> {transactions.sellerTransaction.length}
                        </div>
                    }
                    renderItem={transactionData => (


                        <List.Item
                            style={{ height: "250px" }}
                            key={transactionData[0].id}
                            extra={
                                //top is book cover, bottom is default image       
                                <img src={
                                    transactionData[0].cover} alt={transactionData[0].cover} style={{
                                        height: "inherit",
                                        objectFit: "scale-down"
                                    }} />
                            }
                            actions={[
                
                                        <Space>{"Quuantity Sold: " + transactionData.length}</Space>,
                
                                    ]}
                        >
                            <List.Item.Meta

                                title={
                                    <Link
                                        to={{
                                            pathname: "/buy",
                                            state: { book: transactionData[0] }
                                        }}>{transactionData[0].bookTitle}</Link>}
                                description={transactionData[0].author}

                            />
                            {transactionData[0].bookDescription}
                        </List.Item>
                    )
                    }
                />
            </Col>
        </Row>
    )
}

export default SellerTransactions
