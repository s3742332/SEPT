import personReducer from "../personReducer";
import { GET_PERSONS, GET_PERSON} from "../../actions/types";

const initialState = {
    persons: [],
    person: {}
};

describe('authenticate person reducer', () => {
    test('returns the initial state', () => {
        expect(personReducer(undefined, {})).toEqual(initialState);
    });

    test('handles get persons', () => {
        expect(personReducer(initialState, { type: GET_PERSONS })).toEqual({
            ...initialState,
            persons: GET_PERSONS.payload,
        });
    });

    test('handles get person', () => {
        expect(personReducer(initialState, { type: GET_PERSON })).toEqual({
            ...initialState,
            person: GET_PERSON.payload,
        });
    });
});