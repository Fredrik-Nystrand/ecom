<template>
  <div>
    <button class="accordion-btn" @click="open">
      <div class="item-id">
        <i class="fa-solid fa-circle"></i>Order ID: {{ item._id }}
      </div>
      <div class="right">
        <div class="total-price">Total Price: {{ item.totalPrice }} SEK</div>
        <i class="fa-solid fa-caret-down"></i>
      </div>
    </button>
    <div ref="panel" class="panel">
      <div class="order-product" v-for="product in item.cart" :key="product.id">
        <div class="order-img-wrapper"><img :src="product.img" /></div>
        <div class="order-product-title">{{ product.title }}</div>
        <div class="order-product-amount-price">
          {{ product.amount }} x {{ product.price }} SEK
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "OrderItem",
  props: ["item"],
  setup(props) {
    const panel = ref(null);
    let panelOpen = false;

    const open = () => {
      if (panelOpen) {
        panel.value.style.maxHeight = "0rem";
        panelOpen = false;
        return;
      }

      panel.value.style.maxHeight = "20rem";
      panelOpen = true;
    };

    return {
      panel,
      open,
    };
  },
};
</script>

<style>
.accordion-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--clr-gray);
  border: none;
  padding: 1rem;
  text-align: left;
  border-radius: 0.5rem;
}

.accordion-btn .right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
}

.item-id {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.item-id i {
  font-size: 0.5rem;
}

.panel {
  display: flex;
  flex-direction: column;
  width: 97%;
  padding: 0 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
  outline: 3px solid var(--clr-gray);
  outline-offset: -3px;
  margin: 0 auto;
  transform: translatey(-3px);
}

.order-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 0.5rem;
  border-bottom: 1px solid var(--clr-gray);
}

.order-img-wrapper {
  height: 3rem;
}

.order-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
