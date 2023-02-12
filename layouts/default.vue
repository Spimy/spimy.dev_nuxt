<template>
  <header>
    <Navbar />
  </header>

  <slot />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (page) => (page ? `Spimy - ${page}` : 'Spimy')
});

useServerSeoMeta({
  titleTemplate: (page) => (page ? `Spimy - ${page}` : 'Spimy')
});
</script>

<style lang="scss" scoped></style>
