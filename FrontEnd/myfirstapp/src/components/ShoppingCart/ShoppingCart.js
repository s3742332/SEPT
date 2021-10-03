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
    const [decrementDisable, setDecrementDisable] = useState({});
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    useEffect(() => {
        if (user.user.username) {
            dispatch(getUserCart(user.user.username, history, false))
        }
    }, [user])
    useEffect(() => {
        if (user.user.username && cart.cart) {

            if (props.location.state?.book) {
                const book = props.location.state?.book
                console.log("SINGLE ITEM FOUND", book)
                setTotalPrice(book.bookCost)
                setBookList([book])
                return;
            } else {
                if (cart?.cart?.books) {
                    console.log("SHOPPING CART DETECTED", cart.cart?.books)
                    var groupBy = function (xs, key) {
                        return xs.reduce(function (rv, x) {
                            (rv[x[key]] = rv[x[key]] || []).push(x);
                            return rv;
                        }, []);
                    };
                    var groubedByTeam = groupBy(cart.cart.books, 'id');
                    var filtered = groubedByTeam.filter(function (x) {
                        return x !== undefined;
                    });
                    setBookList(filtered);
                    setTotalPrice(cart.cart.cartTotal)
                    for (let i in filtered) {
                        if (filtered[i].length === 1) {
                            setDecrementDisable({ ...decrementDisable, [i]: false });
                        }
                    }
                    console.log("GROUP", filtered);
                }

            }
        }

    }, [props.location.state?.book, cart.cart?.books, user.user?.username])


    const increment = (count, bookID) => {
        if (count >= 1) {
            let disable = { ...decrementDisable, [bookID]: false }
            setDecrementDisable(disable);
        }
        console.log("Incrementing")
        const cartData = cart.cart.cartContents;

        if (props.location.state?.book) {
           
            const data = [...bookList, props.location.state.book]
            console.log("AE",data)
            setBookList(data)
            return;
        } else
            if (cart?.cart?.books) {
                cartData.push(bookID)
                console.log("CART DETECTED", cartData)
                const data = {
                    id: cart.cart.id,
                    userName: user.user.username,
                    cartContents: cartData ? cartData : [bookID]
                }
                //console.log("cart", cart.cart.cartContent)
                dispatch(cartEdit(data, history, false))

            }

    }

    const decrement = (count, bookID) => {
        if ((count - 1) === 1) {
            let disable = { ...decrementDisable, [bookID]: true }
            setDecrementDisable(disable);
        }
        console.log("Decrementing")
        const cartData = cart.cart.cartContents;

        if (cartData) {
            cartData.sort().reverse();
            for (let i = 0; i < cartData.length; i++) {
                if (cartData[i] === bookID) {
                    //console.log("FOUND", cartData.splice(i,1))
                    cartData.splice(i, 1)
                    break;
                }
            }
            console.log("CART DETECTED", cartData)
            const data = {
                id: cart.cart.id,
                userName: user.user.username,
                cartContents: cartData ? cartData : [bookID]
            }
            //console.log("cart", cart.cart.cartContent)
            dispatch(cartEdit(data, history, false))
        }

    }
    useEffect(() => {
        console.log(totalPrice)
    }, [totalPrice])
    useEffect(() => {
        console.log("disable", bookList)
    }, [bookList])
    const { Title, Text } = Typography

    return (
        <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col xs={18} style={{ backgroundColor: "white", padding: "1rem" }}>
                <Row>
                    <Title variant="h1">Shopping Cart</Title>
                </Row>
                <Row>
                    {props.location.state?.book ?
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
                                    key={book.id}
                                    extra={
                                        //top is book cover, bottom is default image       
                                        <img src={book.cover} alt={book.cover} style={{
                                            height: "inherit",
                                            objectFit: "scale-down"
                                        }} />
                                    }
                                >
                                    <List.Item.Meta

                                        title={<>
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
                                    <b>Total Books: </b> {cart?.cart?.books?.length}
                                </div>
                            }
                            renderItem={book => (


                                <List.Item
                                    style={{ height: "250px" }}
                                    key={book[0].id}
                                    extra={
                                        //top is book cover, bottom is default image       
                                        <img src={book[0].cover} alt={book[0].cover} style={{
                                            height: "inherit",
                                            objectFit: "scale-down"
                                        }} />
                                    }
                                    actions={[
                                        <Space><Button disabled={decrementDisable ? decrementDisable[book[0].id] : true} onClick={() => { decrement(book.length, book[0].id) }}>-</Button></Space>,
                                        <Space>{book.length}</Space>,
                                        <Space><Button onClick={() => { increment(book.length, book[0].id) }}>+</Button></Space>,
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
                            state: { cart: (props.location.state?.book) ? [props.location.state?.book.id] : cart.cart?.cartContents, totalPrice: totalPrice }
                        }}>
                        <Button>Proceed to Checkout</Button>
                    </Link>
                </Row>
            </Col>
        </Row>
    )
}

export default ShoppingCart
