import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {


    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const res = await axios.post("http://localhost:8080/api/users/register", newUser, config).then((response)=> {
            if (res.status === 201) {
                history.push('/login')
            }
            if(res.status === 400) {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data,
                });
            }
    });

    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });



    }

};

// export const login = LoginRequest => async dispatch => {
//     try{
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "*"
//               }
//         }
//         await axios.post("http://localhost:8080/api/users/login", LoginRequest, config);

//         dispatch({
//             type: GET_ERRORS,
//             payload: {}
//         });
//     }
//     catch (err){
//         dispatch ({
//             type: GET_ERRORS,
//             payload: err.response.data
//         });



//     }
// try {

//     //post => login request

//     //extract token from res.data

//     //set our token in the local storage

//     // set our token in header 

//     //decode the token on React

//     // dispatch to our securityReducer

// }
// catch (err)
// {

// }

//}
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
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};