import { USER_EDIT, GET_USERS} from "../actions/types";

const initialState = {
    pendingUsers: [],
    loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_EDIT:
      return {...state, pendingUsers: action.payload}
    case GET_USERS:
        return{...state, pendingUsers: action.payload, loading: false}
    default:
      return state;
  }
}