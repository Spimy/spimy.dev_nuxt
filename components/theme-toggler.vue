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

// Fade in animation keyframes
@-webkit-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@-moz-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@-o-keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

@keyframes fadeInFromNone {
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: block;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}
</style>