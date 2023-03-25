<template>
  <main>
    <h1>Admin Dashboard</h1>
    <div v-if="userData.role === 'admin' && data">
      <div v-for="project in data.projects" :key="project._id.toString()">
        <NuxtLink :to="`/admin/projects/${project._id}`">
          {{ project.title }}
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const { userData } = useUser();

const { data } = useFetch('/api/projects');
</script>

<style lang="scss" scoped></style>
