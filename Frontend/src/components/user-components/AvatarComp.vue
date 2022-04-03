<template>
  <div class="avatar">
    <span>FN</span>
  </div>
</template>

<script>
export default {
  name: "Avatar",
};
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
}

.avatar span {
  color: var(--clr-primary-desat);
  font-weight: bold;
}
</style>
