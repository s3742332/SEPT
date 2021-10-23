import axios from "axios";
import { USER_BASE_URL, config, fetchCreateNewUser, fetchLogin, fetchGetUserDetails, fetchChangePassword } from "../../../utils"
import Login from "../../components/UserManagement/Login";

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

describe("fetchLogin", () => {
    describe("when API call is successful", () => {
        test("should return successful user login", async () => {
            const LoginRequest = "request login"
            axios.post.mockResolvedValueOnce(LoginRequest, config);

            const result = await fetchLogin();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/login", LoginRequest, config);
            expect(result).toEqual(LoginRequest);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful user login", async () => {
            const LoginRequest = "request login"
            const message = "Error logging in";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchLogin();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/login", LoginRequest, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchGetUserDetails", () => {
    describe("when API call is successful", () => {
        test("should return successful user details", async () => {
            const username = "user@user.com"
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchGetUserDetails();

            expect(axios.get).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/getUser/${username}", config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful user details", async () => {
            const username = "user@user.com"
            const message = "Error retrieving details";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchGetUserDetails();

            expect(axios.get).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/getUser/${username}", config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchChangePassword", () => {
    describe("when API call is successful", () => {
        test("should return successful change password", async () => {
            const data = "abcd123"
            axios.post.mockResolvedValueOnce(data, config);

            const result = await fetchChangePassword();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/changePassword", data, config);
            expect(result).toEqual(data);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful change password", async () => {
            const data = "abcd123"
            const message = "Error changing password";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchChangePassword();

            expect(axios.post).toHaveBeenCalledWith("${USER_BASE_URL}/api/users/changePassword", data, config);
            expect(result).toEqual([]);
        });
    });
});
