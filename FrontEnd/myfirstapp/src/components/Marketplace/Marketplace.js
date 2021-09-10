// import BookContainer from './BookContainer';
import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Col, Row, Menu, Breadcrumb, List, Avatar, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { getBookList } from '../../actions/bookActions';
import Categories from '../Search/Categories';

const Marketplace = (props) => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(getBookList())
    }, [dispatch])
    useEffect(() => {
        setFilteredData(book.bookList)
    }, [book])

    return (<div>
        <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Book Catalogue</h1>
        <h3 style={{ textAlign: 'center', paddingTop: '25px' }}>Search by name, author, ISBN or select a genre </h3>
        <Input label="Search field" paddingBottom={10} margin="auto" type="search" variant="outlined" />
        <Categories/>
        {/* <Row>
            <Col sm={12} md={6} xs={24}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={filteredData}
                    footer={
                        <div>
                            <b>Total Books: </b> {filteredData.length} 
                        </div>
                    }
                    renderItem={book => (
                        <List.Item
                            key={book.Id}
                            extra={ //TODO change me
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            } 
                            actions={[
                                // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            
                        >
                            <List.Item.Meta
                                title={book.bookTitle}
                                description={book.author}
                            />
                            {book.bookDescription}
                        </List.Item>
                    )}
                />
            </Col>
        </Row> */}













        {/* <Row>
            <Col sm={12} md={6} xs={24}>
                <Link to="/details">
                    <BookContainer
                        image="./BookImages/DefaultCover.png"
                        title="put title"
                        author="put author"
                        price="put price"
                    />
                </Link>
            </Col>
            <Col sm={12} md={6} xs={24}>
                <BookContainer />
            </Col>
            <Col sm={12} md={6} xs={24}>
                <BookContainer />
            </Col>
            <Col sm={12} md={6} xs={24}>
                <BookContainer />
            </Col>
        </Row> */}
    </div>
    );
}

export default Marketplace;