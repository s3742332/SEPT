import { SAVE_MESSAGE } from "../actions/types";

const initialState = {
    review: [],
    allReviews: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return { ...state, loading: true }
        default:
            return state;
    }
}