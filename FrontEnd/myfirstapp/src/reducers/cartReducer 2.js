import { UPDATE_CART, GET_CART, } from "../actions/types";

const initialState = {
  cart: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return { ...state, loading: false }
    case GET_CART:
      return { ...state, cart: action.payload, loading: false }
    default:
      return state;
  }
}