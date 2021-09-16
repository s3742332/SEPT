//import './styles.css';
import React, { useEffect } from 'react';
import img from "./BookImages/DefaultCover.png";
import { Button, Card, Input, DatePicker, Row, Col } from 'antd';
import { useState } from 'react';


export default function Payment(props) {
    const [bookList, setBookList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setBookList(props.location.state.cart)
        setTotalPrice(props.location.state.totalPrice)
    }, [props.location.state])
    //useStates
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState([]);
    const [address, setAddress] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleCardNumber = (event) => {
        setCardNumber(event.target.value);
    };
    const handleExpDate = (date, dateString) => {
        setExpDate(dateString);
    };
    const handleAddress = (event) => {
        setAddress(event.target.value);
    };
    const handleSubmit = () => {
        const data = {
            address: address,
            email: email,
            name: name,
            cardNumber: cardNumber,
            expDate: expDate
        }
        console.log(data)
    }
    return (
        <Row align="middle" justify="center" style={{ display: "flex", alignItems: "stretch" }}>
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <h1>Delivery Details</h1>
                    Email <br />
                    <Input type="email" onChange={handleEmail} style={{ width: '300px', marginBottom: '3%' }}></Input><br />
                    Address <br />
                    <Input type='text' onChange={handleAddress} style={{ width: '300px', marginBottom: '5%' }}></Input><br />
                </Card>
            </Col>
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <div >
                        <h1>Payment Details</h1>
                        Full Name <br />
                        <Input onChange={handleName} style={{ width: '300px', marginBottom: '3%' }}></Input> <br />

                        Card Number <br />
                        <Input type='number'  onChange={handleCardNumber} pattern="[0-9\s]" style={{ width: '300px', marginBottom: '3%' }}></Input><br />
                        <Input.Group compact>
                            Expiry Date <br />
                            <DatePicker.RangePicker picker="month" onChange={handleExpDate} style={{ width: '300px', marginBottom: '3%' }} />
                        </Input.Group>


                    </div>
                </Card></Col>
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <div >
                        <h1>Order Summary</h1>
                        <p>Total Books: {bookList.length}</p>
                        <p>Total Price: {totalPrice}</p>
                        <Button type="primary" shape="round" onClick={handleSubmit} style={{ width: '40%' }}>Purchase</Button>
                    </div>
                </Card>
            </Col>
        </Row>


    );
}