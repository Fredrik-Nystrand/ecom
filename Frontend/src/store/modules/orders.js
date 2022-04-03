import axios from "@/axios";

export default {
    state: {
        orders: [],
    },
    getters: {
        getOrders: (state) => state.orders,
    },
    mutations: {
        SUBMIT_ORDER: (state, order) => {
            state.orders.push(order);
            //console.log(state.orders);
        },
        GET_ORDERS: (state, orders) => {
            state.orders = orders;
        },
        CLEAR_ORDERS: (state) => {
            state.orders = [];
        },
    },
    actions: {
        placeOrder: async({ commit }, { cart, totalPrice, token }) => {
            const res = await axios.post(
                "orders", { cart, totalPrice }, {
                    headers: { Authorization: "Bearer " + token },
                }
            );

            if (res.status === 201) {
                //console.log(res.data);
                commit("SUBMIT_ORDER", res.data);
                return res.data;
            }
        },
        getOrders: async({ commit }, token) => {
            const res = await axios.get("orders", {
                headers: { Authorization: "Bearer " + token },
            });
            if (res.status === 200) {
                commit("GET_ORDERS", res.data.orders);
            }
        },

        clearOrders: ({ commit }) => {
            commit("CLEAR_ORDERS");
        },
    },
};