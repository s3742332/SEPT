import { Button, Col, DatePicker, Row, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../actions/transactionActions';
import { CSVLink } from "react-csv";
function TransactionReport() {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transaction)
    const [data, setData] = useState([])
    const [final, setFinal] = useState([])
    const [range, setRange] = useState([])
    useEffect(() => {
        dispatch(getAllTransactions())
    }, [dispatch])

    useEffect(() => {
        setData(transactions.allTransactions)
        console.log(transactions.allTransactions)
    }, [transactions.allTransactions])
    const { RangePicker } = DatePicker;
    const {Title} = Typography;
    const onChange = (dates) => {
        setRange([dates[0], dates[1]])
    }
    const onSubmit = () => {
        let filter = data.filter(e => moment(e.createdAt).isBetween(range[0].format("YYYY-MM-DD"), range[1].format("YYYY-MM-DD")))
        setFinal(filter)

    }
    const headers = [
        { label: "TransactionID", key: "id" },
        { label: "Username", key: "userName" },
        { label: "PurchaseDate", key: "createdAt" },
        { label: "BookIDs", key: "bookIds" },
        { label: "Cost", key: "transactionCost" }
    ];
    return (
        <Row align="middle" justify="center">
            <Col xs={24} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Title size="1">Export to CSV</Title>
                <RangePicker onChange={onChange} style={{marginBottom: "1rem"}}/>
                <CSVLink data={final} headers={headers}>
                    <Button type="primary" size="large"
                        onClick={onSubmit}>
                        Export
                    </Button>
                </CSVLink>

            </Col>
        </Row>
    )
}

export default TransactionReport
