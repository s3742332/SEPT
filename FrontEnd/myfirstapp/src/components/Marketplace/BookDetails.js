import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Button, Typography, Card, Alert } from 'antd'

import { Link, useHistory,Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cartEdit, getUserCart } from '../../actions/cartActions';
import { getUser } from '../../actions/securityActions';
import BookReview from '../../Review/BookReview';
import { shareBook } from '../../actions/bookActions';

function BookDetails(props) {
    const dispatch = useDispatch();
    const [bookData, setBookData] = useState([])
    const user = useSelector(state => state.security);
    const cart = useSelector(state => state.cart);
    const [cartStatus, setCartStatus] = useState("Add to cart")
    const [cartDisable, setButtonDisable] = useState(false)
    const [shared, setShared] = useState(false)
    const { Title } = Typography;
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    const history = useHistory();
    useEffect(() => {
        if (user.user.username) {
            dispatch(getUserCart(user.user.username, history, false))
        }

    }, [user])
    useEffect(() => {
        setBookData(props?.location?.state?.book)
        console.log("BOOK SELECTED", props?.location?.state?.book)
    }, [props?.location?.state?.book])
    useEffect(() => {
        console.log("CART DETECTED", cart.cart.cartContents)
    }, [cart])
    const addToCart = () => {
        setCartStatus("Added!")
        setButtonDisable(true)
        setTimeout(() => {
            setCartStatus("Add to cart")
            setButtonDisable(false);
        }, 2000);
        const cartData = cart.cart.cartContents;

        if (cartData) {

            cartData.push(props.location.state.book.id)
            console.log("CART DETECTED", cartData)
        }
        const data = {
            id: cart.cart.id,
            userName: user.user.username,
            cartContents: cartData ? cartData : [props.location.state.book.id]
        }
        //console.log("cart", cart.cart.cartContent)
        dispatch(cartEdit(data, history, false))
    }

    const share = () => {
        let book = {
            "seller": bookData.seller,
            "bookTitle": bookData.bookTitle,
            "author": bookData.author,
            "bookDescription": bookData.bookDescription,
            "bookCost": bookData.bookCost
        }
        dispatch(shareBook(book));
        setShared(true)
    }

    return (
    (props?.location?.state?.book ? 
        <Card>
            {!shared ? '' :
                <Alert message="Book Exported" type="success" />
            }
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
                            state: { book: bookData }
                        }}><Button type="primary" shape="round" style={{ marginRight: 10 }}>Buy Now</Button></Link>
                    <Button type="primary" style={{ marginRight: 10 }} disabled={cartDisable} shape="round" onClick={addToCart}>{cartStatus}</Button>
                    <Button type="primary" shape="round" onClick={share}>Share</Button>
                    <BookReview bookID={bookData.id} />
                </div>
            </div>
        </Card>: <Redirect to="/"/>)
        
    )
}

export default BookDetails
