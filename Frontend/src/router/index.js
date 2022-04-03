import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import HomeView from "../views/HomeView";
import ProductsView from "../views/ProductsView";
import ProductDetailsView from "../views/ProductDetailsView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import ProfileView from "../views/ProfileView";
import CheckoutView from "../views/CheckoutView";

const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/store",
        name: "store",
        component: ProductsView,
    },
    {
        path: "/product/:id",
        name: "productDetails",
        component: ProductDetailsView,
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfileView,
        meta: { auth: true },
    },
    {
        path: "/checkout",
        name: "checkout",
        component: CheckoutView,
        meta: { checkCart: true, auth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    let loggedIn = store.getters.loggedIn;

    const { auth, checkCart } = to.meta;

    if (auth) {
        if (!loggedIn) {
            next({ name: "login", query: { redirect: to.fullPath } });
            return;
        }
    }

    if (checkCart) {
        if (store.getters.cart.length < 1) {
            next({ name: "home" });
            return;
        }
    }

    next();
});

export default router;