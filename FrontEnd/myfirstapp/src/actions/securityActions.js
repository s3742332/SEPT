import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER,SET_CURRENT_USER_DETAILS, GET_CURRENT_USER_DETAILS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history, devTool) => async dispatch => {


    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post("http://localhost:8080/api/users/register", newUser, config)
        if (res.status === 201 && !devTool) {
            history.push('/login')
        }
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err?.response?.data
        });



    }

};

export const login = (LoginRequest, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        // post => Login Request
        const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest, config)
        // extract token from res.data
        const { token } = res.data;
        console.log(token)
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJWTToken(token);
        // decode token on React
        const decoded = jwt_decode(token);
        // dispatch to our securityReducer
        console.log("DECODED", decoded)
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
            history.push("/");        
    } catch (err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err?.response?.data
        });
    }
};

export const fetchUserDetails = (username) => async dispatch => {


    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.get(`http://localhost:8080/api/users/getUser/${username}`, config)
        dispatch({
            type: SET_CURRENT_USER_DETAILS,
            payload: res.data[0]
        });
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err?.response?.data
        });
    }
};
export const getUserDetails = () => dispatch => {
    dispatch({
        type: GET_CURRENT_USER_DETAILS,
        payload: {}
    });
};

export const setUser = (decoded) => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
};
export const getUser = () => dispatch => {
    dispatch({
        type: GET_CURRENT_USER,
        payload: {}
    });
};
export const logout = () => dispatch => {
    localStorage.clear()
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
    window.location.href = "/";
};


export const changePassword = (data) => async dispatch => {


    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post(`http://localhost:8080/api/users/changePassword`, data, config)
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err?.response?.data
        });
    }
};