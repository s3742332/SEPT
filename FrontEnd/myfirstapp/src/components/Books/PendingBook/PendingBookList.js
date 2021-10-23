import React from 'react'
import { List } from 'antd'
function PendingSellerList(props) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.filteredList}
            style={{ overflow: "auto", overflowX: "hidden", height: "calc(100vh - 268px)" }}
            renderItem={item => (
                <List.Item onClick={() => props.setSelectedBook(item)} className="pendingItem" key={item.id}>
                    <List.Item.Meta
                        title={`${item['bookTitle']}, ${item['author']}`}
                        description={item['companyName']}
                    />
                </List.Item>
            )}
        />
    )
}

export default PendingSellerList
