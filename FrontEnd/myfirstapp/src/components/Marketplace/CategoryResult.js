// import BookContainer from './BookContainer';
import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Col, Row, Menu, Breadcrumb, List, Avatar, Input, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { getCategory } from '../../actions/bookActions';

const CategoryResult = (props) => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        console.log(props.location.category)
        dispatch(getCategory(props.location.category))
    }, [dispatch, props.category])
    useEffect(() => {
        setFilteredData(book.searchedBooks)
    }, [book, filteredData])

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

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
                            state: {book: book}
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
        </div>
    );
}

export default CategoryResult;