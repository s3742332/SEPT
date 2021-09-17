import axios from "axios";
import { USER_BASE_URL, config, fetchCreateNewUser } from "../../../utils"

jest.mock("axios");

describe("fetchCreateNewUser", () => {
    describe("when API call is successful", () => {
        test("should return successful user creation", async () => {
            const newUser = { id: 1, name: "New User"};
            axios.post.mockResolvedValueOnce(newUser, config);
            
            const result = await fetchCreateNewUser();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/register", newUser, config);
            expect(result).toEqual(newUser);
        });
    });


    describe("when API call fails", () => {
        test("should return unsuccessful user creation", async () => {
            const newUser = { id: 1, name: "New User"};
            const message = "Error creating new user";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchCreateNewUser();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/register", newUser, config);
            expect(result).toEqual([]);
        });
    });
});
