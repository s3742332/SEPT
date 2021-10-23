import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List } from 'antd';
import { getSearchedBook } from '../../actions/bookActions';

const SearchResult = (props) => {
    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(getSearchedBook(props.search))
    }, [dispatch, props.search])
    useEffect(() => {
        setFilteredData(book.searchedBooks)
    }, [book, filteredData])

    return (
        <div
            style={{ width: '65%' }}
            className='search-results'
        >
            <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 4,
                }}
                dataSource={filteredData}
                footer={
                    <div>
                        <b>Total Books: </b> {filteredData.length}
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
                                    <img src={book.cover} style={{ width: '20%' }} />
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
        </div>
    );
}

export default SearchResult;