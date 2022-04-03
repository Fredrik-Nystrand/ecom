import axios from "@/axios";

export default {
    state: {
        user: null,
        loggedIn: false,
    },
    getters: {
        loggedIn: (state) => state.loggedIn,
        getToken: (state) => (state.user ? state.user.token : null),
        getUser: (state) => state.user,
    },
    mutations: {
        SET_USER: (state, user) => {
            if (user) {
                state.user = user;
                state.loggedIn = true;
            } else {
                state.user = null;
                state.loggedIn = false;
            }
        },
    },
    actions: {
        login: async({ commit }, user) => {
            const res = await axios.post("users/login", user);
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data));
                commit("SET_USER", res.data);
                return res.data;
            }
        },
        register: async({ commit }, user) => {
            const res = await axios.post("users", user);
            if (res.status === 201) {
                localStorage.setItem("user", JSON.stringify(res.data));
                commit("SET_USER", res.data);
                return res.data;
            }
        },
        logout: ({ commit }) => {
            try {
                localStorage.removeItem("user");
                commit("SET_USER", null);
            } catch {
                console.log("not logged in");
            }
        },
        checkUser: ({ commit }) => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                commit("SET_USER", user);
            }
        },
    },
};