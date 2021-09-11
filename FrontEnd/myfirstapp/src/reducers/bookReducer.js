import { GET_PENDING_BOOK_LIST, GET_BOOK_LIST } from "../actions/types";

const initialState = {
  bookList: [],
  pendingBookList: [],
  loading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_LIST:
      return { ...state, bookList: action.payload, loading: false }
    case GET_PENDING_BOOK_LIST:
      return { ...state, pendingBookList: action.payload, loading: false }
    default:
      return state;
  }
}