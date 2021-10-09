import React, {useState} from 'react'
import { InputNumber, Form, Input, Button, Row, Col, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../actions/securityActions';

function PasswordChange(props) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [newPassword, setNewPassword] = useState()
    const handleChanges = (event) => {
        event.preventDefault();
        setNewPassword({ ...newPassword, [event.target.name]: event.target.value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword({
            id: props.userID,
            password: newPassword.password
        }))
    }
    return (
        <div>
            <Form
                layout="horizontal"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 14 }}
                form={form}
                size="medium"
                onChange={handleChanges}
            >
                <Form.Item label="Change Password">
                <Input.Password name="password" placeholder="Enter New Password" />
                </Form.Item>

                <Form.Item style={{ justifyContent: "center", textAlign: "center" }}>
                    <Button type='submit' onClick={onSubmit}>Change Password</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PasswordChange
