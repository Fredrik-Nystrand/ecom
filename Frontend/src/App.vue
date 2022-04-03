<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavbarComp";
import { useStore } from "vuex";
export default {
  components: {
    Navbar,
  },
  setup() {
    const store = useStore();
    store.dispatch("checkUser");
    store.dispatch("checkCart");
    if (store.getters.loggedIn) {
      store.dispatch("getOrders", store.getters.getToken);
    }
    store.dispatch("getProducts");

    return {};
  },
};
</script>

<style>
@import "./css/global.css";
</style>
