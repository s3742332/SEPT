import React, { useState, useEffect } from 'react'
import { getUser } from '../../actions/securityActions';
import { getUserTransaction } from '../../actions/transactionActions'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tag, Row, Col, Typography } from 'antd';

function CustomerTransactions() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const transactions = useSelector(state => state.transaction)
    const [transaction, setTransaction] = useState([])
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    useEffect(() => {
        dispatch(getUserTransaction(user.user.username))
    }, [dispatch, user])
    useEffect(() => {
        console.log("transaction", transactions.userTransaction)
        setTransaction(transactions.userTransaction)
    }, [transactions])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Book IDs',
            dataIndex: 'bookIds',
            key: 'bookTitle',
            render: text => <a>{text.map((i)=> {return i +" "})}</a>,
        },
        {
            title: 'Order Status',
            dataIndex: 'orderComplete',
            key: 'author',
            render: text => <a>{"COMPLETED"}</a>,
        },
        {
            title: 'Cost',
            dataIndex: 'transactionCost',
            key: 'transactionCost',
        },
    ];

    const { Title } = Typography;
    return (
        <Row justify="center" style={{ height: "calc(100vh - 134px)" }}>
            <Col span={12}>
                <Title style={{ textAlign: "center" }}>Order History</Title>
                <Table columns={columns} dataSource={transaction} />
            </Col>
        </Row>
    )
}

export default CustomerTransactions
