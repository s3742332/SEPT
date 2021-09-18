import React from 'react'
import { List, Avatar } from 'antd'
import { ShopFilled, UserOutlined } from '@ant-design/icons'
function AccountEditList(props) {
    const { loading } = props.list
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.filteredList}
            style={{overflow: "auto", overflowX: "hidden", height: "calc(100vh - 268px)"}}
            renderItem={item => (
                <List.Item onClick={() => props.setSelectedUser(item)} className="pendingItem">
                    <List.Item.Meta
                        avatar={item['userType'] === "seller" ? <ShopFilled /> : <UserOutlined />}
                        title={item['fullName']}
                        description={item['username']}
                    />
                </List.Item>
            )}
        />
    )
}

export default AccountEditList
