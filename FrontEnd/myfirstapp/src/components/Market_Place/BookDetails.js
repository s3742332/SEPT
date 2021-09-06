//import './styles.css';
import React from 'react';
import img from "./BookImages/DefaultCover.png";
import { Card } from 'antd';


export default function BookDetails(props) {
    return (
        <Card>
            <div style={{ display: 'flex' }}>
                <img src={img} alt="book cover" style={{
                    width: '50%',
                    height: '80vh'
                }} />
                <div style={{ padding: '5%' }}>
                    <h1>Book Title</h1>
                    
                </div>
            </div>
        </Card>
    );
}