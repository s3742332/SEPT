import axios from "axios"
import {
    BOOK_BASE_URL,
    config,
    fetchBookEdit,
    fetchBookList,
    fetchCategory,
    fetchPendingBookList,
    fetchSearchedBook,
    fetchSellUsed,
    fetchShareBook
} from "../../../utils"

jest.mock("axios");

describe("fetchBookEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful save book", async () => {
            const book = {id: 1, name: "Book 1"}
            axios.post.mockResolvedValueOnce(book, config);

            const result = await fetchBookEdit();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/saveBook', book, config);
            expect(result).toEqual(book);
        });
    });

    describe("when API call is successful", () => {
        test("should return successful edit book", async () => {
            let book = {bookName: "asdf", bookDescription: "qwerty"};
            axios.post.mockResolvedValueOnce(book, config);
            const savedBook = await fetchBookEdit();

            book = {bookName: "asdf", bookDescription: "updated"};
            axios.post.mockResolvedValueOnce(book, config);
            const editedBook = await fetchBookEdit();

            //savedBook should be different to editedBook - changed bookDescription
            expect(savedBook).not.toEqual(editedBook);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful book save/edit", async () => {
            const book = {id: 1, name: "Book 1"}
            const message = "Error editing book";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchBookEdit();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/saveBook', book, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchCategory", () => {
    describe("when API call is successful", () => {
        test("should return books in category", async () => {
            const category = 'Dystopian';
            const books = [
                { id: 1, name: "Book 1", category: category },
                { id: 3, name: "Book 3", category: category }
            ];

            axios.get.mockResolvedValueOnce(books);

            const result = await fetchCategory(category);

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getBooksInCategory/${category.category}', config);
            expect(result).toEqual(books);
        });
    });

    describe("when API call fails", () => {
        test("should return empty category book", async () => {
            const category = 'Horror';
            const message = "Error retrieving category book";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchCategory();

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getBooksInCategory/${category.category}', config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchBookList", () => {
    describe("when API call is successful", () => {
        test("should return book list", async () => {
            const books = [
                { id: 1, name: "Book 1" },
                { id: 2, name: "Book 2" },
            ];
            axios.get.mockResolvedValueOnce(books);

            const result = await fetchBookList();

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getAllApprovedBooks', config);
            expect(result).toEqual(books);
        });
    });

    describe("when API call fails", () => {
        test("should return empty book list", async () => {
            const message = "Error retrieving book list";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchBookList();

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getAllApprovedBooks', config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchPendingBookList", () => {
    describe("when API call is successful", () => {
        test("should return pending book list", async () => {
            const pendingBooks = [
                { id: 1, name: "Pending Book 1" },
                { id: 2, name: "Pending Book 2" },
            ];
            axios.get.mockResolvedValueOnce(pendingBooks);

            const result = await fetchPendingBookList();

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getAllPendingBooks', config);
            expect(result).toEqual(pendingBooks);
        });
    });

    describe("when API call fails", () => {
        test("should return empty pending book list", async () => {
            const message = "Error retrieving pending books";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchPendingBookList();

            expect(axios.get).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/getAllPendingBooks', config);
            expect(result).toEqual([]);
        });
    });
});

//TODO getSearchedBook
describe("fetchSearchedBook", () => {
    describe("when API call is successful", () => {
        test("should return searched book", async () => {
            const book = {bookName: "asdf", bookDescription: "qwerty"};
            axios.get.mockResolvedValueOnce(book);

            const result = await fetchSearchedBook();

            expect(result).toEqual(book);
        });
    });

    describe("when API call fails", () => {
        test("should return empty searched book", async () => {
            const message = "Error retrieving pending books";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchSearchedBook();

            expect(result).toEqual([]);
        });
    });
});

describe("fetchSellUsed", () => {
    describe("when API call is successful", () => {
        test("should return successful sell used book", async () => {
            const book = {bookName: "asdf", bookDescription: "qwerty"};
            axios.post.mockResolvedValueOnce(book, config);

            const result = await fetchSellUsed();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/sellUsedBook/', book, config);
            expect(result).toEqual(book);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful sell used book", async () => {
            const book = {bookName: "asdf", bookDescription: "qwerty"};
            const message = "Error selling used book";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchSellUsed();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/sellUsedBook/', book, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchShareBook", () => {
    describe("when API call is successful", () => {
        test("should return successful share book", async () => {
            const book = {bookName: "asdf", bookDescription: "qwerty"};
            axios.post.mockResolvedValueOnce(book, config);

            const result = await fetchShareBook();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/shareBook/', book, config);
            expect(result).toEqual(book);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful share book", async () => {
            const book = {bookName: "asdf", bookDescription: "qwerty"};
            const message = "Error sharing book";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchShareBook();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/shareBook/', book, config);
            expect(result).toEqual([]);
        });
    });
});


