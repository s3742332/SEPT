import { SET_CURRENT_USER, GET_CURRENT_USER } from "../actions/types";

const initialState = {
  validToken: false,
  user: {}
};

const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };
      case GET_CURRENT_USER:
        return {
          ...state,
        };
  
    default:
      return state;
  }
}