import axios from "axios";
import { GET_PENDING_SELLERS, GET_ACCOUNTS, GET_ERRORS, INCREMENT, UPDATE_APPROVED } from "./types";

export const userEdit = (user) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        console.log("UserInfoAction", user)
        // let params = { id: user.id, approved: user.approved };
        const res = await axios.post(`http://localhost:8080/api/users/updateApproved/${user.id}`, config );
        dispatch({
            type: UPDATE_APPROVED,
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

export const getPendingSellerList = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/api/users/getAllPendingBusiness`)
        dispatch({
            type: GET_PENDING_SELLERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getUserAccountsList = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/api/users/getAllUsers`)
        dispatch({
            type: GET_ACCOUNTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
export const increment = () => dispatch => {
    try {
        dispatch({
            type: INCREMENT,
            payload: 1,
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};