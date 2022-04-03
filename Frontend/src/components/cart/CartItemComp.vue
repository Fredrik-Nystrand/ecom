<template>
  <div class="cart-item-wrapper">
    <div class="cart-item__img-wrapper"><img :src="item.img" /></div>
    <div class="cart-item__info-wrapper">
      <div class="cart-item_header">
        <div class="cart-item__title">{{ item.title }}</div>
        <i @click="removeItem" class="fa-solid fa-trash"></i>
      </div>
      <div class="cart-item__price-amount">
        <div class="cart-item__amount">
          Amount:
          <div class="cart-item__amount-control">
            <button @click="dec" class="btn btn-primary">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" v-model="amount" />
            <button @click="inc" class="btn btn-primary">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="cart-item__price">
          Price: {{ item.price * item.amount }} SEK
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "CartItem",
  props: ["item"],
  setup(props) {
    const store = useStore();
    const amount = ref(props.item.amount);
    const savedAmount = computed(() =>
      store.getters.cartItemAmount(props.item.id)
    );

    watch(amount, () => {
      store.dispatch("updateAmount", {
        id: props.item.id,
        amount: amount.value,
      });

      if (amount.value <= 1) {
        amount.value = 1;
      }
    });

    watch(
      computed(() => store.getters.cartItemAmount(props.item.id)),
      () => {
        amount.value = savedAmount.value;
      }
    );

    const inc = () => {
      if (amount.value === "") {
        amount.value = 0;
        amount.value += 1;
      } else {
        amount.value += 1;
      }
    };

    const dec = () => {
      if (amount.value === "" || amount.value <= 1) {
        removeItem();
      } else {
        amount.value -= 1;
      }
    };

    const removeItem = () => store.dispatch("removeItem", props.item.id);

    return {
      amount,
      inc,
      dec,
      removeItem,
    };
  },
};
</script>

<style>
.underline .cart-item-wrapper:not(:last-child) {
  border-bottom: 1px solid var(--clr-gray);
  padding-bottom: 0.7rem;
}

.cart-item-wrapper {
  display: flex;
  width: 100%;
  gap: 1rem;
}

.cart-item__img-wrapper {
  width: 50px;
  height: 50px;
}

.cart-item__img-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.cart-item_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item_header i {
  color: var(--clr-primary-desat);
  cursor: pointer;
  transition: color 0.15s ease-in-out;
}

.cart-item_header i:hover {
  color: var(--clr-dark);
}

.cart-item__info-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cart-item__title {
  font-weight: bold;
}

.cart-item__price-amount {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item__amount {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.cart-item__amount-control {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-item__amount input {
  width: 2em;
  padding: 0.1rem;
  margin: 0.5rem;
  text-align: center;
  font-weight: bold;
  border-radius: 0.5rem;
  border: 1px solid rgb(153, 153, 153);
}

.cart-item__amount button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8em;
  height: 1.8em;
}

.cart-item__amount input:focus {
  outline: none;
}

.cart-item__amount input::-webkit-outer-spin-button,
.cart-item__amount input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart-item__amount input[type="number"] {
  -moz-appearance: textfield;
}
</style>
