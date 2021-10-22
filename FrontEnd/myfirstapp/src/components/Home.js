import { DollarCircleOutlined, ShopOutlined, ShoppingCartOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography, Card } from 'antd'
import React from 'react'
import { useHistory } from 'react-router';

function Home() {
    const history = useHistory();
    const { Title } = Typography;
    const { Meta } = Card;
    return (
        <Col>
            <Row style={{
                height: "calc(100vh - 64px)", textAlign: "center", backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(homebackground.jpg)`}} justify="center" align="middle">
                <Col>
                    <Title style={{ color: "white" }}>Welcome to Bookeroo!</Title>
                    <Title style={{ color: "white" }} variant="h3">Buy, Sell and Trade all your favourite books!</Title>
                    <Button size="large" onClick={()=> history.push('/browse')} icon={<ShopOutlined />} type="primary">Explore the catalogue</Button>
                </Col>
            </Row>
            <Row style={{ height: "calc(100vh - 64px)", display: "flex" }} justify="center" align="middle">
                <Col xs={24} style={{textAlign:"center"}}>
                    <Title>What do we provide</Title>
                </Col>
                <Col xs={24} md={8}>
                    <Row style={{ float: "right" }}>
                        <Card
                            style={{ width: 240, textAlign: "center" }}

                            cover={<ShoppingCartOutlined style={{ fontSize: "15rem" }} />}
                        >
                            <Meta title="Buy" description="Buy new books from businesses and purchase used books from other readers!" />
                        </Card>
                    </Row>
                </Col>
                <Col xs={24} md={8}>
                    <Row style={{ justifyContent: "center" }}>
                        <Card
                            style={{ width: 240, textAlign: "center" }}

                            cover={<DollarCircleOutlined style={{ fontSize: "15rem" }} />}
                        >
                            <Meta title="Sell" description="Sell your used books that you finished reading to other readers!" />
                        </Card>
                    </Row>
                </Col>
                <Col xs={24} md={8}>
                    <Row>
                        <Card
                            style={{ width: 240, textAlign: "center" }}
                            cover={<SwapOutlined style={{ fontSize: "15rem" }} />}
                        >
                            <Meta title="Trade" description="Swap your books with other readers" />
                        </Card>
                    </Row>
                </Col>
            </Row>
            <Row style={{ height: "calc(100vh - 64px)", textAlign: "center" }} justify="center" align="middle">
                <Col>
                    <Title>Books sold</Title>
                    <Title>0</Title>
                </Col>
            </Row>
        </Col>
    )
}

export default Home
