<template>
  <div class="container product-single-wrapper">
    <div class="product-single">
      <div class="product-single__header">
        <div class="product-single__title">
          <div @click="navBack" class="product-single__back-button">
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div class="product-single_title-text">{{ product.name }}</div>
        </div>
      </div>
      <div class="product-single__img-wrapper">
        <img :src="product.imgURL" />
      </div>
      <div class="product-single__body">
        <div class="product-single__desc">{{ product.description }}</div>
      </div>
    </div>
    <div class="product-single__footer">
      <div class="product-single__buy-section">
        <div class="product-single__price-wrapper">
          <div class="product-single__price">{{ product.price }} SEK</div>
          <div class="product-single__price__subtitle">
            {{ priceNoVat }} SEK (Ex. VAT )
          </div>
          <div class="product-single__button-wrapper">
            <button @click="addToCart" class="btn btn-primary">
              Add to cart <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
        <div class="product-stock">
          <h3>Stock</h3>
          <div class="stock-group in-stock">
            <p>Online stock:</p>
            <i class="fa-solid fa-circle"></i>
          </div>
          <div class="stock-group no-stock">
            <p>Stockholm:</p>
            <i class="fa-solid fa-circle"></i>
          </div>
          <div class="stock-group in-stock">
            <p>Västerås:</p>
            <i class="fa-solid fa-circle"></i>
          </div>
          <div class="stock-group in-stock">
            <p>Malmö:</p>
            <i class="fa-solid fa-circle"></i>
          </div>
          <div class="stock-group no-stock">
            <p>Jönköping:</p>
            <i class="fa-solid fa-circle"></i>
          </div>
        </div>
        <div class="product-single__shop-policy">
          <div class="policy-group">
            <i class="fa-solid fa-check"></i>Free Shipping
          </div>
          <div class="policy-group">
            <i class="fa-solid fa-check"></i>30-Day Return Policy
          </div>
          <div class="policy-group">
            <i class="fa-solid fa-check"></i>Free Return
          </div>
          <div class="product-single__buy-info">Shop safely with BankID</div>
        </div>
      </div>
      <div class="product-single__reviews">
        <h3>Reviews</h3>
        <div class="review-head">
          <div class="review-avatar"><Avatar /></div>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star not-filled"></i>
          </div>
          <div class="review-date">5 Mounths Ago</div>
        </div>
        <div class="review-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint cum
          consequuntur voluptatibus molestias? Aliquid sunt.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../components/user-components/AvatarComp.vue";
//import { ref } from "vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "SingleProduct",
  components: { Avatar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params;
    const store = useStore();
    const product = ref(computed(() => store.getters.product));
    store.dispatch("getProductById", id);

    const navBack = () => {
      store.dispatch("resetProduct");
      router.back();
    };

    const addToCart = () => {
      store.dispatch("addItem", { id: product.value._id, amount: 1 });
    };

    return {
      priceNoVat: computed(() => store.getters.product.price * 0.8),
      navBack,
      product,
      addToCart,
    };
  },
};
</script>

<style>
.product-single {
  width: 100%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 5px #00000015;
  margin-top: 3rem;
}

.product-single a:visited {
  color: inherit;
}

.product-single__header {
  display: flex;
}

.product-single__back-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  width: 32px;
}

.product-single__img-wrapper {
  width: 100%;
  height: 30rem;
  border-bottom: 1px solid var(--clr-gray);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.product-single__img-wrapper img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.product-single__title {
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5em;
  padding-bottom: 0.75em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--clr-gray);
}

.product-single__back-button :hover {
  color: var(--clr-primary-desat);
}

.product-single_title-text {
  flex: 1;
  transform: translatex(-32px);
}

.product-single__footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 5px 5px #00000015;
  margin-top: 3rem;
}

.product-single__buy-section {
  display: flex;
  background-color: var(--clr-gray);
  padding: 1.5rem;
  border-radius: 0.5rem;
  gap: 2rem;
}

.product-stock {
  border-left: 1px solid white;
  padding-left: 2rem;
}

.product-stock h3 {
  margin-bottom: 0.2em;
}

.product-stock p {
  font-size: 0.8em;
}

.stock-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-group p {
  flex: 1;
}

.stock-group i {
  font-size: 0.7em;
}

.stock-group.in-stock i {
  color: var(--clr-success);
}

.stock-group.no-stock i {
  color: var(--clr-primary-desat);
}

.product-single__price-wrapper {
  display: flex;
  flex-direction: column;
}

.product-single__price {
  font-weight: bold;
  font-size: 2em;
  color: var(--clr-dark);
  line-height: 2rem;
}

.product-single__price__subtitle {
  font-size: 1em;
  margin-bottom: 1rem;
}

.product-single__button-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.product-single__shop-policy {
  display: flex;
  flex-direction: column;
  border-left: 1px solid white;
  padding-left: 2rem;
}

.product-single__shop-policy .policy-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-single__shop-policy .policy-group i {
  color: var(--clr-success);
}

.product-single__buy-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: bold;
}

.product-single__reviews {
  flex: 1;
  margin-inline: 1rem;
}

.product-single__reviews {
  flex: 1;
  margin-inline: 1rem;
}

.product-single__reviews .avatar {
  background-color: var(--clr-primary-desat);
}

.product-single__reviews span {
  color: white;
}

.product-single__reviews .review-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 0.5rem;
}

.product-single__reviews .stars {
  color: var(--clr-primary-desat);
}

.product-single__reviews .stars .not-filled {
  color: var(--clr-gray);
}

.product-single__reviews .review-date {
  font-size: 0.8rem;
}
</style>
