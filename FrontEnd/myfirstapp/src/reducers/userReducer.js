import { USER_EDIT, INCREMENT, GET_ACCOUNTS, GET_PENDING_SELLERS, USER_LOADING, USER_EDIT_LOADING } from "../actions/types";

const initialState = {
  pendingSellers: [],
  userAccounts: [],
  value: 0,
  loading: false,
  editLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true }
    case USER_EDIT_LOADING:
      return { ...state, editLoading: true }
    case USER_EDIT:
      return { ...state, editLoading: false }
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