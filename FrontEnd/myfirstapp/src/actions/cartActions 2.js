import axios from "axios";
import { GET_ERRORS, UPDATE_CART, GET_CART } from "./types";

export const cartEdit = (cart, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8081/api/shoppingcarts/saveShoppingCart`, cart, config );
        dispatch({
            type: UPDATE_CART,
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

export const getUserCart = (username, history, devTool) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        
        console.log("HERE")
        const res = await axios.get(`http://localhost:8081/api/shoppingcarts/getUserCart/${username}`,config)
        console.log(res.data)
        dispatch({
            type: GET_CART,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }
};


