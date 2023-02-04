<template>
  <div id="navbar" :class="{ scrolled: scrollPosition > 50 }">
    <NuxtLink href="/"><img id="icon" src="/logos/icon.png" alt="icon logo" /></NuxtLink>
    <div id="right-bar">
      <LazyThemeToggler id="toggler" v-if="show" />
      <IconsBurger id="burger-menu" />
      <nav>
        <NuxtLink href="/">Home</NuxtLink>
        <NuxtLink href="/projects">Past Projects</NuxtLink>
        <NuxtLink href="/contact">Contact</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
const show = ref(false);
const scrollPosition = ref(0);

function updateScroll() {
  scrollPosition.value = window.scrollY;
}

onMounted(() => {
  show.value = true
  window.addEventListener('scroll', updateScroll);
});
</script>

<style lang="scss" scoped>
@mixin selected-page {
  content: '';
  position: absolute;
  height: 0.15rem;
  right: 0;
  bottom: 0;
  width: 100%;
  transition: width $default-animation-time ease-in-out, left $default-animation-time ease-in-out;

  .dark-mode & {
    background-color: theme(accentColor, 1);
  }

  .light-mode & {
    background-color: theme(accentColor, 2);
  }
}

#navbar {
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5rem;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
  transition: background-color $default-animation-time ease-in-out;

  @media screen and (max-width: 900px) {
    padding: 1rem 2rem;
  }

  &.scrolled {
    background-color: #2f2f2f;
  }
}

#icon {
  width: 3rem;
  height: auto;
}

#right-bar {
  display: flex;
  position: relative;

  #toggler {
    margin: 0.3rem 0;

    @media screen and (max-width: 900px) {
      margin: 0.3rem 2rem;
    }
  }

  #burger-menu {
    display: none;

    @media screen and (max-width: 900px) {
      display: block;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }

  }

  nav {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  a {
    margin-left: 2em;
    text-decoration: none;
    position: relative;
  }

  a:not(.router-link-active, .router-link-exact-active) {
    color: inherit !important;
  }

  a::after {
    @include selected-page();
    left: 0;
  }

  a:not(.router-link-active, .router-link-exact-active)::after {
    width: 0;
    left: 50%;
  }

  a:hover::after {
    width: 100%;
    left: 0;
  }

  .router-link-active,
  .router-link-exact-active {
    position: relative;

    ::after {
      @include selected-page();
    }
  }
}
</style>