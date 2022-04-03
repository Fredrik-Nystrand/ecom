<template>
  <div>
    <ProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCardComp";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore();

    return {
      products: computed(() => store.getters.products),
    };
  },
};
</script>

<style></style>
