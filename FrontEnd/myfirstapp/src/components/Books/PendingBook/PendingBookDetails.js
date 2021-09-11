import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Row, Col, Select } from 'antd';
import { bookEdit } from '../../../actions/bookActions';

function PendingSellerDetails(props) {
    const [data, setData] = useState([])
    const { TextArea } = Input;
    const { id, bookTitle, author, bookDescription, bookCost, stockLevel, approved } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleDeny = (e) => {
        e.preventDefault();
        dispatch(bookEdit({ ...data, approved: false }));
    }
    const handleApprove = (e) => {
        e.preventDefault();
        dispatch(bookEdit({ ...data, approved: true }));
    }

    return (
        (data ? data.length !== 0 ?
            <Col style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
            }}>
                <Col>
                    <Row className={"accountRow"}>
                        <Input
                            id="id"
                            addonBefore="ID"
                            value={id || ''}
                            variant="filled"
                            disabled
                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="approved"
                            addonBefore="Status"
                            value={approved ? "Approved" : "False"}
                            variant="filled"
                            onChange={handleChange}
                            disabled
                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="title"
                            addonBefore="Title"
                            value={bookTitle || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="author"
                            addonBefore="Author"
                            value={author || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input.Group compact>
                            <Input disabled value={"Description"} style={{ width: '25%', height: "100%", color: 'rgba(0, 0, 0, 0.85)', backgroundColor: "#fafafa", cursor: 'auto' }} />
                            <TextArea
                                style={{ width: "75%" }}
                                id="bookDescription"
                                value={bookDescription || ''}
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Input.Group>

                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="stockLevel"
                            addonBefore="Stock Level"
                            type="number"
                            value={stockLevel || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="bookCost"
                            addonBefore="Price"
                            type="number"
                            value={bookCost || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                </Col>
                <Row justify={"end"}>
                    <Col>
                        <Button style={{ marginRight: "1rem" }} size="large" type="danger" onClick={handleDeny}>Reject</Button>
                        <Button size="large" type="primary" onClick={handleApprove}>Approve</Button>
                    </Col>
                </Row>
            </Col>
            : null : null)
    )
}


export default PendingSellerDetails