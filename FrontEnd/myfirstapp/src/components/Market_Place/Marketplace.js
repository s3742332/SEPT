import { Grid } from '@material-ui/core';
import React from 'react';
import BookContainer from './BookContainer';
import './styles.css';

const Marketplace = (props) => {
    return ( <div>
        <Grid container 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}>

            <Grid item sm={6} md={4} xs={12}><BookContainer /></Grid>
            <Grid item sm={6} md={4} xs={12}><BookContainer /></Grid>
            <Grid item sm={6} md={4} xs={12}><BookContainer /></Grid>
            
        </Grid>
    </div> );
}
 
export default Marketplace;