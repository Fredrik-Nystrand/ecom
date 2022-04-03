<template>
  <div class="cart-wrapper">
    <i class="fa-solid fa-cart-shopping"></i>
    <div class="cart-amount">
      <span>{{ cart }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "UserShoppingCart",
  setup() {
    const store = useStore();
    return {
      cart: computed(() =>
        store.getters.cart.reduce((a, b) => a + b.amount, 0)
      ),
    };
  },
};
</script>

<style>
.cart-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
}
.cart-wrapper i {
  color: white;
  font-size: 1.5rem;
}

.cart-wrapper .cart-amount {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 7px;
  left: 12px;

  color: var(--clr-primary-desat);
  font-size: 0.7rem;
  font-weight: bold;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 100%;
  padding: 0.1em;
  pointer-events: none;
}
</style>
