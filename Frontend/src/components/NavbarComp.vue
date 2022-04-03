<template>
  <div>
    <div
      class="dropdown-overlay"
      v-if="activeDropdown"
      @click="swapDropdown(null)"
    ></div>
    <nav class="main-nav-bg">
      <div class="container main-nav">
        <div class="brand-nav-wrap">
          <router-link to="/" class="brand-wrap">
            <i class="fa-solid fa-mobile-button"></i>PHONE$TORE
          </router-link>
          <div class="menu-item-wrap">
            <ul>
              <router-link to="/">
                <li><i class="fa-solid fa-house"></i>Home</li>
              </router-link>
              <router-link to="/store">
                <li><i class="fa-solid fa-store"></i>Store</li>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="customer-actions">
          <div class="user-cart-wrapper">
            <UserCart class="user-cart" @click="swapDropdown(cartDropdown)" />
            <div
              class="cart-dropdown"
              ref="cartDropdown"
              v-show="activeDropdown === cartDropdown"
            >
              <CartList @closeCart="closeCart" />
            </div>
          </div>
          <div class="profile-wrapper" v-if="loggedIn">
            <Avatar
              class="profile-avatar"
              @click="swapDropdown(profileDropdown)"
            />
            <div
              class="profile-dropdown underline"
              ref="profileDropdown"
              v-show="activeDropdown === profileDropdown"
            >
              <router-link class="action-links" to="/profile"
                ><span>MyProfile</span> <i class="fa-solid fa-user"></i>
              </router-link>
              <router-link class="action-links" to="/login" @click="logout"
                ><span>Logout</span> <i class="fa-solid fa-lock"></i>
              </router-link>
            </div>
          </div>
          <router-link to="/login" v-else>
            <button class="btn btn-secondary">
              <i class="fa-solid fa-user"></i>Login
            </button>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import CartList from "../components/cart/CartListComp";
import Avatar from "./user-components/AvatarComp";
import UserCart from "./user-components/UserCartComp";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainNavigation",
  components: {
    Avatar,
    UserCart,
    CartList,
  },
  setup() {
    const store = useStore();
    const activeDropdown = ref(null);
    const cartDropdown = ref(null);
    const profileDropdown = ref(null);

    const swapDropdown = (newDropdown) => {
      //console.log(newDropdown);
      if (!activeDropdown || activeDropdown.value !== newDropdown) {
        activeDropdown.value = newDropdown;
        return;
      }

      activeDropdown.value = null;
    };

    const closeCart = () => (activeDropdown.value = null);

    return {
      activeDropdown,
      cartDropdown,
      profileDropdown,
      swapDropdown,
      closeCart,
      loggedIn: computed(() => store.getters.loggedIn),
      logout: () => {
        store.dispatch("logout");
        store.dispatch("clearOrders");
      },
    };
  },
};
</script>

<style>
.customer-actions button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  font-weight: bold;
}
.user-cart {
  cursor: pointer;
  position: relative;
  z-index: 11;
}

.profile-avatar {
  cursor: pointer;
  position: relative;
  z-index: 11;
}
.main-nav-bg {
  background-color: var(--clr-primary-desat);
  box-shadow: 0px 0px 5px 5px #00000015;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0px;
}

.brand-nav-wrap {
  display: flex;
  align-items: center;
}
.brand-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}

.brand-wrap:hover {
  color: white;
}

.menu-item-wrap ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
}
.menu-item-wrap li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  transition: color 0.15s ease-in-out;
}

.menu-item-wrap li:hover {
  color: var(--clr-dark);
}

.menu-item-wrap i {
  transform: translateY(-1px);
}

.customer-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-cart-wrapper {
  position: relative;
}

.profile-wrapper {
  position: relative;
}

.cart-dropdown {
  position: absolute;
  right: 0.5rem;
  top: 2.5rem;
  min-width: 30rem;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 5px 5px #00000015;
  border-radius: 0.5rem;
  z-index: 11;
}

.profile-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 10rem;
  padding: 1rem;
  right: 0.5rem;
  top: 2.5rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 5px 5px #00000015;
  border-radius: 0.5rem;
  z-index: 11;
}

.underline .action-links:not(:last-child) {
  border-bottom: 1px solid var(--clr-gray);
}

.profile-dropdown .action-links {
  display: flex;
  align-items: center;
  padding-block: 0.5rem;
}

.profile-dropdown .action-links span {
  flex: 1;
}

.profile-dropdown i {
  transform: translatey(-1px);
}

.dropdown-overlay {
  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>
