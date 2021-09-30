import { UPDATE_REVIEW, GET_REVIEW, } from "../actions/types";

const initialState = {
  review: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_REVIEW:
      return { ...state, loading: false }
    case GET_REVIEW:
      return { ...state, review: action.payload, loading: false }
    default:
      return state;
  }
}