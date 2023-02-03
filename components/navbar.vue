<template>
  <div id="navbar">
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
onMounted(() => show.value = true);
</script>

<style lang="scss" scoped>
@mixin selected-page {
  content: '';
  position: absolute;
  background-color: $dark-text;
  height: 0.15rem;
  right: 0;
  bottom: 0;
  width: 100%;
  transition: 0.3s ease-in-out;
}

#navbar {
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 5rem;

  @media screen and (max-width: 900px) {
    margin: 2rem;
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
    color: inherit;
    position: relative;
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
    color: $dark-text;
    position: relative;

    ::after {
      @include selected-page();
    }
  }
}

.light-mode #right-bar {

  .router-link-active,
  .router-link-exact-active {
    color: $light-text;
  }
}
</style>