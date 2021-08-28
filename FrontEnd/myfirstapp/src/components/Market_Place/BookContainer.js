//import './styles.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import img from "./BookImages/DefaultCover.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  media: {
    height: 140,
    //max-width: 25%,
    //maxWidth: 25%
    
  },
});

export default function BookContainer() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          
          image= {img}
          title="Default book cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Book1
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Book text
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary">
          Book details
        </Button>
      </CardActions>
    </Card>
  );
}
 
//export default BookContainer;