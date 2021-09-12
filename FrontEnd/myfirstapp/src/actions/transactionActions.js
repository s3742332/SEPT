import axios from "axios";
import { GET_ERRORS, CREATE_TRANSACTION, GET_TRANSACTIONS } from "./types";

export const transactionEdit = (transaction) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8082/api/transactions/saveTransaction`, transaction, config );
        dispatch({
            type: CREATE_TRANSACTION,
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

export const getUserTransaction = (username) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8082/api/transactions/getAllUserTransactions?username=${username}`,config)
        console.log(res.data)
        dispatch({
            type: GET_TRANSACTIONS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};

