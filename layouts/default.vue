<template>

  <Head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Spimy - {{ getPageName() }}</title>
  </Head>

  <header>
    <Navbar />
  </header>

  <slot />

</template>

<script lang="ts" setup>
function getPageName() {
  const route = useRoute();

  if (route.name === undefined || route.name === null || route.name === "index") {
    return "Home"
  }

  const routeName = route.name.toString();
  return routeName.charAt(0).toUpperCase() + routeName.slice(1);
}
</script>

<style lang="scss" scoped>

</style>