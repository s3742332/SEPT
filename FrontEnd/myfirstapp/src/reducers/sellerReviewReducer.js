import { SAVE_SELLER_REVIEW, SELLER_REVIEWS } from "../actions/types";

const initialState = {
  reviews: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_SELLER_REVIEW:
      return { ...state, loading: false }
    case SELLER_REVIEWS:
      return { ...state, reviews: action.payload, loading: false }
    default:
      return state;
  }
}