import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Col, Row } from 'antd';
import { userEdit } from '../../../actions/userActions';

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
        dispatch(userEdit(data));
    }
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(userEdit(data));
    }


    return (
        (data ? data.length !== 0 ?
            <>
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
                    <Row>
                        <Col span={12}><Input
                            id="accountType"
                            addonBefore="Account Type"
                            value={
                                userType
                            }
                            variant="filled"
                            disabled
                        /></Col>
                        <Col span={12}><Input
                            id="accountStatus"
                            addonBefore="Account Status"
                            value={approved === null ? "PENDING" : approved ? "APPROVED" : "DENIED"}
                            variant="filled"
                            disabled
                            
                        /></Col>

                    </Row>
                    <Row>
                        <Input
                            id="created_at"
                            addonBefore="Account Creation Date"
                            value={create_At}
                            variant="filled"
                            disabled
                            
                        />
                    </Row>
                    <Row>
                        <Input
                            id="name"
                            addonBefore={userType === "seller" ? "Seller Business Name" : "Full Name"}
                            value={fullName || ''}
                            variant="filled"
                            onChange={handleChange}
                            
                        />
                    </Row>
                    <Row>
                        <Input
                            id="username"
                            addonBefore={"Username"}
                            value={username || ''}
                            variant="filled"
                            onChange={handleChange}
                            
                        />
                    </Row>
                    {userType === "seller" ? <Row>
                        <Input
                            id="abn"
                            addonBefore="ABN"
                            value={abn || '000000'}
                            variant="filled"
                            onChange={handleChange}
                            
                        />
                    </Row> : null}
                    <Row>
                        <Input
                            id="phone"
                            addonBefore="Phone Number"
                            value={phoneNumber || ''}
                            variant="filled"
                            onChange={handleChange}
                            
                        />
                    </Row>
                    <Row>
                        <Input
                            id="address"
                            addonBefore="Address"
                            value={`${address}` || ''}
                            variant="filled"
                            onChange={handleChange}
                            
                        />
                    </Row>
                </Col>
                <Row justify={"end"}>
                        <Button style={{ marginRight: "1rem" }} size="large" type="danger" onClick={handleBlock}>Block</Button>
                        <Button size="large" type="primary" onClick={handleEdit}>Edit</Button>
                </Row>
            </>
            : null : null)
    )
}


export default AccountEditDetails
