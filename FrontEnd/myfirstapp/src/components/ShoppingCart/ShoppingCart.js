import { Col, Row, List, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { cartEdit, getUserCart } from '../../actions/cartActions';
import { getUser } from '../../actions/securityActions';

function ShoppingCart(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [bookList, setBookList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const user = useSelector(state => state.security);
    const cart = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    useEffect(() => {
        if (user.user.username) {
            dispatch(getUserCart(user.user.username, history, false))
            console.log("123")
        }
    }, [user])
    useEffect(() => {
        console.log(cart)
    }, [cart])
    useEffect(() => {
        const cart = props.location.state?.cart
        console.log(cart)
        const data = []
        if (props.location.state?.cart) {
            for (const book in cart) {
                console.log("Added:", book)
                data.push(cart[book])
                setTotalPrice(totalPrice + cart[book].bookCost)
            }
        }

        setBookList(data)
    }, [props.location.state])

    useEffect(() => {
        setBookList(cart.cart)
    }, [cart])
    useEffect(() => {
        console.log(totalPrice)
    }, [totalPrice])
    const { Title, Text } = Typography
    return (
        <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col xs={18} style={{ backgroundColor: "white", padding: "1rem" }}>
                <Row>
                    <Title variant="h1">Shopping Cart</Title>
                </Row>
                <Row>
                    <List
                        itemLayout="horizontal"
                        size="large"
                        dataSource={bookList}
                        footer={
                            <div>
                                <b>Total Books: </b> {bookList.length}
                            </div>
                        }
                        renderItem={book => (
                            <Link
                                to={{
                                    pathname: "/buy",
                                    state: { book: book }
                                }}>
                                <div className='search-result'>
                                    <List.Item
                                        key={book.Id}
                                        extra={
                                            //top is book cover, bottom is default image
                                            <object data={book.cover} style={{ width: '20%' }}>
                                                <img src={book.cover} />
                                            </object>
                                        }
                                    >
                                        <div style={{ width: '70%', overflowWrap: 'break-word' }}>
                                            <List.Item.Meta
                                                title={book.bookTitle}
                                                description={book.author}
                                            />
                                            {book.bookDescription}
                                        </div>
                                    </List.Item>
                                </div>
                            </Link>
                        )}
                    />
                </Row>
            </Col>
            <Col xs={4} style={{ backgroundColor: "white", padding: "1rem" }}>
                <Row>
                    <Title variant="h1">Order Summary</Title>

                </Row>
                <Row>
                    <Text>Total Price: {totalPrice}</Text>
                </Row>
                <Row>
                    <Link
                        to={{
                            pathname: "/payment",
                            state: { cart: bookList, totalPrice: totalPrice }
                        }}>
                        <Button>Proceed to Checkout</Button>
                    </Link>
                </Row>
            </Col>
        </Row>
    )
}

export default ShoppingCart
