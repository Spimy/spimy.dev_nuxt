<template>
  <div id="navbar" :class="{ scrolled: scrollPosition > 50 }">
    <NuxtLink href="/"><NuxtImg class="logo" src="/logos/icon.png" alt="icon logo" format="webp" /></NuxtLink>
    <div class="util-bar">
      <div class="icons">
        <LazyThemeToggler class="toggler" v-if="showThemeSelector" />
        <IconsBurger
          tabindex="0"
          class="burger-menu"
          @keyup.enter="toggleMobileNav"
          @click="toggleMobileNav"
          :scrolled="scrollPosition > 50"
        />
      </div>
      <nav :class="{ mobileShow: showNavBar === true, scrolled: scrollPosition > 50 }">
        <ul>
          <li><NuxtLink href="/">Home</NuxtLink></li>
          <li><NuxtLink href="/projects">Past Projects</NuxtLink></li>
          <li><NuxtLink href="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
// -- Lifecycle hooks --
onMounted(() => {
  showThemeSelector.value = true;
  window.addEventListener('scroll', updateScroll);
});

// -- Data defintions --
const showNavBar = ref(false);
const showThemeSelector = ref(false);
const scrollPosition = ref(0);

// -- Methods --
const updateScroll = () => {
  scrollPosition.value = window.scrollY;
};

const toggleMobileNav = () => {
  showNavBar.value = !showNavBar.value;
};
</script>

<style lang="scss" scoped>
@mixin selected-page {
  content: '';
  position: absolute;
  height: 0.15rem;
  right: 0;
  bottom: 0;
  width: 100%;
  transition: width var(--default-animation-time) ease-in-out, left var(--default-animation-time) ease-in-out;
  background-color: var(--primary-clr);
}

ul {
  list-style: none;
}

#navbar {
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  transition: background-color var(--default-animation-time) ease-in-out;

  &.scrolled {
    background-color: var(--secondary-clr);
    color: var(--secondary-text-clr);
  }

  @media (min-width: 50em) {
    padding: 1rem 6rem;
  }

  .logo {
    max-width: 3rem;
    height: auto;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .burger-menu {
      width: 2rem;
      height: 2rem;
      cursor: pointer;

      @media (min-width: 50em) {
        display: none;
      }
    }
  }

  .util-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  nav {
    background-color: var(--background-clr);
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    position: absolute;
    top: -150%;
    left: 0;
    right: 0;
    gap: 1rem;
    z-index: -1;
    transform: scaleY(0);

    li {
      margin-block: 0.7rem;
    }

    &.mobileShow {
      top: 50%;
      transform: scaleY(100%);

      &.scrolled {
        background-color: var(--secondary-clr);
      }
    }

    @media (min-width: 50em) {
      position: static;
      transform: scaleY(100%);
      z-index: 1;
      background-color: transparent;

      ul {
        display: flex;
        gap: 2rem;
      }

      li {
        margin-block: 0;
      }
    }

    a {
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
}
</style>
