import { Box, Grid } from '@material-ui/core';
import React from 'react';
import BookContainer from './BookContainer';
import './styles.css';

const Marketplace = (props) => {
    return ( <div>
    <Box p={5} b= {5}>
        <Grid container 
        //direction="row"
        //justifyContent="space-between"
        //alignItems="center"
        b= {5}
        spacing={5}>
            
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            
        </Grid>
        </Box>    
    </div> );
}
 
export default Marketplace;