<template>
  <div class="register-wrapper container">
    <div class="register-box card">
      <h1>register</h1>
      <form class="register__form form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <input class="input" type="text" placeholder="Name" v-model="name" />
        </div>
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
        <div class="form-group">
          <input
            class="input"
            type="password"
            placeholder="Confirm Password"
            v-model="password2"
          />
        </div>
        <button class="btn btn-primary">Sign Up</button>
      </form>
      <div class="sign-in-link">
        Already a member?
        <router-link to="/login">Login Now!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "RegisterView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const password2 = ref("");

    const handleSubmit = async () => {
      if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        password2.value.trim() === ""
      ) {
        return;
      }

      if (password.value !== password2.value) {
        return;
      }

      const user = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      const newUser = await store.dispatch("register", user);

      if (newUser) {
        router.push({ name: "home" });
      }
    };
    return {
      name,
      email,
      password,
      password2,
      handleSubmit,
    };
  },
};
</script>

<style>
.register-wrapper {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-box {
  width: 30rem;
}

.register-box h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.sign-in-link {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.sign-in-link a {
  color: var(--clr-primary-desat);
  font-weight: bold;
}

.sign-in-link a:hover {
  color: var(--clr-dark);
  text-decoration: underline;
}
</style>
