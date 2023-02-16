<template>
  <div class="container">
    <h1 class="highlight">Projects</h1>
    <ProjectsList :page="Number(route.query.page)" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

// Setup meta for SEO
const title = 'Projects';
const description =
  'View the list of projects that Spimy has created. The projects displayed contains the technologies used, why it was made and also mentions anyone that Spimy has collaborated with on said project. Some private or personal projects may not be displayed in this list which includes this portfolio site.';

useHead({
  title
});

useServerSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${useRoute().fullPath}`,
  twitterTitle: title,
  twitterDescription: description
});
</script>

<style lang="scss" scoped>
.container {
  margin: 6rem 0;

  h1 {
    font-size: 4rem;
    margin: 0 6rem;

    @media screen and (max-width: 900px) {
      margin: 0 2rem;
    }
  }
}
</style>
