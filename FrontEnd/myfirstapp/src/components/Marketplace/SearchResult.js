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
        console.log('im in useeffect')
    }, [dispatch, props.search])
    useEffect(() => {
        setFilteredData(book.bookList)
        console.log('fd', filteredData)
    }, [book,filteredData])

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
                        extra={ //TODO change me
                            <img
                                style={{width:'20%'}}
                                alt="logo"
                                src="https://assets.teenvogue.com/photos/5cd4384fac4d9e712fe2ebb0/2:3/w_1852,h_2778,c_limit/The%20Gravity%20of%20Us_.jpg"
                            />
                        }
                    >
                        <div style={{width:'70%', overflowWrap:'break-word'}}>
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