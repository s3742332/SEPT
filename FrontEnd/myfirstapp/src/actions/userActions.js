import axios from "axios";
import { GET_USERS, GET_ERRORS} from "./types";

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

export const getUserPendingList = () => async dispatch => {
    try {
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};
