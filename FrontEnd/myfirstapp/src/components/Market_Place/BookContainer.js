//import './styles.css';
import React from 'react';
import img from "./BookImages/DefaultCover.png";
import { Card} from 'antd';


export default function BookContainer(props) {
  const {Meta} = Card
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img src={img}></img>}
    >
      <Meta title={props.title} description={props.author + props.price} />
    </Card>
    // <Card className={classes.root}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}

    //       image= {img}
    //       title="Default book cover"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h6" component="h2">
    //         Title
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         By author
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         Price
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Buy
    //     </Button>
    //     <Button size="small" color="primary">
    //       Book details
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}

//export default BookContainer;