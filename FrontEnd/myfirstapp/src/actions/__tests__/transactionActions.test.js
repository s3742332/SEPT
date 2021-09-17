import axios from "axios"
import { TSCN_BASE_URL, config, fetchTransactionEdit, fetchUserTransaction } from "../../../utils"

jest.mock("axios");

describe("fetchTransactionEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful transaction edit", async () => {
            const transaction = { id: 1, name: "Transaction 1"};
            axios.post.mockResolvedValueOnce(transaction, config);
            
            const result = await fetchTransactionEdit();

            expect(axios.post).toHaveBeenCalledWith('${TSCN_BASE_URL}/api/transactions/saveTransaction', transaction, config);
            expect(result).toEqual(transaction);
        });
    });


    describe("when API call fails", () => {
        test("should return unsuccessful transaction edit", async () => {
            const transaction = { id: 1, name: "Transaction 1"};
            const message = "Error editing transaction";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchTransactionEdit();

            expect(axios.post).toHaveBeenCalledWith('${TSCN_BASE_URL}/api/transactions/saveTransaction', transaction, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchUserTransaction", () => {
    describe("when API call is successful", () => {
        test("should return user transaction", async () => {
            const username = "User1";
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchUserTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${TSCN_BASE_URL}/api/transactions/getAllUserTransactions?userName=${username}`, config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return empty transaction", async () => {
            const username = "User1";
            const message = "Error retrieving user transaction";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchUserTransaction();

            expect(axios.get).toHaveBeenCalledWith(`${TSCN_BASE_URL}/api/transactions/getAllUserTransactions?userName=${username}`, config);
            expect(result).toEqual([]);
        });
    });
});

