import axios from "axios";

export const USER_BASE_URL = "http://localhost:8080"
export const BOOK_BASE_URL = "http://localhost:8082"

// userAction Test Utils

// export const editApprovedProfile = async () => {
//     try {
//         return await axios.post('${BASE_URL}/api/users/updateApproved/', user, config);
//     } catch (e) {
//         return [];
//     }
// }

export const fetchPendingSellers = async () => {
    try {
        return await axios.get('${USER_BASE_URL}/api/users/getAllPendingBusiness/');
    } catch (e) {
        return [];
    }
};

export const fetchApprovedUsers = async () => {
    try {
        return await axios.get('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
    } catch (e) {
        return [];
    }
};

//TODO increment test

//============================================================================================

// bookAction Test Utils

export const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

//TODO bookEdit test
export const fetchBookEdit = async () => {
    try {
        return await axios.post('${BOOK_BASE_URL}/api/books/saveBook', book, config);
    } catch (e) {
        return [];
    }
};

export const fetchBookList = async () => {
    try {
        return await axios.get('${BOOK_BASE_URL}/api/books/getAllApprovedBooks', config);
    } catch (e) {
        return [];
    }
};

export const fetchPendingBookList = async () => {
    try {
        return await axios.get('${BOOK_BASE_URL}/api/books/getAllPendingBooks', config);
    } catch (e) {
        return [];
    }
};

//============================================================================================

// personAction Test Utils




