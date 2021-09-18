// import BookContainer from './BookContainer';
import './styles.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Col, Row, Menu, Breadcrumb, List, Avatar, Input } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { getBookList } from '../../actions/bookActions';
import Categories from '../Search/Categories';
import SearchResult from './SearchResult';

const Marketplace = (props) => {

    const dispatch = useDispatch();
    const book = useSelector(state => state.book);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState();

    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    }

    // useEffect(() => {
    //     dispatch(getBookList())
    // }, [dispatch])
    // useEffect(() => {
    //     setFilteredData(book.bookList)
    // }, [book])

    return (<div>
        <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Book Catalogue</h1>
        <h3 style={{ textAlign: 'center', paddingTop: '25px' }}>Search by name, author, ISBN or select a genre </h3>
        <Input 
        label="Search field" paddingBottom={10} margin="auto" type="search" variant="outlined" 
        style={{width: '75%', position: 'relative', left:'50%', transform:'translate(-50%)'}} 
        onChange={handleSearch}
        />
        {
            !search ? <Categories/> : <SearchResult search={search} />
        }
        
    </div>
    );
}

export default Marketplace;