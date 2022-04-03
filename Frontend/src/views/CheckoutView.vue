<template>
  <div class="checkout-wrapper container">
    <div class="checkout card underline">
      <div class="checkout__header">
        <div class="chekout__title">
          <div @click="navBack" class="checkout__back-button">
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div class="checkout_title-text">Checkout Summary</div>
        </div>
      </div>
      <div class="checkout-list">
        <CartItem
          class="checkout-list-item"
          v-for="item in cart"
          :key="item.id"
          :item="item"
        />
        <div class="checkout__footer">
          <div class="checkout__price-info">
            <p class="checkout__total-price">
              Total Price: {{ totalPrice }} SEK
            </p>
            <p class="checkout__vat-price">VAT Excluded: {{ noVat }} SEK</p>
          </div>
          <button @click="placeOrder" class="btn btn-primary">
            Place Order <i class="fa-solid fa-thumbs-up"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "../components/cart/CartItemComp";
import { computed, ref } from "vue";
import { useStore, onMounted } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Checkout",
  components: {
    CartItem,
  },
  setup() {
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

    /*  const checkout = () => {
      router.push({ name: "checkout" });
    }; */

    const navBack = () => {
      store.dispatch("resetProduct");
      router.back();
    };

    const placeOrder = () => {
      const order = {
        cart: cart.value,
        totalPrice: totalPrice.value,
        token: store.getters.getToken,
      };
      const newOrder = store.dispatch("placeOrder", order);

      if (newOrder) {
        store.dispatch("clearCart");
        router.push({ name: "home" });
      }
    };

    return {
      cart,
      totalPrice,
      noVat,
      navBack,
      placeOrder,
    };
  },
};
</script>

<style>
.checkout__header {
  display: flex;
}

.chekout__title {
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5em;
  padding-bottom: 1.2em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--clr-gray);
}

.checkout__back-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  width: 32px;
}

.checkout__back-button :hover {
  color: var(--clr-primary-desat);
}

.checkout_title-text {
  flex: 1;
  transform: translatex(-32px);
}

.checkout-list-item {
  margin-bottom: 1rem;
}

.checkout__footer {
  display: flex;
}

.checkout__price-info {
  flex: 1;
}

.checkout__total-price {
  font-weight: bold;
  font-size: 1.5em;
}

.checkout__footer button {
  padding-inline: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.checkout__footer button:hover {
  background-color: var(--clr-success);
}

.checkout__footer button i {
  transform: translatey(-2px);
}
</style>
