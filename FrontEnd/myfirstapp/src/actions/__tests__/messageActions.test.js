import axios from "axios"
import {BOOK_BASE_URL, config, fetchSaveMessage, fetchGetMessages, fetchReviewEdit} from "../../../utils"

jest.mock("axios");

describe("fetchSaveMessage", () => {
    describe("when API call is successful", () => {
        test("should return successful message save", async () => {
            const message = "Hello World!";
            axios.post.mockResolvedValueOnce(message, config);

            const result = await fetchSaveMessage();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/messages/saveMessage/`, message, config);

            expect(result).toEqual(message);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful message save", async () => {
            const message = "Hello World!";
            const errorMessage = "Error saving message";
            axios.post.mockRejectedValueOnce(new Error(errorMessage));

            const result = await fetchSaveMessage();

            expect(axios.post).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/messages/saveMessage/`, message, config);

            expect(result).toEqual([]);
        });
    });
});

describe("fetchGetMessages", () => {
    describe("when API call is successful", () => {
        test("should return successful message get", async () => {
            axios.get.mockResolvedValueOnce(config);

            const result = await fetchGetMessages();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/messages/getMessages`, config);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful message get", async () => {
            const errorMessage = "Error editing getting messages";
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            const result = await fetchGetMessages();

            expect(axios.get).toHaveBeenCalledWith(`${BOOK_BASE_URL}/api/messages/getMessages`, config);

            expect(result).toEqual([]);
        });
    });
});