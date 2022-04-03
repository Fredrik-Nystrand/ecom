<template>
  <div class="container">
    <ProductList class="product-list" />
  </div>
</template>

<script>
import ProductList from "../components/products/ProductListComp";
export default {
  name: "ProductsView",
  components: {
    ProductList,
  },
};
</script>

<style>
.product-list {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}

@media (min-width: 700px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
