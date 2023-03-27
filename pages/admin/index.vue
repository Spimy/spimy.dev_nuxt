<template>
  <main>
    <h1>Admin Dashboard - Projects</h1>
    <div v-if="userData?.role === 'admin' && !!data" class="card">
      <div v-for="project in data.projects" :key="project._id.toString()" class="project-container">
        <h2>{{ project.title }}</h2>
        <div class="actions">
          <NuxtLink :to="`/admin/projects/${project._id}`">Edit</NuxtLink>
          <button class="delete-btn" @click="deleteProject(project._id)">Delete</button>
        </div>
      </div>
      <NuxtLink to="/admin/projects" class="btn">Add new project</NuxtLink>
      <button class="btn logout" @click="logout">Logout</button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch';
import { ProjectsResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

const { userData } = useUser();

const { data, refresh } = useFetch<ProjectsResponse>('/api/projects');

const deleteProject = async (projectId: string) => {
  await useAuthFetch<{ message: string }>(
    '/api/project',
    {
      method: 'DELETE',
      body: { id: projectId }
    },
    false
  )
    .then((response) => {
      if (response.status !== 200) return console.log('error', response._data?.message);
      console.log(response._data?.message);
      refresh();
    })
    .catch((error: FetchError) => console.log(error.response?._data.message));
};
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

      .actions {
        display: flex;
        gap: 1em;

        .delete-btn {
          background: none;
          border: none;
          color: red;
          font-size: 1em;
          font-family: 'Fira Code', monospace;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .btn {
      text-align: center;
      display: block;
      font-weight: bold;
      border-radius: inherit;
      margin-bottom: 1em;
      width: 100%;

      &.logout {
        border-color: red;
        color: red;
        font-size: inherit;

        &:hover {
          color: var(--secondary-text-clr);
          background-color: red;
        }
      }
    }
  }
}
</style>
