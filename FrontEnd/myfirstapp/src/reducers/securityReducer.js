import { SET_CURRENT_USER, GET_CURRENT_USER, SET_CURRENT_USER_DETAILS, GET_CURRENT_USER_DETAILS } from "../actions/types";

const initialState = {
  validToken: false,
  user: {},
  userDetails: {}
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };
    case SET_CURRENT_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      };
    case GET_CURRENT_USER_DETAILS:
      return {
        ...state,
        userDetails: state.userDetails
      };
    case GET_CURRENT_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
}