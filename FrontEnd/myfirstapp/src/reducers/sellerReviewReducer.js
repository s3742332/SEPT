import { SAVE_SELLER_REVIEW } from "../actions/types";

const initialState = {
  reviews: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_SELLER_REVIEW:
      return { ...state, loading: false }
    // case GET_REVIEWS:
    //   return { ...state, review: action.payload, loading: false }
    default:
      return state;
  }
}