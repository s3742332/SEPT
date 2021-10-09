import React from "react";
import { Button, Card, Input } from 'antd';
import TextArea from "rc-textarea";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage } from "../../actions/messageActions";

const Message = () => {
    const [text, setText] = useState('')
    const [sent, setSent] = useState(false)
    const security = useSelector(state => state.security);
    const dispatch = useDispatch();

    const handleText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    }

    const submitMessage = (e) => {
        e.preventDefault();
        let message = {
            username: security.user.fullName,
            message: text
        }
        dispatch(saveMessage(message));

        setSent(true);
    }

    return (
        <div>
            {
                !sent ?
                    <div style={{ display: "grid", placeItems: "center", paddingTop: 100 }}>
                        <h1>Send a Message to our Admins</h1>
                        <TextArea rows={10} placeholder="Contact Our Admins" style={{ width: " 45% " }} onChange={handleText} />
                        <Button type="primary" shape="round" size="large" style={{ marginTop: 20 }} onClick={submitMessage} >Submit</Button>
                    </div>
                    :
                    <div style={{ display: "grid", placeItems: "center", paddingTop: 100 }}>
                        <Card title="Your Message Has Been Sent!" style={{ width: " 45% " }}>
                            <p>{text}</p>
                        </Card>
                        <Button type="primary" shape="round" size="large" style={{ marginTop: 20 }} onClick={() => {
                            setSent(!sent);
                        }}>Submit Another</Button>
                    </div>
            }
        </div>);
}

export default Message;