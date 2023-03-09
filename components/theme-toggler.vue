<template>
  <div id="toggler">
    <IconsTogglerLight
      tabindex="0"
      @keyup.enter="toggleTheme"
      @click="toggleTheme"
      class="icon"
      :class="{ show: colorMode.value === 'light' }"
    />
    <IconsTogglerDark
      tabindex="0"
      @keyup.enter="toggleTheme"
      @click="toggleTheme"
      class="icon"
      :class="{ show: colorMode.value === 'dark' }"
    />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
}
</script>

<style lang="scss" scoped>
#toggler {
  position: relative;

  .icon {
    inset: 50%;
    position: absolute;
    opacity: 0;
    transform: translate(-50%, -50%);

    &.show {
      opacity: 1;
    }
  }
}
</style>
