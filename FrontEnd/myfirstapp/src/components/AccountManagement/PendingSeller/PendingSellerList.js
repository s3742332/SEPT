import React from 'react'
import { List } from 'antd'
import { ShopFilled, UserOutlined } from '@ant-design/icons'
function PendingSellerList(props) {
    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={props.filteredList}
                style={{overflow: "auto", overflowX: "hidden", height: "calc(100vh - 244px)"}}
                renderItem={item => (
                    <List.Item onClick={() => props.setSelectedUser(item)} className="pendingItem">
                        <List.Item.Meta
                            avatar={item['userType']=== "seller" ? <ShopFilled/> : <UserOutlined/>}
                            title={item['fullName']}
                            description={item['username']}
                        />
                    </List.Item>
                )}
            />

        </>


    )
}

export default PendingSellerList
