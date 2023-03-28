<template>
  <div class="container">
    <div v-if="error" class="card">
      <div v-if="error.statusCode === 404">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>There's plenty to see in the main portfolio though!</p>
      </div>
      <div v-else>
        <h1>{{ error.statusCode }}</h1>
        <h2>An error occurred</h2>
        <p>{{ error.message }}</p>
      </div>
      <NuxtLink to="/" class="btn">Home page</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NuxtError } from '#app';
const error = useError() as unknown as NuxtError;
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 100vh;
  height: 100svh;
  margin-block: 0;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 10rem 2rem;
    border-radius: 1rem;
    background-color: var(--secondary-clr);
    color: var(--secondary-text-clr);

    h1 {
      font-size: 10rem;
    }

    h2 {
      font-size: 2rem;
    }

    h1,
    h2 {
      line-height: 100%;
      margin: 0;
    }

    .btn {
      font-weight: bold;
    }
  }
}
</style>
