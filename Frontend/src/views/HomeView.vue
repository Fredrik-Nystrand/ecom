<template>
  <div>
    <div class="hero">
      <img
        src="https://www.pandasecurity.com/en/mediacenter/src/uploads/2018/05/pandasecurity-buying-cellphone-tips.jpg"
        alt=""
      />
      <div class="home-wrapper container">
        <div class="home card">
          <h1>Welcome to the Phonestore!</h1>
          <button @click="shop" class="btn btn-primary">Start Shopping!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "HomeView",
  components: {},
  setup() {
    const router = useRouter();
    const shop = () => {
      router.push({ name: "store" });
    };
    return {
      shop,
    };
  },
};
</script>

<style>
.home h1 {
  text-align: center;
}

.hero {
  position: relative;
}

.hero img {
  width: 100%;
  height: calc(100vh - 4.5rem);
  object-fit: cover;
}

.home-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
}

.home button {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
