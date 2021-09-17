import { ItalicOutlined } from "@ant-design/icons";
import ActionButton from "antd/lib/modal/ActionButton";
import userReducer from "../userReducer";
import { USER_EDIT, INCREMENT, GET_ACCOUNTS, GET_PENDING_SELLERS, USER_LOADING, USER_EDIT_LOADING } from "../../actions/types";

const initialState = {
    pendingSellers: [],
    userAccounts: [],
    value: 0,
    loading: false,
    editLoading: false
};

describe('authenticate user reducer', () => {
    test('returns the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    test('handles user loading', () => {
        expect(userReducer(initialState, { type: USER_LOADING })).toEqual({
            ...initialState,
            loading: true,
        });
    });

    test('handles edit loading', () => {
        expect(userReducer(initialState, { type: USER_EDIT_LOADING })).toEqual({
            ...initialState,
            editLoading: true,
        });
    });

    test('handles user edit', () => {
        expect(userReducer(initialState, { type: USER_EDIT })).toEqual({
            ...initialState,
            editLoading: false,
        });
    });

    test('handles get pending sellers', () => {
        expect(userReducer(initialState, { type: GET_PENDING_SELLERS})).toEqual({
            ...initialState,
            pendingSellers: GET_PENDING_SELLERS.payload,
            loading: false,
        });
    });

    test('handles get accounts', () => {
        expect(userReducer(initialState, { type: GET_ACCOUNTS })).toEqual({
            ...initialState,
            userAccounts: GET_ACCOUNTS.payload,
            loading: false,
        });
    });

    test('handles increment', () => {
        expect(userReducer(initialState, { type: INCREMENT })).toEqual({
            ...initialState,
            value: INCREMENT.value + INCREMENT.payload,
            loading: false,
        });
    });
});