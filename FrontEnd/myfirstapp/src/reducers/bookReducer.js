import { INCREMENT, GET_BOOK_LIST } from "../actions/types";

const initialState = {
  bookList: [],
  value: 0,
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_LIST:
      return { ...state, bookList: action.payload, loading: false }
    case INCREMENT:
      return { ...state, value: state.value + action.payload, loading: false }
    default:
      return state;
  }
}