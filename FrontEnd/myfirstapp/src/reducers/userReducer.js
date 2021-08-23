import { USER_EDIT, GET_USERS, INCREMENT} from "../actions/types";

const initialState = {
    pendingUsers: [],
    value: 0,
    loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_EDIT:
      return {...state, pendingUsers: action.payload}
    case GET_USERS:
        return{...state, pendingUsers: action.payload, loading: false}
    case INCREMENT:
        return{...state, value: state.value+action.payload, loading: false}
    default:
      return state;
  }
}