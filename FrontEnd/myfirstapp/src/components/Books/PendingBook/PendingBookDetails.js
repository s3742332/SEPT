import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Row, Col, Select } from 'antd';
import { bookEdit } from '../../../actions/bookActions';

function PendingSellerDetails(props) {
    const [data, setData] = useState([])
    const { id, title } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleBlock = (e) => {
        e.preventDefault();
        dispatch(bookEdit(data));
    }
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(bookEdit(data));
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
                            id="title"
                            addonBefore="Title"
                            value={title || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                </Col>
                <Row justify={"end"}>
                    <Button style={{ marginRight: "1rem" }} size="large" type="danger" onClick={handleBlock}>Delete</Button>
                    <Button size="large" type="primary" onClick={handleEdit}>Edit</Button>
                </Row>
            </Col>
            : null : null)
    )
}


export default PendingSellerDetails