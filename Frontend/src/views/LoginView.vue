<template>
  <div class="login-wrapper container">
    <div class="login-box card">
      <h1>Login</h1>
      <form class="login__form form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
            class="input"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <input class="checkbox" type="checkbox" id="remember" />
            <label for="remember">Remember me</label>
          </div>
          <a href="#">Forgot password?</a>
        </div>
        <button class="btn btn-primary">Sign In</button>
      </form>
      <div class="sign-up-link">
        Not a member yet?
        <router-link to="/register">Register Now!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "LoginView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      if (email.value.trim() === "" || password.value.trim() === "") {
        return;
      }
      const user = {
        email: email.value,
        password: password.value,
      };

      const newUser = await store.dispatch("login", user);

      if (newUser) {
        store.dispatch("getOrders", store.getters.getToken);
        if (route.query.redirect) {
          router.push(route.query.redirect);
        } else {
          router.push({ name: "home" });
        }
      }
    };
    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style>
.login-wrapper {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 30rem;
}

.login-box h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.sign-up-link {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.sign-up-link a {
  color: var(--clr-primary-desat);
  font-weight: bold;
}

.sign-up-link a:hover {
  color: var(--clr-dark);
  text-decoration: underline;
}
</style>
