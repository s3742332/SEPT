import { ItalicOutlined } from "@ant-design/icons";
import ActionButton from "antd/lib/modal/ActionButton";
import userReducer from "../userReducer";
import { USER_EDIT, INCREMENT, GET_ACCOUNTS, GET_PENDING_SELLERS } from "../../actions/types";

const initialState = {
    pendingSellers: [],
    userAccounts: [],
    value: 0,
    loading: true
};

describe('authenticate user reducer', () => {
    test('returns the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    test('handles user edit', () => {
        expect(userReducer(initialState, { type: USER_EDIT })).toEqual({
            ...initialState,
            pendingUsers: USER_EDIT.payload,
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