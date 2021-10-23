import axios from "axios"
import { USER_BASE_URL, config, fetchUserAccountsList, fetchUnapprovedList, fetchUserEdit, fetchBlockUser } from "../../../utils"

jest.mock("axios");

//TODO userEdit test
describe("fetchUserEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful user edit", async () => {
            const user = { id: 1, name: "User 1"};

            axios.post.mockResolvedValueOnce(user, config);

            const result = await fetchUserEdit();

            expect(axios.post).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/updateApproved/', user, config );
            expect(result).toEqual(user);
        });
    });

    describe("when API call fails", () => {
        test("should return empty user edit", async () => {
            const user = { id: 1, name: "User 1"};
            const message = "Error retrieving user edit";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchUserEdit();

            expect(axios.post).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/updateApproved/', user, config);
            expect(result).toEqual([]);
        });
    });
})

describe("fetchUnapprovedList", () => {
    describe("when API call is successful", () => {
        test("should return unapproved list", async () => {
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Doe" },
            ];
            axios.get.mockResolvedValueOnce(users);

            const result = await fetchUnapprovedList();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllUnapprovedUsers');
            expect(result).toEqual(users);
        });
    });

    describe("when API call fails", () => {
        test("should return empty users list", async () => {
            const message = "Error retrieving unapproved users";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchUnapprovedList();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllUnapprovedUsers');
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

            const result = await fetchUserAccountsList();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
            expect(result).toEqual(users);
        });
    });

    describe("when API call fails", () => {
        test("should return empty users list", async () => {
            const message = "Error retrieving approved users";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchUserAccountsList();

            expect(axios.get).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/getAllApprovedUsers/');
            expect(result).toEqual([]);
        })
    })
});

describe("fetchBlockUsers", () => {
    describe("when API call is successful", () => {
        test("should return successful block user", async () => {
            const user = { id: 1, name: "User 1"}
            axios.post.mockResolvedValueOnce(user);

            const result = await fetchBlockUser();

            expect(axios.post).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/blockUser', user, config);
            expect(result).toEqual(user);
        });
    });

    describe("when API call fails", () => {
        test("should return failed block user", async () => {
            const user = { id: 1, name: "User 1"}
            const message = "Error blocking user";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchBlockUser();

            expect(axios.post).toHaveBeenCalledWith('${USER_BASE_URL}/api/users/blockUser', user, config);
            expect(result).toEqual([]);
        })
    })
});

//TODO increment test