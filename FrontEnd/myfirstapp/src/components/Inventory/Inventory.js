//import './styles.css';
import React from 'react';
import { Button, Card, Input, Row, Col, Modal } from 'antd';
import { Link } from 'react-router-dom';
import BookContainer from '../Marketplace/BookContainer';
import { useState } from 'react';


export default function Inventory(props) {
    const [modal, setModal] = useState(false);

    const handleModal = (event) => {
        event.preventDefault();
        setModal(!modal);
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Your Inventory</h1>
            <Card>
                <Row>
                    <Col sm={12} md={6} xs={24}>
                        <div>
                            <BookContainer
                                image="./BookImages/DefaultCover.png"
                                title="put title"
                                author="put author"
                                price="put price"
                            />
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" href='/details' shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Details</Button>
                                <Button onClick={handleModal} type="primary" shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Sell</Button>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} xs={24}>
                        <div>
                            <BookContainer
                                image="./BookImages/DefaultCover.png"
                                title="put title"
                                author="put author"
                                price="put price"
                            />
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" href='/details' shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Details</Button>
                                <Button onClick={handleModal} type="primary" shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Sell</Button>
                            </div>
                        </div>
                    </Col> <Col sm={12} md={6} xs={24}>
                        <div>
                            <BookContainer
                                image="./BookImages/DefaultCover.png"
                                title="put title"
                                author="put author"
                                price="put price"
                            />
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" href='/details' shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Details</Button>
                                <Button onClick={handleModal} type="primary" shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Sell</Button>
                            </div>
                        </div>
                    </Col> <Col sm={12} md={6} xs={24}>
                        <div>
                            <BookContainer
                                image="./BookImages/DefaultCover.png"
                                title="put title"
                                author="put author"
                                price="put price"
                            />
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" href='/details' shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Details</Button>
                                <Button onClick={handleModal} type="primary" shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Sell</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Modal"
                visible={modal}
                onOk={handleModal}
                onCancel={handleModal}
                okText="Okay"
                cancelText="Cancel"
            >
                <h4>Are you sure you want to sell your book?</h4>
                <p>Enter sale amount</p>
                $ <input type='number'></input>

            </Modal>
        </div>
    );
}