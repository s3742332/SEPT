import { GET_MESSAGES, SAVE_MESSAGE } from "../actions/types";

const initialState = {
    loading: false,
    messageList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return { ...state, loading: false }
        case GET_MESSAGES:
            return { ...state, loading: false, messageList: action.payload }
        default:
            return state;
    }
}