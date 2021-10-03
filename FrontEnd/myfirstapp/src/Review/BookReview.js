import React, { useEffect, useState } from 'react'
import { Button, List, Modal, Input, Rate, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, reviewEdit } from '../actions/reviewActions';
import { useHistory } from 'react-router';

function BookReview(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const review = useSelector(state => state.review);
    const [reviewList, setReviewList] = useState([]);
    const security = useSelector(state => state.security)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newReview, setNewReview] = useState({})
    const { TextArea } = Input;
    const {Title} = Typography;
    useEffect(() => {
        if (props.bookID) {
            dispatch(getReview(props.bookID, history, false))
        }

    }, [props.bookID])

    useEffect(() => {
        setReviewList(review.review)
    }, [review])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        dispatch(reviewEdit(newReview, history, false))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        security.user.fullName &&
            setNewReview({ ...newReview, ["username"]: security.user.fullName, ["bookId"]: props.bookID })

    }, [security.user?.fullName, props.bookID])
    useEffect(() => {
        console.log("rewview", newReview)
    }, [newReview])
    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Title level={2}>Reviews</Title>
                <Button type="primary" shape="round" onClick={showModal}>
                    Leave Review
                </Button>
            </div>

            <Modal title="Leave a review" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={"Submit"}>
                <Rate defaultValue={3} onChange={(e) => setNewReview({ ...newReview, ["rating"]: e.valueOf() })} />
                <TextArea onChange={(e) => setNewReview({ ...newReview, ["review"]: e.target.value })} />
            </Modal>

            <List
                itemLayout="horizontal"
                dataSource={reviewList}
                pagination={{
                    pageSize: 4,
                }}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.username}
                            description={<><Rate disabled defaultValue={item.rating} /><br />{item.review}</>}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default BookReview
