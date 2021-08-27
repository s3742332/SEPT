import { Grid } from '@material-ui/core';
import React from 'react';
import './styles.css';

const Marketplace = (props) => {
    return ( <div>
        <Grid container 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}>

            <Grid item sm={6} md={4} xs={12}><h1>Hello world</h1></Grid>
            <Grid item sm={6} md={4} xs={12}><h1>Hello world</h1></Grid>
            <Grid item sm={6} md={4} xs={12}><h1>Hello world</h1></Grid>
        </Grid>
    </div> );
}
 
export default Marketplace;