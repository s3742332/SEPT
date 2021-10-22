import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Col, Row, Select } from 'antd';
import { blockUser, userEdit } from '../../../actions/userActions';

function AccountEditDetails(props) {
    const [data, setData] = useState([])
    const { id, fullName, address, phoneNumber, username, abn, userType, approved, create_At } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        setData(props.data)

        console.log(props.data)
    }, [props.data])

    const handleChange = (e) => {
        const { id, value } = e.target
        setData({ ...data, [id]: value });
    }
    const handleBlock = (e) => {
        e.preventDefault();
        console.log(id)
        dispatch(blockUser(id));
    }

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(userEdit(data));
    }
    const handleUserSelect = (e) => {
        setData({ ...data, "userType": e });
    }
    const { Option } = Select;
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
                        <Col span={12}>
                            <Input.Group compact>
                                <Input disabled value={"Account Type"} style={{ width: '25%', color: 'rgba(0, 0, 0, 0.85)', backgroundColor: "#fafafa", cursor: 'auto' }} />
                                <Select defaultValue={userType} style={{ width: "75%" }} onChange={handleUserSelect}>
                                    <Option value="customer" >Customer</Option>
                                    <Option value="seller" >Seller</Option>
                                    <Option value="admin" >Admin</Option>
                                </Select>
                            </Input.Group>
                        </Col>
                        <Col span={12}><Input
                            id="accountStatus"
                            addonBefore="Account Status"
                            value={approved ? "APPROVED" : "PENDING"}
                            variant="filled"
                            disabled

                        /></Col>

                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="created_at"
                            addonBefore="Account Creation Date"
                            value={create_At}
                            variant="filled"
                            disabled

                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="name"
                            addonBefore={userType === "seller" ? "Seller Business Name" : "Full Name"}
                            value={fullName || ''}
                            variant="filled"
                            onChange={handleChange}

                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="username"
                            addonBefore={"Username"}
                            value={username || ''}
                            variant="filled"
                            onChange={handleChange}

                        />
                    </Row>
                    {userType === "seller" ? <Row className={"accountRow"}>
                        <Input
                            id="abn"
                            addonBefore="ABN"
                            value={abn || '000000'}
                            variant="filled"
                            onChange={handleChange}

                        />
                    </Row> : null}
                    <Row className={"accountRow"}>
                        <Input
                            id="phone"
                            addonBefore="Phone Number"
                            value={phoneNumber || ''}
                            variant="filled"
                            onChange={handleChange}

                        />
                    </Row>
                    <Row className={"accountRow"}>
                        <Input
                            id="address"
                            addonBefore="Address"
                            value={address || ''}
                            variant="filled"
                            onChange={handleChange}
                        />
                    </Row>
                </Col>
                <Row justify={"end"}>
                    <Button style={{ marginRight: "1rem" }} size="large" type="danger" onClick={handleBlock}>Block</Button>
                   
                    <Button size="large" type="primary" onClick={handleEdit}>Edit</Button>
                </Row>
            </Col>
            : null : null)
    )
}


export default AccountEditDetails
