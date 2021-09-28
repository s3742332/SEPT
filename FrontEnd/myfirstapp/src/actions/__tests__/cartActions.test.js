import axios from "axios"
import {CART_BASE_URL, config, fetchCartEdit, fetchGetUserCart} from "../../../utils"

jest.mock("axios");

describe("fetchCartEdit", () => {
    describe("when API call is successful", () => {
        test("should return successful cart edit", async () => {
            const cart = {id: 1, cartTotal: 39.99}
            axios.post.mockResolvedValueOnce(cart, config);

            const result = await fetchCartEdit();

            expect(axios.post).toHaveBeenCalledWith("${CART_BASE_URL}/api/shoppingcarts/saveShoppingCart", cart, config);
            expect(result).toEqual(cart);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful book edit", async () => {
            const cart = {id: 1, cartTotal: 39.99}
            const message = "Error editing cart";
            axios.post.mockRejectedValueOnce(new Error(message));

            const result = await fetchCartEdit();

            expect(axios.post).toHaveBeenCalledWith("${CART_BASE_URL}/api/shoppingcarts/saveShoppingCart", cart, config);
            expect(result).toEqual([]);
        });
    });
});

describe("fetchGetUserCart", () => {
    describe("when API call is successful", () => {
        test("should return successful get user cart", async () => {
            const username = "user@user.com";
            axios.get.mockResolvedValueOnce(username, config);

            const result = await fetchGetUserCart();

            expect(axios.get).toHaveBeenCalledWith(`${CART_BASE_URL}/api/shoppingcarts/getUserCart/${username}`,config);
            expect(result).toEqual(username);
        });
    });

    describe("when API call fails", () => {
        test("should return unsuccessful get user cart", async () => {
            const username = "user@user.com";
            const message = "Error retrieving user cart";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchGetUserCart();

            expect(axios.get).toHaveBeenCalledWith(`${CART_BASE_URL}/api/shoppingcarts/getUserCart/${username}`,config);
            expect(result).toEqual([]);
        });
    });
});