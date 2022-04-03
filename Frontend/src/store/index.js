import { createStore } from "vuex";
import products from "./modules/products";
import cart from "./modules/cart";
import user from "./modules/user";
import orders from "./modules/orders";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        products,
        cart,
        user,
        orders,
    },
});