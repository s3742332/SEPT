import { Col, Row, Input } from 'antd';
import React from 'react';
import BookContainer from './BookContainer';
import './styles.css';
import { Link } from 'react-router-dom';

const Marketplace = (props) => {
    return (<div>
        <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Book Catalogue</h1>

        <Input label="Search field" paddingBottom={10} margin="auto" type="search" variant="outlined" fullWidth />
        <Row>
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
        </Row>
        {/* <Box p={5} b={5}>
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"

                spacing={5}>

                <Grid item sm={6} md={3} xs={12} spacing={4}></Grid>
                <Grid item sm={6} md={3} xs={12} spacing={4}><BookContainer /></Grid>
                <Grid item sm={6} md={3} xs={12} spacing={4}><BookContainer /></Grid>
                <Grid item sm={6} md={3} xs={12} spacing={4}><BookContainer /></Grid>


            </Grid>
        </Box> */}
    </div>);
}

export default Marketplace;