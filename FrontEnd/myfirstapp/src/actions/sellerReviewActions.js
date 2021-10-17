import axios from "axios";
import { GET_ERRORS, SAVE_SELLER_REVIEW } from "./types";

export const sellerReviewSave = (review) => async dispatch => {
    console.log("INSIDE ACTIONS")
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/sellerreviews/saveSellerReview`, review, config );
        dispatch({
            type: SAVE_SELLER_REVIEW,
            payload: res.data
        })
        
    } catch (err) {
        console.log('error', err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};