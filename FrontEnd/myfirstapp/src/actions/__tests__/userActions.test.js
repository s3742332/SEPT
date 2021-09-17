import axios from "axios"
import { USER_BASE_URL, fetchApprovedUsers, fetchPendingSellers } from "../../../utils"

jest.mock("axios");

//TODO userEdit test

describe("fetchPendingSellers", () => {
    describe("when API call is successful", () => {
        test("should return pending sellers list", async () => {
            const pendingSellers = [
                { id: 1, name: "Seller 1" },
                { id: 2, name: "Seller 2" },
            ];
            axios.get.mockResolvedValueOnce(pendingSellers);

            const result = await fetchPendingSellers();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllPendingBusiness/');
            expect(result).toEqual(pendingSellers);
        });
    });

    describe("when API call fails", () => {
        test("should return empty pending sellers list", async () => {
            const message = "Error retrieving pending sellers";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchPendingSellers();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllPendingBusiness/');
            expect(result).toEqual([]);
        })
    })
});

describe("fetchApprovedUsers", () => {
    describe("when API call is successful", () => {
        test("should return users list", async () => {
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Doe" },
            ];
            axios.get.mockResolvedValueOnce(users);

            const result = await fetchApprovedUsers();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
            expect(result).toEqual(users);
        });
    });

    describe("when API call fails", () => {
        test("should return empty users list", async () => {
            const message = "Error retrieving approved users";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchApprovedUsers();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
            expect(result).toEqual([]);
        })
    })
});

//TODO increment test