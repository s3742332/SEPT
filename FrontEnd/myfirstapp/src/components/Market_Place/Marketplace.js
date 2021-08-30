import { Box, Grid, TextField } from '@material-ui/core';
import React from 'react';
import BookContainer from './BookContainer';
import './styles.css';

const Marketplace = (props) => {
    return ( <div>
    <h1 style={{  textAlign:'center', paddingTop: '25px'}}>Book Catalogue</h1>
    
    <TextField  label="Search field" paddingBottom= {10} margin= "auto" type="search" variant="outlined" fullWidth  />
    <Box p={5} b= {5}> 
        <Grid container 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        
        spacing={5}>
            
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer 
                image= "./BookImages/DefaultCover.png"
                title= "put title"
                author= "put author"
                price= "put price"
            /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            <Grid item sm={6} md={3} xs={12} spacing ={4}><BookContainer /></Grid>
            
            
        </Grid>
        </Box>    
    </div> );
}
 
export default Marketplace;