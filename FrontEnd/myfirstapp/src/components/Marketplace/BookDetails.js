import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Button, Typography, Card } from 'antd'

import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartEdit, getUserCart } from '../../actions/cartActions';
import { getUser } from '../../actions/securityActions';

function BookDetails(props) {
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState([])
    useEffect(() => {
        setBookData(props.location.state.book)
        console.log(props.location.state.book)
    }, [props])
    const user = useSelector(state => state.security);
    const cart = useSelector(state => state.cart);
    const { Title } = Typography;
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    const history = useHistory();
    useEffect(() => {
        if(user.user.username) {
            dispatch(getUserCart(user.user.username, history, false))
            console.log("123")
        }

    }, [user])
    useEffect(() => {
        console.log(cart)
    }, [cart])
    const addToCart = () => {
        const data = {
            userName: user.user.username,
            cartContents: props.location.state.book.id
        }
        dispatch(cartEdit(data, history, false))
    }
    return (
        <Card>
            <div style={{ display: 'flex', padding: "1%" }}>
                <img src={bookData.cover} alt="book cover" style={{
                    width: '50%',
                    height: '80vh'
                }} />
                <div style={{ padding: '5%' }}>
                    <h1>{bookData.bookTitle}</h1>
                    <h4>{bookData.bookDescription}</h4>
                    <br /><br />
                    <h3>Stock Level: {bookData.stockLevel}</h3>
                    <h3>Price: {bookData.bookCost}</h3>
                    <Link
                        to={{
                            pathname: "/shoppingcart",
                            state: { cart: [bookData] }
                        }}><Button type="primary" shape="round">Buy Now</Button></Link>
                        <Button type="primary" shape="round" onClick={addToCart}>Add to Cart</Button>
                </div>
            </div>
        </Card>
    )
}

export default BookDetails
