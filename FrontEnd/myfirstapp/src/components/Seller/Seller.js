import { Card, List } from "antd";
import React from "react"

export default (props) => {
    return (
        <div style={{display:'flex'}}>
            <Card style={{ width: '30%', margin: '5%' }}>
                <h1>SELLER</h1>
                <br /><br />
                <h5>PENGUIN BOOKS</h5>
                <h5>EMAIL@EMAIL.com</h5>
                <h5>0123456789</h5>
                <h5>0987654321123456</h5>
            </Card>

            <Card style={{ width: '50%', margin: '5%' }}>
                <List
                    itemLayout="horizontal"
                    // dataSource={}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title="USER'S NAME"
                                description="REVIEW"
                            />
                        </List.Item>
                    )}
                />

            </Card>
        </div>
    );
}
