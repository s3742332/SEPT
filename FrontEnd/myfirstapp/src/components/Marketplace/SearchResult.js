// import BookContainer from './BookContainer';
import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Col, Row, Menu, Breadcrumb, List, Avatar, Input, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
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
                    <div className='search-result'>
                        <List.Item
                            key={book.Id}
                            extra={ 
                                //top is book cover, bottom is default image
                                <object data={book.cover} style={{width:'20%'}}>
                                    <img src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg" />
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
                )}
            />
        </div>
    );
}

export default SearchResult;