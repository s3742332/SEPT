import { Button, Card, Row, Col, Modal } from 'antd';
import BookContainer from '../Marketplace/BookContainer';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOwnedBooks } from '../../actions/transactionActions';
import { sellUsed } from '../../actions/bookActions';


export default function Inventory() {
    const [modal, setModal] = useState(false);
    const [books, setBooks] = useState([])
    const [selectedBookTitle, setSelectedBookTitle] = useState('')
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch();
    const user = useSelector(state => state.security);
    const transaction = useSelector(state => state.transaction);
    const security = useSelector(state => state.security);

    const handleModal = (bookTitle) => {
        setModal(!modal);
        setSelectedBookTitle(bookTitle)
    }

    useEffect(() => {
        dispatch(getUserOwnedBooks(user.user.username))
    }, [dispatch, user])
    useEffect(() => {
        console.log(transaction)
        setBooks(transaction.userBooks)
    }, [transaction])

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const sellBook = (title) => {
        console.log(security.user.fullName)
        let book = {
            seller: security.user.fullName,
            bookCost: price,
            stockLevel: 1,
            bookTitle: title
        }

        dispatch(sellUsed(book));
        handleModal(title);
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
                                <Button onClick={() => handleModal(books[i].bookTitle)} type="primary" shape="round"
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
                onOk={() => sellBook(selectedBookTitle)}
                onCancel={handleModal}
                okText="Okay"
                cancelText="Cancel"
            >
                <h4>Are you sure you want to sell your book?</h4>
                <p>Enter sale amount</p>
                $ <input type='number' onChange={handlePrice}></input>

            </Modal>
        </div>
    );
}