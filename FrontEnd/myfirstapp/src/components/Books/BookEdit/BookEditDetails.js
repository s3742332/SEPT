import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Col, Row, Collapse } from 'antd';
import { bookEdit } from '../../../actions/bookActions';
import Preview from '../../Preview'
function BookEditDetails(props) {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const { TextArea } = Input;
    const { id, bookTitle, author, bookDescription, bookCost, stockLevel, approved, cover, preview } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props.data)
        setData(props.data)
    }, [props.data])

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleBlock = (e) => {
        e.preventDefault();
        dispatch(bookEdit(data));
        props.handleFetch();
    }
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(bookEdit(data));
        props.handleFetch();
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
                            id="bookTitle"
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

                    <Collapse>
                        <Panel header="Cover" key="1">
                            <Row className={"accountRow"}>
                                <Col span={12}>
                                    <img src={cover} alt="book cover" style={{
                                        width: '50%',
                                        objectFit: "contain"
                                    }} />
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="Preview" key="2">
                            <Row className={"accountRow"}>
                                <Col span={12} style={{display: 'flex'}}>
                                    <div>{bookTitle}</div>
                                    <Preview preview={preview} />
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                </Col>
                <Row justify={"end"}>
                    <Button style={{ marginRight: "1rem" }} size="large" type="danger" onClick={handleBlock}>Delete</Button>
                    <Button size="large" type="primary" onClick={handleEdit}>Edit</Button>
                </Row>
            </Col>
            : null : null)
    )
}


export default BookEditDetails
