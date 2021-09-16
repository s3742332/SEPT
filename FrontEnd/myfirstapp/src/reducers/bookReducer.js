import { GET_PENDING_BOOK_LIST, GET_BOOK_LIST, GET_SEARCHED_BOOKS, BOOK_LOADING, BOOK_EDIT_LOADING, UPDATE_BOOK } from "../actions/types";

const initialState = {
  bookList: [],
  pendingBookList: [],
  searchedBooks: [],
  loading: false,
  editLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BOOK_LOADING:
      return { ...state, loading: true }
    case BOOK_EDIT_LOADING:
      return { ...state, editLoading: true }
    case UPDATE_BOOK:
        return { ...state, editLoading: false }
    case GET_BOOK_LIST:
      return { ...state, bookList: action.payload, loading: false }
    case GET_PENDING_BOOK_LIST:
      return { ...state, pendingBookList: action.payload, loading: false }
    case GET_SEARCHED_BOOKS:
      return { ...state, searchedBooks: action.payload, loading: false }
    default:
      return state;
  }
}