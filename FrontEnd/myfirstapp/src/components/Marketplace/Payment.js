import React, { useEffect } from 'react';
import { Card, Col } from 'antd';
import { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { transactionEdit } from '../../actions/transactionActions';
import { getUser } from '../../actions/securityActions';
import { useHistory, withRouter } from 'react-router-dom'
import valid from 'card-validator'
import PayPal from './PayPal';
function Payment(props) {
    const [bookList, setBookList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const [errorMessage, setErrorMessage] = useState([])
    useEffect(() => {
        console.log(props.location.state.cart)
        setBookList(props.location.state.cart)
        setTotalPrice(props.location.state.totalPrice)
    }, [props.location.state])

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
            <Col xs="8">
                <Card style={{ width: 'fit-content', position: 'relative', left: '50%', transform: 'translate(-50%)', padding: '1%', marginTop: '5%', height: "100%" }}>
                    <div >
                        <h1>Order Summary</h1>
                        <p>Total Books: {bookList.length}</p>
                        <p>Total Price: {totalPrice}</p>
                        {totalPrice > 0 ?
                            <PayPal price={totalPrice} userName={user.user.username} books={props.location.state.cart} transactionCost={totalPrice} history={history} />
                            : ''}
                    </div>
                </Card>
            </Col>
    );
}

export default withRouter(Payment)