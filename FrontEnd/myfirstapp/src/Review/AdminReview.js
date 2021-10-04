import { Space, List, Rate, Button, Row, Col } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllReviews, removeReview } from '../actions/reviewActions';

function AdminReview() {
    const [reviewList, setReviewList] = useState([])
    const dispatch = useDispatch();
    const review = useSelector(state => state.review)
    useEffect(() => {
        dispatch(getAllReviews())

    }, [dispatch])
    useEffect(() => {
        if (review.getAllReviews) {
            setReviewList(review.getAllReviews)
        }
    }, [review.getAllReviews])

    const removeBookFromReview = (id)=> {
        dispatch(removeReview(id))
    }
    return (
        <Row>
            <Col>
                <List
                    itemLayout="horizontal"
                    dataSource={reviewList}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<>
                                    <Space><Button type={"danger"} size={"small"} onClick={() => removeBookFromReview(item.id)}>Remove</Button></Space><br />{item.username}</>}
                                description={<><Rate disabled defaultValue={item.rating} />
                                    <br />
                                    {item.bookId}
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

export default AdminReview
