import React from "react";
import { Divider, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from "../../actions/messageActions";
import { useState, useEffect } from "react";


const ViewMessages = () => {
    const dispatch = useDispatch();
    const [messageData, setMessageData] = useState([]);
    const message = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch])
    useEffect(() => {
        setMessageData(message.messageList)
    }, [message, messageData])


    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={messageData}
                renderItem={item => (
                    <div style={{width:"45%", marginLeft: "10%"}}>
                        <List.Item>
                            <Divider orientation="left">{item.username}</Divider> <br />
                            <List.Item.Meta
                                description={item.message}
                            />
                        </List.Item>
                    </div>
                )}
            />
        </div>
    );
}

export default ViewMessages;