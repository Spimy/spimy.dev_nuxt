<template>
  <div class="container">
    <h1 class="highlight">Projects</h1>
    <ProjectsList :page="Number(route.query.page)" />
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  window.scrollTo(0, 0);
});
const route = useRoute();

// Setup meta for SEO
const title = 'Projects';
const description =
  'List of projects that I have created including its purpose, technologies used and who I made them with. Personal projects may not be listed.';

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
