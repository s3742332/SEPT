import React, { useState, useEffect } from 'react'
import { getUser } from '../../actions/securityActions';
import { cancelOrder, getUserTransaction } from '../../actions/transactionActions'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tag, Row, Col, Typography, Button } from 'antd';
import moment from 'moment';

function CustomerTransactions() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const transactions = useSelector(state => state.transaction)
    const [transaction, setTransaction] = useState([])
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    useEffect(() => {
        if(user.user.username){
            dispatch(getUserTransaction(user.user.username))
        }
    }, [user.user.username])
    useEffect(() => {
        if(!transactions.loading){
            console.log("transaction", transactions.userTransaction)
            setTransaction(transactions.userTransaction)
        }
    }, [transactions.loading])
    const handleCancel = (data) => {
        dispatch(cancelOrder(data.id, user.user.username))
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Purchase Date',
            dataIndex: 'createdAt',
            key: 'purchaseDate',
            render: text => <p>{moment(text).format("DD-MM-YYYY hh:mmA")}</p>,
        },
        {
            title: 'Book IDs',
            dataIndex: 'bookIds',
            key: 'bookTitle',
            render: text => <p>{text.map((i) => { return i + " " })}</p>,
        },
        {
            title: 'Order Status',
            dataIndex: 'orderComplete',
            key: 'author',
            render: text => <p>{"COMPLETED"}</p>,
        },
        {
            title: 'Cost',
            dataIndex: 'transactionCost',
            key: 'transactionCost',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Options',
            render: (data) => {
                var start = moment(data.createdAt)
                var duration = moment.duration(moment().diff(start)).asHours();
                if (duration > 2) {
                    return <Button size="small" type="danger" disabled onClick={() => handleCancel(data)}>Cancel Order</Button>
                } else {
                    return <Button size="small" type="danger" onClick={() => handleCancel(data)}>Cancel Order</Button>
                }
            },
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
