import axios from "axios";
import { GET_UNAPPROVED_USERS, GET_ACCOUNTS, GET_ERRORS, INCREMENT, USER_EDIT, USER_EDIT_LOADING, USER_LOADING } from "./types";

export const userEdit = (user) => async dispatch => {
    
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({type: USER_EDIT_LOADING})
        // let params = { id: user.id, approved: user.approved };
        const res = await axios.post(`${process.env.REACT_APP_LOGIN_URL}/api/users/updateApproved/`, user, config );
        dispatch({
            type: USER_EDIT,
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

export const getUnapprovedList = () => async dispatch => {
    
    try { 
        dispatch({type: USER_LOADING})
        const res = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/api/users/getAllUnapprovedUsers`)
        dispatch({
            type: GET_UNAPPROVED_USERS  ,
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
        dispatch({type: USER_LOADING})
        const res = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/api/users/getAllApprovedUsers`)
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

export const blockUser = (user) => async dispatch => {
    
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({type: USER_EDIT_LOADING})
        const res = await axios.post(`${process.env.REACT_APP_LOGIN_URL}/api/users/blockUser`, user, config)
        dispatch({
            type: USER_EDIT,
            payload: res.data
        });
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