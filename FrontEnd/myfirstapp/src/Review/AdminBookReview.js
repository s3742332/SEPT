import { Space, List, Rate, Button, Row, Col } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, removeReview } from '../actions/reviewActions';

function AdminBookReview() {
    const [reviewList, setReviewList] = useState([])
    const dispatch = useDispatch();
    const review = useSelector(state => state.review)
    useEffect(() => {
        dispatch(getAllReviews())

    }, [dispatch])
    useEffect(() => {
        if (!review.loading) {
            setReviewList(review.allReviews)
            console.log(review.allReviews)
        }
    }, [review.loading])

    const removeBookFromReview = (id)=> {
        dispatch(removeReview(id))
    }
    return (
        <Row justify={"center"}>
            <Col xs={24} sm={12}>
                <List
                    itemLayout="horizontal"
                    dataSource={reviewList}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={item => (
                        <List.Item style={{background: "white", padding: "1rem", borderRadius:"1rem", marginBottom:"10px"}}>
                            <List.Item.Meta
                                title={<>
                                    <Space><Button type={"danger"} size={"small"} onClick={() => removeBookFromReview(item.id)}>Remove</Button></Space><br />{item.username}</>}
                                description={<><Rate disabled defaultValue={item.rating} />
                                <br/>
                                {moment(item.createdAt).format("DD-MM-YYYY")}
                                    <br />
                                    {"Book ID: "+item.bookId}
                                    <br />
                                    {item.review}</>}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default AdminBookReview
