import axios from "axios"
import { BOOK_BASE_URL, config, fetchTransactionEdit, fetchUserTransaction, fetchAllTransactions, fetchSellerTransaction, fetchUserOwnedBooks, fetchCancelOrder } from "../../../utils"

jest.mock("axios");

describe("fetchTransactionEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful transaction edit", async () => {
            const transaction = { id: 1, userName: "Transaction 1"};
            axios.post.mockResolvedValueOnce(transaction, config);
            
            const result = await fetchTransactionEdit();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/transactions/saveTransaction', transaction, config);
            expect(result).toEqual(transaction);
        });
    });


    describe("when API call fails", () => {
        test("should return unsuccessful transaction edit", async () => {
            const transaction = { id: 1, userName: "Transaction 1"};
            const message = "Error editing transaction";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchTransactionEdit();

            expect(axios.post).toHaveBeenCalledWith('${BOOK_BASE_URL}/api/transactions/saveTransaction', transaction, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchUserTransaction", () => {
    describe("when API call is successful", () => {
        test("should return user transaction", async () => {
            const username = "user@user.com";
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchUserTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getAllUserTransactions/${username}`,config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return empty transaction", async () => {
            const username = "user@user.com";
            const message = "Error retrieving user transaction";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchUserTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getAllUserTransactions/${username}`,config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchAllTransactions", () => {
    describe("when API call is successful", () => {
        test("should return all transactions", async () => {
            axios.get.mockResolvedValueOnce(config);

            const result = await fetchAllTransactions();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getAllTransactions/`,config);
        });
    });

    describe("when API call fails", () => {
        test("should return empty transactions", async () => {
            const message = "Error retrieving all transactions";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchAllTransactions();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getAllTransactions/`,config);
        });
    });
});

describe("fetchSellerTransaction", () => {
    describe("when API call is successful", () => {
        test("should return seller transaction", async () => {
            const username = "user@user.com";
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchSellerTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getSellerTransactions/${username}`,config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return empty seller transaction", async () => {
            const username = "user@user.com";
            const message = "Error retrieving user transaction";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchSellerTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getSellerTransactions/${username}`,config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchUserOwnedBooks", () => {
    describe("when API call is successful", () => {
        test("should return user owned books", async () => {
            const username = "user@user.com";
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchUserOwnedBooks();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getUserOwnedBooks/${username}`,config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return empty user owned books", async () => {
            const username = "user@user.com";
            const message = "Error retrieving user transaction";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchUserOwnedBooks();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/getUserOwnedBooks/${username}`,config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchCancelorder", () => {
    describe("when API call is successful", () => {
        test("should return cancel order successfully", async () => {
            const id = 1;
            axios.post.mockResolvedValueOnce(id, config);

            const result = await fetchCancelOrder();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/cancelTransaction`,id,config);
            expect(result).toEqual(id);
        });
    });

    describe("when API call fails", () => {
        test("should return cancel order unsuccessfully", async () => {
            const id = 1;
            const message = "Error cancelling order";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchCancelOrder();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/transactions/cancelTransaction`,id,config);
            expect(result).toEqual([]);
        });
    });
});

