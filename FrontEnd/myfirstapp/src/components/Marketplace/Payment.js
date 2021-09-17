//import './styles.css';
import React, { useEffect } from 'react';
import img from "./BookImages/DefaultCover.png";
import { Button, Card, Input, DatePicker, Row, Col } from 'antd';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { transactionEdit } from '../../actions/transactionActions';
import { getUser } from '../../actions/securityActions';
import { useHistory, withRouter } from 'react-router-dom'
import valid from 'card-validator'
import { cvv } from 'card-validator/dist/cvv';
function Payment(props) {
    const [bookList, setBookList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [expDate, setExpDate] = useState([]);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const [errorMessage, setErrorMessage] = useState([])
    useEffect(() => {
        setBookList(props.location.state.cart)
        setTotalPrice(props.location.state.totalPrice)
    }, [props.location.state])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    //useStates

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
        console.log(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(event.target.value).valueOf())
        if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(event.target.value).valueOf()) {
            setEmail(event.target.value);
            const error = errorMessage;
            delete error["email"]
            setErrorMessage(error)

        } else {
            setErrorMessage({ ...errorMessage, email: "Invalid email" })
        }

    };
    const handleCardNumber = (event) => {
        setCardNumber(event.target.value);
        console.log(valid.number(event.target.value))
        if (valid.number(event.target.value).isValid) {
            setCardNumber(event.target.value);
            const error = errorMessage;
            delete error["card"]
            setErrorMessage(error)
        } else {
            setErrorMessage({ ...errorMessage, card: "This card is invalid" })
        }

    };
    const handleCVV = (event) => {
        setCVV(event.target.value);
        console.log(valid.cvv(event.target.value))
        if (valid.cvv(event.target.value).isValid) {
            setCVV(event.target.value);
            const error = errorMessage;
            delete error["cvv"]
            setErrorMessage(error)
        } else {
            setErrorMessage({ ...errorMessage, cvv: "CVV invalid" })
        }

    };
    const handleExpDate = (date, dateString) => {
        setExpDate(dateString);
        console.log(valid.expirationDate(dateString))
        if (valid.expirationDate(dateString).isValid) {
            setExpDate(dateString);
            const error = errorMessage;
            delete error["exp"]
            setErrorMessage(error)
        } else {
            setErrorMessage({ ...errorMessage, exp: "Invalid Expiration date" })
        }
    };
    const handleAddress = (event) => {
        setAddress(event.target.value);
    };
    
    const handleSubmit = () => {
        const error = errorMessage;
        delete error["final"]
        setErrorMessage(error)
        const data = {
            userName: user.user.username,
            books: bookList.map((i) => { return i.id }),
            orderComplete: true,
            transactionCost: totalPrice,
        }
        console.log(errorMessage)
        if ((name && address && cardNumber && CVV && expDate && email) && Object.keys(errorMessage).length === 0) {
            console.log("PASS")
            dispatch(transactionEdit(data, history, false))
        } else {
            console.log("FAIL")
            setErrorMessage({ ...errorMessage, final: "Invalid Field" })
        }
    }

    return (
        <Row align="middle" justify="center" style={{ display: "flex", alignItems: "stretch" }}>
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <h1>Delivery Details</h1>
                    Email <br />
                    <Input type="email" onChange={handleEmail} style={{ width: '300px', marginBottom: '3%' }}></Input><br />
                    {errorMessage.email && <p style={{ color: "red" }}>{errorMessage.email}</p>}
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
                        <Input type='number' onChange={handleCardNumber} pattern="[0-9\s]" style={{ width: '300px', marginBottom: '3%' }}></Input><br />
                        {errorMessage.card && <p style={{ color: "red" }}>{errorMessage.card}</p>}
                        <Input.Group compact>
                            Expiry Date <br />
                            <DatePicker picker="month" onChange={handleExpDate} style={{ width: '300px', marginBottom: '3%' }} />
                            {errorMessage.exp && <p style={{ color: "red" }}>{errorMessage.exp}</p>}
                        </Input.Group><br />

                        CVV Number <br />
                        <Input type='number' onChange={handleCVV} pattern="[0-9\s]" style={{ width: '300px', marginBottom: '3%' }}></Input><br />
                        {errorMessage.cvv && <p style={{ color: "red" }}>{errorMessage.cvv}</p>}

                    </div>
                </Card></Col>
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <div >
                        <h1>Order Summary</h1>
                        <p>Total Books: {bookList.length}</p>
                        <p>Total Price: {totalPrice}</p>
                        <Button type="primary" shape="round" onClick={handleSubmit} style={{ width: '40%' }}>Purchase</Button>
                        {errorMessage.final && <p style={{ color: "red" }}>{errorMessage.final}</p>}
                    </div>
                </Card>
            </Col>
        </Row>


    );
}

export default withRouter(Payment)