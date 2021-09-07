//import './styles.css';
import React from 'react';
import img from "./BookImages/DefaultCover.png";
import { Button, Card } from 'antd';


export default function BookDetails(props) {
    return (
        <Card>
            <div style={{ display: 'flex', padding:"1%" }}>
                <img src={img} alt="book cover" style={{
                    width: '50%',
                    height: '80vh'
                }} />
                <div style={{ padding: '5%' }}>
                    <h1>Book Title</h1>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
                    <br /><br />
                    <h3>Stock Level: 4</h3>
                    <Button type="primary" shape="round" style={{width:'20%'}} href='/payment'>Purchase</Button>
                </div>
            </div>
        </Card>
    );
}