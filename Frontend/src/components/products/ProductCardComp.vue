<template>
  <div class="product-card-wrapper">
    <div class="product-card">
      <router-link
        :to="{ name: 'productDetails', params: { id: product._id } }"
      >
        <div class="product-card__img-wrapper">
          <img :src="product.imgURL" />
        </div>
        <div class="product-card__body">
          <div class="product-card__title">{{ product.name }}</div>
          <div class="product-card__desc">{{ short + " ..." }}</div>
        </div>
      </router-link>
      <div class="product-card__footer">
        <div class="product-card__price">{{ product.price }} kr</div>
        <div class="product-card__button-wrapper">
          <button @click="addToCart" class="btn btn-primary">
            Add to cart <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "ProductCard",
  props: ["product"],
  setup(props) {
    const store = useStore();
    const short = ref(props.product.description);

    if (props.product.description.length > 100) {
      short.value = props.product.description.substring(0, 100);
    }

    const addToCart = () => {
      store.dispatch("addItem", { id: props.product._id, amount: 1 });
    };

    return { short, addToCart };
  },
};
</script>

<style>
.product-card {
  max-width: 100%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 5px #00000015;
}

.product-card a {
  color: inherit;
  transition: color 0.15s ease-in-out;
}

.product-card a:hover {
  color: var(--clr-primary-desat);
}

.product-card__img-wrapper {
  width: 100%;
  height: 11rem;
  border-bottom: 1px solid var(--clr-gray);
  padding-bottom: 1rem;
}

.product-card__img-wrapper img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.product-card__title {
  width: max(60vw, 20px);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5em;
  margin-bottom: 1em;
}

.product-card__desc {
  letter-spacing: -0.05em;
  word-spacing: 1px;
  line-height: 1em;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.product-card__price {
  font-weight: bold;
  font-size: 1.5em;
  color: var(--clr-dark);
}

@media (min-width: 700px) {
  .product-card__title {
    width: max(30vw, 20px);
  }
}

@media (min-width: 1000px) {
  .product-card__title {
    width: unset;
  }
  .product-card {
    max-width: 18rem;
  }
}
</style>
