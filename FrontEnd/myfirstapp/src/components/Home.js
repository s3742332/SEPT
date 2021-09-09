import { ShopOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd'
import React from 'react'

function Home() {
    const { Title } = Typography;
    return (
        <Col>
                <Row style={{height: "calc(100vh - 64px)", textAlign: "center"}} justify="center" align="middle">
                    <Col>
                        <Title>Welcome to Bookeroo!</Title>
                        <Title variant="h3">Buy, Sell and Trade all your favourite books!</Title>
                        <Button size="large" icon={<ShopOutlined/>} type="primary">Explore the catalogue</Button>
                    </Col>
                </Row>
                <Row style={{height: "calc(100vh - 64px)", textAlign: "center"}} justify="center" align="middle">
                    <Col>
                        <Title>Second page</Title>
                    </Col>
                </Row>
                <Row style={{height: "calc(100vh - 64px)", textAlign: "center"}} justify="center" align="middle">
                    <Col>
                        <Title>Third page</Title>
                    </Col>
                </Row>
        </Col>
    )
}

export default Home
