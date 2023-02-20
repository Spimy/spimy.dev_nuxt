<template>
  <div id="navbar" :class="{ scrolled: scrollPosition > 50 }">
    <NuxtLink href="/"><img id="icon" src="/logos/icon.png" alt="icon logo" /></NuxtLink>
    <div id="right-bar">
      <LazyThemeToggler id="toggler" v-if="showThemeSelector" />
      <IconsBurger id="burger-menu" @click="toggleMobileNav" :scrolled="scrollPosition > 50" />
      <nav :class="{ mobileShow: showNavBar === true }">
        <NuxtLink href="/">Home</NuxtLink>
        <NuxtLink href="/projects">Past Projects</NuxtLink>
        <NuxtLink href="/contact">Contact</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
const showNavBar = ref(false);
const showThemeSelector = ref(false);
const scrollPosition = ref(0);

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

const toggleMobileNav = () => {
  showNavBar.value = !showNavBar.value;
};

onMounted(() => {
  showThemeSelector.value = true;
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
  margin-bottom: 1rem;
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
    background-color: theme(secondary, 1);

    .light-mode & {
      background-color: theme(secondary, 2);
      color: theme(color, 1);
    }
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

    .scrolled & {
      fill: theme(color, 1);
    }

    @media screen and (max-width: 900px) {
      display: block;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }

  nav {
    @media screen and (max-width: 900px) {
      position: fixed;
      flex-direction: column;
      display: flex;
      gap: 0.5rem;
      opacity: 0;
      top: -10%;
      padding: 2rem;
      left: 0;
      width: 100%;
      z-index: -1;
      background-color: theme(backgroundColor, 1);
      transition: all $default-animation-time ease-in-out;

      .light-mode & {
        background-color: theme(backgroundColor, 2);
      }

      a {
        padding: 0;
        margin: 0;
      }

      &.mobileShow {
        opacity: 1;
        top: 3rem;

        .scrolled & {
          background-color: theme(secondary, 1);

          .light-mode & {
            background-color: theme(secondary, 2);
          }
        }
      }
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
