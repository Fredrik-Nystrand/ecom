import axios from "@/axios";

export default {
    state: {
        cart: [],
    },
    getters: {
        cart: (state) => state.cart,
        cartItemAmount: (state) => (id) => {
            const itemExists = state.cart.find((item) => item.id === id);

            if (itemExists) {
                return itemExists.amount;
            }
        },
    },
    mutations: {
        ADD_ITEM: (state, { product, id, amount }) => {
            const itemExists = state.cart.find((item) => item.id === id);
            if (itemExists) {
                itemExists.amount += amount;
            } else {
                const newItem = {
                    id,
                    title: product.name,
                    img: product.imgURL,
                    price: product.price,
                    amount,
                };

                state.cart.push(newItem);
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }

            //console.log(state.cart);
        },

        UPDATE_AMOUNT: (state, { id, amount }) => {
            const itemExists = state.cart.find((item) => item.id === id);
            if (itemExists) {
                if (amount === "" || amount <= 1) {
                    itemExists.amount = 1;
                } else {
                    itemExists.amount = amount;
                }

                localStorage.setItem("cart", JSON.stringify(state.cart));
                //console.log(state.cart);
            }
        },

        REMOVE_ITEM: (state, id) => {
            const itemExists = state.cart.find((item) => item.id === id);
            if (itemExists) {
                state.cart = state.cart.filter((item) => item.id !== id);

                localStorage.setItem("cart", JSON.stringify(state.cart));
                //console.log(state.cart);
            }
        },
        SET_CART: (state, cart) => {
            if (cart) {
                state.cart = cart;
            } else {
                state.cart = [];
            }
        },
    },
    actions: {
        addItem: async({ commit }, { id, amount }) => {
            const res = await axios.get("products/" + id);

            commit("ADD_ITEM", { product: res.data, id, amount });
        },

        updateAmount: ({ commit }, item) => {
            commit("UPDATE_AMOUNT", item);
        },

        removeItem: ({ commit }, item) => {
            commit("REMOVE_ITEM", item);
        },

        checkCart: ({ commit }) => {
            const cart = JSON.parse(localStorage.getItem("cart"));

            if (cart) {
                commit("SET_CART", cart);
            }
        },

        clearCart: ({ commit }) => {
            localStorage.removeItem("cart");
            commit("SET_CART", null);
        },
    },
};