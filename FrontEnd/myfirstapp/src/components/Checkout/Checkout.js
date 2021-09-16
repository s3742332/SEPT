import { Col, Row, List, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function Checkout(props) {
    const [bookList, setBookList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
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
        console.log(totalPrice)
    }, [totalPrice])
    const { Title, Text } = Typography
    return (
        <Row justify="center" style={{marginTop: "2rem"}}>
            <Col xs={18} style={{backgroundColor: "white", padding: "1rem"}}>
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
            <Col xs={4} style={{backgroundColor: "white", padding: "1rem"}}>
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

export default Checkout
