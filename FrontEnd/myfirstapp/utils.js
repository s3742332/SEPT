import axios from "axios";

export const USER_BASE_URL = "http://localhost:8080"
export const BOOK_BASE_URL = "http://localhost:8081"
export const TSCN_BASE_URL = "http://localhost:8081"
export const CART_BASE_URL = "http://localhost:8081"

export const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

// userAction Test Utils

export const fetchUserEdit = async () => {
    try {
        const user = { id: 1, name: "User 1"}

        return await axios.post('${USER_BASE_URL}/api/users/updateApproved/', user, config);
    } catch (e) {
        return [];
    }
}

export const fetchUnapprovedList = async () => {
    try {
        return await axios.get('${USER_BASE_URL}/api/users/getAllUnapprovedUsers')
    } catch (e) {
        return [];
    }
}

export const fetchUserAccountsList = async () => {
    try {
        return await axios.get('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
    } catch (e) {
        return [];
    }
};

export const fetchBlockUser = async () => {
    try {
        const user = { id: 1, name: "User 1"}
        return await axios.post('${USER_BASE_URL}/api/users/blockUser', user, config)
    } catch (e) {
        return [];
    }
}

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
        return await axios.get('${BOOK_BASE_URL}/api/books/getBooksInCategory/${category.category}', config);
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
        const response = await axios.get('${BOOK_BASE_URL}/api/books/getSearchedBooks/${query}', config);
        return response;
    } catch (e) {
        return [];
    }
}

export const fetchSellUsed = async () => {
    try {
        const book = {bookName: "asdf", bookDescription: "qwerty"};
        return await axios.post('${BOOK_BASE_URL}/api/books/sellUsedBook/', book, config);
    } catch (e) {
        return [];
    }
}

export const fetchShareBook = async () => {
    try {
        const book = {bookName: "asdf", bookDescription: "qwerty"};
        return await axios.post('${BOOK_BASE_URL}/api/books/shareBook/', book, config);
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

export const fetchAllTransactions = async () => {
    try {
        return await axios.get(`${TSCN_BASE_URL}/api/transactions/getAllTransactions/`,config);
    } catch (e) {
        return [];
    }
}

export const fetchSellerTransaction = async () => {
    try {
        const username = "user@user.com";
        return await axios.get(`${TSCN_BASE_URL}/api/transactions/getSellerTransactions/${username}`,config);
    } catch (e) {
        return [];
    }
};

export const fetchUserOwnedBooks = async () => {
    try {
        const username = "user@user.com";
        return await axios.get(`${TSCN_BASE_URL}/api/transactions/getUserOwnedBooks/${username}`,config);
    } catch (e) {
        return [];
    }
};

export const fetchCancelOrder = async () => {
    try {
        const id = 1;
        return await axios.post(`${TSCN_BASE_URL}/api/transactions/cancelTransaction`,id,config);
    } catch (e) {
        return [];
    }
}

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

export const fetchLogin = async () => {
    try {
        const LoginRequest = "request login";
        return await axios.post("${USER_BASE_URL}/api/users/login", LoginRequest, config);
    } catch (e) {
        return [];
    }
}

export const fetchGetUserDetails = async () => {
    try {
        const username = "user@user.com"
        return await axios.get("${USER_BASE_URL}/api/users/getUser/${username}", config);
    } catch (e) {
        return [];
    }
}

export const fetchChangePassword = async () => {
    try {
        const data = "abcd123";
        return await axios.post("${USER_BASE_URL}/api/users/changePassword", data, config)
    } catch (e) {
        return [];
    }
}

//============================================================================================

// cartAction Test Utils

export const fetchCartEdit = async () => {
    try {
        const cart = { id: 1, cartTotal: 39.99}
        return await axios.post("${CART_BASE_URL}/api/shoppingcarts/saveShoppingCart", cart, config);
    } catch (e) {
        return [];
    }
}

export const fetchGetUserCart = async () => {
    try {
        const username = "user@user.com";
        return await axios.get(`${CART_BASE_URL}/api/shoppingcarts/getUserCart/${username}`,config);
    } catch (e) {
        return [];
    }
}

//=================================================================================================
// reviewActions Test utils
// both test utils same should they be different? or just keep one.
export const fetchReviewEdit = async () => {
    try {
        const review = { bookId: 1} //use bookID or id (Long).
        return await axios.post("${BOOK_BASE_URL}/api/reviews/saveReview", review, config);
    } catch (e) {
        return [];
    }
}

export const fetchGetReview = async () => {
    try {
        const reviewId =  1;
        return await axios.get(`${BOOK_BASE_URL}/api/reviews/getBookReviews/${reviewId}`, config);
    } catch (e) {
        return [];
    }
}
// new get all review
export const fetchGetAllReviews = async () => {
    try {
        return await axios.get(`${BOOK_BASE_URL}/api/reviews/getAllReviews`,config);
    } catch (e) {
        return [];
    }
}

///new remove review
export const fetchRemoveReview = async () => {
    try {
        const reviewId = 1;
        return await axios.post(`${BOOK_BASE_URL}/api/reviews/deleteReview/${reviewId}`,config);
    } catch (e) {
        return [];
    }
}


//============================================================================================
// messageActions Test Utils
export const fetchSaveMessage = async () => {
    try {
        const message = "Hello World!";
        return await axios.post(`${BOOK_BASE_URL}/api/messages/saveMessage/`, message, config)
    } catch (e) {
        return [];
    }
}

export const fetchGetMessages = async () => {
    try {
        return await axios.get(`${BOOK_BASE_URL}/api/messages/getMessages`, config)
    } catch (e) {
        return [];
    }
}




