<template>
  <div class="profile-wrapper container" v-if="loggedIn">
    <div class="profile card">
      <div class="profile__header"><h1>My Profile</h1></div>
      <div class="user-info">
        <h2>My info:</h2>
        <p class="user-name">Name: {{ user.name }}</p>
        <p class="user-name">Email: {{ user.email }}</p>
        <p class="user-name">User-ID: {{ user.id }}</p>
      </div>

      <h2>Previous Orders:</h2>
      <div class="previous-orders-list">
        <OrderItem
          class="order-item"
          v-for="item in orders"
          :key="item._id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from "../components/user-components/OrderItemComp.vue";
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
export default {
  name: "Profile",
  components: {
    OrderItem,
  },
  setup() {
    const store = useStore();
    //const orders = ref();
    const user = ref(computed(() => store.getters.getUser));

    return {
      orders: computed(() => store.getters.getOrders),
      loggedIn: computed(() => store.getters.loggedIn),
      user,
    };
  },
};
</script>

<style>
.previous-orders-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile__header {
  text-align: center;
  margin-bottom: 3rem;
}

.user-info {
  margin-bottom: 3rem;
}
</style>
