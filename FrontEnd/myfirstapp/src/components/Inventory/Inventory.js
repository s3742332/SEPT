import { Button, Card, Input, Row, Col, Modal } from 'antd';
import { Link } from 'react-router-dom';
import BookContainer from '../Marketplace/BookContainer';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOwnedBooks } from '../../actions/transactionActions';
import { sellUsed } from '../../actions/bookActions';


export default function Inventory(props) {
    const [modal, setModal] = useState(false);
    const [books, setBooks] = useState([])
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const transaction = useSelector(state => state.transaction);

    const handleModal = (event) => {
        event.preventDefault();
        setModal(!modal);
    }

    useEffect(() => {
        // console.log(user)
        dispatch(getUserOwnedBooks(user.user.username))
    }, [dispatch, user])
    useEffect(() => {
        console.log(transaction)
        setBooks(transaction.userBooks)
    }, [transaction])

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const sellBook = () => {
        let book = {
            seller: user.fullName,
            bookCost: price,
            stockLevel: 1,
            bookTitle: "TEST"
        }

        sellUsed(book);
    }

    const showBooks = () => {
        const data = [];
        for (let i = 0; i < books.length; i++) {
            data.push(
                    <Col sm={12} md={6} xs={24}>
                        <div>
                            <BookContainer
                                image={books[i].cover}
                                title={books[i].bookTitle}
                                author={books[i].author}
                            />
                            <div style={{ display: 'flex' }}>
                                <Button type="primary" href='/details' shape="round" style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Details</Button>
                                <Button onClick={handleModal} type="primary" shape="round"
                                    style={{ width: '30%', margin: '2%', marginTop: '4%' }}>Sell</Button>
                            </div>
                        </div>
                    </Col>
            )
        }
        return data
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Your Inventory</h1>
            <Card>
                <Row>
                    {showBooks()}
                </Row>
            </Card>

            <Modal
                title="Modal"
                visible={modal}
                onOk={sellBook}
                onCancel={handleModal}
                okText="Okay"
                cancelText="Cancel"
            >
                <h4>Are you sure you want to sell your book?</h4>
                <p>Enter sale amount</p>
                $ <input type='number' onChange={{handlePrice}}></input>

            </Modal>
        </div>
    );
}