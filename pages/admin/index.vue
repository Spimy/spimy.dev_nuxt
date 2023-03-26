<template>
  <main>
    <h1>Admin Dashboard - Projects</h1>
    <div v-if="userData?.role === 'admin' && !!data" class="card">
      <div v-for="project in data.projects" :key="project._id.toString()" class="project-container">
        <h2>{{ project.title }}</h2>
        <NuxtLink :to="`/admin/projects/${project._id}`">Edit</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ProjectsResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const { userData } = useUser();

const { data } = useFetch<ProjectsResponse>('/api/projects');
</script>

<style lang="scss" scoped>
main {
  margin-block: -3rem;

  h1 {
    font-size: 2.5rem;
  }

  .card {
    font-size: 1rem;
    padding: 0.5em 1em;
    background-color: var(--secondary-clr);
    border-radius: 0.5em;

    .project-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2em 1em;
      margin: 1em 0;
      background-color: var(--background-clr);
      color: var(--text-clr);
      border-radius: inherit;

      h2 {
        font-size: 1em;
      }
    }
  }
}
</style>
