import axios from "axios";
import { GET_PENDING_SELLERS, GET_ACCOUNTS, GET_ERRORS, INCREMENT} from "./types";

export const userEdit = (user) => async dispatch => {
    try {
        console.log("UserInfoAction", user)
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getPendingSellerList = () => async dispatch => {
    try {
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
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
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
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