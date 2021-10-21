import React from 'react';
import { Card } from 'antd';


export default function BookContainer(props) {
  const {Meta} = Card
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img src={props.image}></img>}
    >
      <Meta title={props.title} description={props.author} />
    </Card>
  );
}