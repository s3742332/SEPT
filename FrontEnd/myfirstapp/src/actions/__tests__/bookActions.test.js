import axios from "axios"
import { BOOK_BASE_URL, config, fetchBookEdit, fetchBookList, fetchPendingBookList } from "../../../utils"

jest.mock("axios");

//TODO bookEdit test
// describe("fetchBookEdit", () => {
//     describe("when API call is successful", () => {
//         test("should return successful book edit", async () => {
//             const book = {id: 1, name: "Book 1"}
//             axios.post.mockResolvedValueOnce(book);

//             const result = await fetchBookEdit();

//             expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/saveBook', book, config);
//             expect(result).toEqual(book);
//         });
//     });

//     describe("when API call fails", () => {
//         test("should return unsuccessful book edit", async () => {
//             const book = {id: 1, name: "Book 1"}
//             const message = "Error editing book";
//             axios.post.mockRejectedValueOnce(new Error(message));

//             const result = await fetchBookEdit();

//             expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/books/saveBook', book, config);
//             expect(result).toEqual([]);
//         });
//     });
//});

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

