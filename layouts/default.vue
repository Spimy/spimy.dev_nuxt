<template>
  <header>
    <Navbar />
  </header>

  <slot />

  <footer>
    <div class="link-container">
      <NuxtLink rel="external" href="https://youtube.com/@OfficialSpimy" target="_blank">
        <FontAwesomeIcon icon="fa-brands fa-youtube" />
      </NuxtLink>
      <NuxtLink rel="external" href="https://twitter.com/OfficialSpimy" target="_blank">
        <FontAwesomeIcon icon="fa-brands fa-twitter" />
      </NuxtLink>
      <NuxtLink rel="external" href="https://instagram.com/william3001_lhw" target="_blank">
        <FontAwesomeIcon icon="fa-brands fa-instagram" />
      </NuxtLink>
      <NuxtLink rel="external" href="https://github.com/Spimy" target="_blank">
        <FontAwesomeIcon icon="fa-brands fa-github" />
      </NuxtLink>
    </div>
    <h3>Copyright &#169 2023 Spimy - All Rights Reserved.</h3>
  </footer>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (page) => (page ? `Spimy's Portfolio - ${page}` : 'Spimy\'s Portfolio')
});

useServerSeoMeta({
  titleTemplate: (page) => (page ? `Spimy's Portfolio - ${page}` : 'Spimy\'s Portfolio')
});
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  padding: 2rem 6rem;

  @media screen and (max-width: 900px) {
    padding: 2rem;
  }

  .link-container {
    display: flex;
    gap: 0.5em;

    a {
      color: theme(color, 1);

      &:hover {
        color: theme(accentColor, 1);
      }

      .light-mode & {
        color: theme(color, 2);

        &:hover {
          color: theme(accentColor, 2);
        }
      }
    }
  }

  h3 {
    font-size: 0.4em;
  }
}
</style>
