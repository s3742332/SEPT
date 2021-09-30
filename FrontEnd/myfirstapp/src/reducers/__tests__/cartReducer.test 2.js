import cartReducer from "../cartReducer";
import { UPDATE_CART, GET_CART } from "../../actions/types";

const initialState = {
    cart: [],
    loading: false,
};

describe('authenticate cart reducer', () => {
    test('returns the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    test('handles update cart', () => {
        expect(cartReducer(initialState, { type: UPDATE_CART })).toEqual({
            ...initialState,
            loading: false
        });
    });

    test('handles get cart', () => {
        expect(cartReducer(initialState, { type: GET_CART })).toEqual({
            ...initialState,
            cart: GET_CART.payload,
            loading: false
        });
    });
});