//import './styles.css';
import React from 'react';
import img from "./BookImages/DefaultCover.png";
import { Button, Card, Input, DatePicker } from 'antd';
import { useState } from 'react';


export default function Payment(props) {

    //useStates
    const [fName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [address, setAddress] = useState('');

    const handleFirstName = (event) => {
        event.preventDefault();
        setFName(event.target.value);
    };
    const handleLastName = (event) => {
        event.preventDefault();
        setLName(event.target.value);
    };
    const handleEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };
    const handleCardNumber = (event) => {
        event.preventDefault();
        setCardNumber(event.target.value);
    };
    const handleExpDate = (event) => {
        event.preventDefault();
        setExpDate(event.target.value);
    };
    const handleAddress = (event) => {
        event.preventDefault();
        setAddress(event.target.value);
    };
    
    return (
        <Card style={{ width: 'fit-content', position:'relative', left:'50%', transform:'translate(-50%)', padding:'1%', marginTop:'5%' }}>
            <div >
            <h1>Enter Your Details!</h1>
                First Name <br />
                <Input style={{ width:'300px', marginBottom: '3%' }}></Input> <br />
                Last Name <br />
                <Input style={{ width:'300px', marginBottom: '3%' }}></Input><br />
                Email <br />
                <Input type="email" style={{ width:'300px', marginBottom: '3%' }}></Input><br />
                Card Number <br />
                <Input type='number' pattern="[0-9\s]" style={{ width:'300px', marginBottom: '3%' }}></Input><br />
                <Input.Group compact>
                    Expiry Date <br />
                    <DatePicker.RangePicker style={{ width:'300px', marginBottom: '3%' }} />
                </Input.Group>
                Address <br />
                <Input type='number' style={{ width:'300px', marginBottom: '5%' }}></Input><br />
                <Button type="primary" shape="round" style={{width:'40%'}}>Purchase</Button>
            </div>
        </Card>
    );
}