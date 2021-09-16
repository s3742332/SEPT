import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Button, Typography, Card } from 'antd'
import { Link } from 'react-router-dom'
function BookDetails(props) {
    const [bookData, setBookData] = useState([])
    useEffect(() => {
        setBookData(props.location.state.book)
        console.log(props.location.state.book)
    }, [props])
    const { Title } = Typography;
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
                            pathname: "/checkout",
                            state: { cart: [bookData] }
                        }}><Button type="primary" shape="round" style={{ width: '20%' }}>Buy Now</Button></Link>
                </div>
            </div>
        </Card>
    )
}

export default BookDetails
