import { USER_EDIT, INCREMENT, GET_ACCOUNTS, GET_PENDING_SELLERS } from "../actions/types";

const initialState = {
  pendingSellers: [],
  userAccounts: [],
  value: 0,
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_EDIT:
      return { ...state, pendingUsers: action.payload }
    case GET_PENDING_SELLERS:
      return { ...state, pendingSellers: action.payload, loading: false }
    case GET_ACCOUNTS:
      return { ...state, userAccounts: action.payload, loading: false }
    case INCREMENT:
      return { ...state, value: state.value + action.payload, loading: false }
    default:
      return state;
  }
}