<template>
  <div>
    <IconsTogglerLight @click="toggleTheme" class="toggler" :class="{ show: colorMode.value === 'light' }" />
    <IconsTogglerDark @click="toggleTheme" class="toggler" :class="{ show: colorMode.value === 'dark' }" />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
}
</script>

<style lang="scss" scoped>
.toggler {
  display: none;
}

.toggler.show {
  display: block;

  -webkit-animation: fadeInFromNone 0.5s ease-in-out;
  -moz-animation: fadeInFromNone 0.5s ease-in-out;
  -o-animation: fadeInFromNone 0.5s ease-in-out;
  animation: fadeInFromNone 0.5s ease-in-out;
}
</style>