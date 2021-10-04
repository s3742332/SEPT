import { UPDATE_REVIEW, GET_REVIEW, GET_ALL_REVIEWS} from "../actions/types";

const initialState = {
  review: [],
  allReviews: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_REVIEW:
      return { ...state, loading: false }
    case GET_REVIEW:
      return { ...state, review: action.payload, loading: false }
    case GET_ALL_REVIEWS:
      return { ...state, allReviews: action.payload, loading: false }
    default:
      return state;
  }
}