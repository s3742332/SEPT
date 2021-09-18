import axios from "axios";

export const USER_BASE_URL = "http://localhost:8080"
export const BOOK_BASE_URL = "http://localhost:8082"
export const TSCN_BASE_URL = "http://localhost:8081"

export const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

// userAction Test Utils

export const fetchUserEdit = async () => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const user = { id: 1, name: "User 1"}

        return await axios.post('${USER_BASE_URL}/api/users/updateApproved/', user, config);
    } catch (e) {
        return [];
    }
}

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

export const fetchBookEdit = async () => {
    try {
        const book = {id: 1, name: "Book 1"}
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

export const fetchCategory = async () => {
    try {
        const category = 'Dystopian';
        return await axios.get(`http://localhost:8082/api/books/getBooksInCategory/${category.category}`, config);
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

export const fetchSearchedBook = async () => {
    try {
        const query = "asdf";
        const response = await axios.get(`http://localhost:8082/api/books/getSearchedBooks/${query}`, config);
        return response;
    } catch (e) {
        return [];
    }
}

//============================================================================================

// transactionAction Test Utils

export const fetchTransactionEdit = async () => {
    try {
        const transaction = { id: 1, userName: "Transaction 1"};
        return await axios.post('${TSCN_BASE_URL}/api/transactions/saveTransaction', transaction, config)
    } catch (e) {
        return [];
    }
};

export const fetchUserTransaction = async () => {
    try {
        const username = "user@user.com";
        return await axios.get(`${TSCN_BASE_URL}/api/transactions/getAllUserTransactions/${username}`,config);
    } catch (e) {
        return [];
    }
};

//============================================================================================

// securityAction Test Utils

export const fetchCreateNewUser = async () => {
    try {
        const newUser = { id: 1, name: "New User"};
        return await axios.post("${USER_BASE_URL}/api/users/register", newUser, config);
    } catch (e) {
        return [];
    }
}





