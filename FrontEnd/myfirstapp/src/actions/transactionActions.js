import axios from "axios";
import { GET_ERRORS, CREATE_TRANSACTION, GET_TRANSACTIONS,GET_SELLER_TRANSACTIONS, GET_USER_BOOKS, GET_ALL_TRANSACTIONS, TRANSACTION_LOADING } from "./types";

export const transactionEdit = (transaction, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/transactions/saveTransaction`, transaction, config );
        if(res.status === 201 && !devTool) {
            history.push('/confirmation')
        }
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

export const getUserTransaction = (username, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        console.log(username)
        const res = await axios.get(`http://localhost:8081/api/transactions/getAllUserTransactions/${username}`,config)
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

export const getAllTransactions = () => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const res = await axios.get(`http://localhost:8081/api/transactions/getAllTransactions/`,config)
        console.log(res.data)
        dispatch({
            type: GET_ALL_TRANSACTIONS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
export const getSellerTransaction = (username) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        console.log(username)
        const res = await axios.get(`http://localhost:8081/api/transactions/getSellerTransactions/${username}`,config)
        console.log(res.data)
        dispatch({
            type: GET_SELLER_TRANSACTIONS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};
export const getUserOwnedBooks = (username) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8081/api/transactions/getUserOwnedBooks/${username}`,config)
        dispatch({
            type: GET_USER_BOOKS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};

export const cancelOrder = (id,user) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        dispatch({ type: TRANSACTION_LOADING })
        const res = await axios.post(`http://localhost:8081/api/transactions/cancelTransaction`,id,config)
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        });
        dispatch(getUserTransaction(user))
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};