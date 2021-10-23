import { InputNumber, Form, Input, Button, Row, Col, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, fetchUserDetails } from '../../actions/securityActions';
import { userEdit } from '../../actions/userActions';
import PasswordChange from './PasswordChange';

function Profile() {
    const dispatch = useDispatch();
    const security = useSelector(state => state.security);
    const [user, setUser] = useState([])
    const { Title } = Typography
    const { TextArea } = Input;
    useEffect(() => {
        if (security.user.username) {
            dispatch(fetchUserDetails(security.user.username))
            dispatch(getUserDetails());
        }
    }, [security.user.username])

    useEffect(() => {
        if (security.userDetails.username) {
            console.log(security.userDetails)
            const {id, fullName, username, phoneNumber, address, userType, approved, abn, confirmPassword, password} = security.userDetails;
            setUser( {
                id: id,
                fullName: fullName,
                username: username,
                phoneNumber: phoneNumber,
                address: address,
                userType: userType,
                approved: approved,
                password: password,
                abn: abn
            })
        }
    }, [security.userDetails.username])

    useEffect(() => {
        console.log(user)
    }, [user])

    const handleChanges = (event) => {
        event.preventDefault();
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log(user)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(userEdit(user));
    }
    const [form] = Form.useForm();
    return (
        <Row justify="center" style={{ height: "100%" }}>
        <Col>
            <Title>Profile Page</Title>
            <Form
                layout="horizontal"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 14 }}
                form={form}
                size="medium"
                onChange={handleChanges}
            >
                <Form.Item label="User ID">
                    <Input name='id' disabled value={user.id}/>
                </Form.Item>
                <Form.Item label="Full Name">
                    <Input name="fullName" value={user.fullName}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input disabled name="username" value={user.username}/>
                </Form.Item>
                <Form.Item label="Address">
                    <TextArea name="address" value={user.address}/>
                </Form.Item>
                <Form.Item label="Phone Number">
                    <Input name="text" value={user.phoneNumber}/>
                </Form.Item>
                <Form.Item label="User Type">
                    <Input name="userType" disabled value={user.userType}/>
                </Form.Item>
                <Form.Item style={{ justifyContent: "center", textAlign: "center" }}>
                    <Button type='submit' onClick={onSubmit}>Save Changes</Button>
                </Form.Item>
                <PasswordChange userID={user.id}/>
            </Form>
        </Col>
    </Row>
    )
}

export default Profile
