import { Col, Row, List, Typography, Button, Space } from 'antd'
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
        }
    }, [user])
    useEffect(() => {
        const cart = props.location.state?.cart
        console.log("SINGLE ITEM FOUND", cart)
        const data = []
        if (props.location.state?.cart) {
            for (const book in cart) {
                console.log("Added:", book)
                data.push(cart[book])
                setTotalPrice(totalPrice + cart[book].bookCost)
            }
        }

        setBookList(data)
    }, [props.location.state?.cart])


    useEffect(() => {
        if (!props.location.state?.cart) {
            const array = [
                {
                    id: 3,
                    seller: "Kuphal - Kutch",
                    bookTitle: "Lead Marketing Associate",
                    author: "Dolores O'Hara",
                    bookDescription: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                    bookCost: 374.0,
                    stockLevel: 72286,
                    approved: true,
                    isbn: "1084",
                    cover: "http://placeimg.com/640/480",
                    category: [
                        "Fantasy",
                        "Romance"
                    ],
                    used: false
                },
                {
                    id: 3,
                    seller: "Kuphal - Kutch",
                    bookTitle: "Lead Marketing Associate",
                    author: "Dolores O'Hara",
                    bookDescription: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                    bookCost: 374.0,
                    stockLevel: 72286,
                    approved: true,
                    isbn: "1084",
                    cover: "http://placeimg.com/640/480",
                    category: [
                        "Fantasy",
                        "Romance"
                    ],
                    used: false
                },
                {
                    id: 4,
                    seller: "Hartmann LLC",
                    bookTitle: "Central Security Manager",
                    author: "Ms. Terri Jaskolski",
                    bookDescription: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
                    bookCost: 11.0,
                    stockLevel: 73566,
                    approved: true,
                    isbn: "99509",
                    cover: "http://placeimg.com/640/480",
                    category: [
                        "Fantasy",
                        "Romance"
                    ],
                    used: false
                },
            ]

            var groupBy = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, []);
            };
            var groubedByTeam = groupBy(array, 'id');
            var filtered = groubedByTeam.filter(function (x) {
                return x !== undefined;
            });

            setBookList(filtered)
            console.log("GROUP", filtered);
        }
    }, [])

    useEffect(() => {
        console.log(totalPrice)
    }, [totalPrice])
    useEffect(() => {
        console.log("booklist", bookList)
    }, [bookList])
    const { Title, Text } = Typography

    return (
        <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col xs={18} style={{ backgroundColor: "white", padding: "1rem" }}>
                <Row>
                    <Title variant="h1">Shopping Cart</Title>
                </Row>
                <Row>
                    {props.location.state?.cart ?
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={bookList}
                            footer={
                                <div>
                                    <b>Total Books: </b> {bookList.length}
                                </div>
                            }
                            renderItem={book => (


                                <List.Item
                                    style={{ height: "250px" }}
                                    key={book.Id}
                                    extra={
                                        //top is book cover, bottom is default image       
                                        <img src={book.cover} alt={book.cover} style={{
                                            height: "inherit",
                                            objectFit: "scale-down"
                                        }} />
                                    }
                                    actions={[
                                        <Space><Button>-</Button></Space>,
                                        <Space>{book.length}</Space>,
                                        <Space><Button>+</Button></Space>,
                                    ]}
                                >
                                    <List.Item.Meta

                                        title={<>
                                            <Space><Button type={"danger"} size={"small"}>Remove</Button></Space><br />
                                            <Link
                                                to={{
                                                    pathname: "/buy",
                                                    state: { book: book }
                                                }}>{book.bookTitle}</Link></>}
                                        description={book.author}

                                    />
                                    {book.bookDescription}
                                </List.Item>
                            )
                            }
                        /> :

                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={bookList}
                            footer={
                                <div>
                                    <b>Total Books: </b> {bookList.length}
                                </div>
                            }
                            renderItem={book => (


                                <List.Item
                                    style={{ height: "250px" }}
                                    key={book[0].Id}
                                    extra={
                                        //top is book cover, bottom is default image       
                                        <img src={book[0].cover} alt={book[0].cover} style={{
                                            height: "inherit",
                                            objectFit: "scale-down"
                                        }} />
                                    }
                                    actions={[
                                        <Space><Button>-</Button></Space>,
                                        <Space>{book.length}</Space>,
                                        <Space><Button>+</Button></Space>,
                                    ]}
                                >
                                    <List.Item.Meta

                                        title={<>
                                            <Space><Button type={"danger"} size={"small"}>Remove</Button></Space><br />
                                            <Link
                                                to={{
                                                    pathname: "/buy",
                                                    state: { book: book[0] }
                                                }}>{book[0].bookTitle}</Link></>}
                                        description={book[0].author}

                                    />
                                    {book[0].bookDescription}
                                </List.Item>
                            )
                            }
                        />}
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
