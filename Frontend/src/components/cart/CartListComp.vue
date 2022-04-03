<template>
  <div :class="{ underline: cart.length > 1, 'cart-list': true }">
    <div class="empty-cart" v-if="cart.length < 1">Your cart is empty</div>
    <CartItem v-for="item in cart" :key="item.id" :item="item" />
    <div class="cart-list__footer" v-if="cart.length > 0">
      <div class="cart-list__price-wrapper">
        <p class="cart-list__total-price">Total Price: {{ totalPrice }} SEK</p>
        <p class="cart-list__vat-price">VAT Excluded: {{ noVat }} SEK</p>
      </div>
      <button @click="checkout" class="btn btn-primary">
        Checkout <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItemComp";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "CartList",
  components: {
    CartItem,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const cart = ref(computed(() => store.getters.cart));
    const totalPrice = ref(
      computed(() =>
        store.getters.cart.reduce((a, b) => a + b.price * b.amount, 0)
      )
    );

    const noVat = computed(() => totalPrice.value * 0.8);

    const checkout = () => {
      router.push({ name: "checkout" });
      emit("closeCart");
    };

    return {
      cart,
      totalPrice,
      noVat,
      checkout,
    };
  },
};
</script>

<style>
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-list__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-list__total-price {
  font-weight: bold;
}

.cart-list__vat-price {
  font-size: small;
  color: rgb(131, 131, 131);
}
</style>
