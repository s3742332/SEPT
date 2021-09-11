import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPendingBookList } from '../../../actions/bookActions';
import PendingBookList from './PendingBookList';
import PendingBookDetails from './PendingBookDetails'
import { Input, Typography, Breadcrumb } from 'antd';
function PendingBook() {

    const [selectedBook, setSelectedBook] = useState([])
    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("")
    const [clear, setClear] = useState("")
    useEffect(() => {
        dispatch(getPendingBookList())
    }, [dispatch])
    useEffect(() => {
        setFilteredData(book.pendingBookList)
    }, [book])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setFilteredData(book.bookList.filter(data => data.title.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    useEffect(() => {
        search.length != 0 ? setClear("visible") : setClear("hidden")
    }, [search])
    const handleClear = () => {
        setSearch("")
        setFilteredData(book.bookList)
    }
    const { Title } = Typography;
    return (
        <Row>
            <Col xs={4}>
                <Input
                    type="text"
                    onChange={handleSearch}
                    value={search}></Input>
                <PendingBookList list={book} filteredList={filteredData} setSelectedBook={setSelectedBook} />
            </Col>
            <Col xs={20} style={{ padding: "1rem" }}>
                <Title level={2} style={{textAlign: "center"}}>Book Information</Title>
                <PendingBookDetails data={selectedBook} />
            </Col>
        </Row>
    )
}


export default PendingBook;