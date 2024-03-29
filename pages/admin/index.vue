<template>
  <main>
    <h1>Admin Dashboard - Projects</h1>
    <div v-if="userData?.role === 'admin' && !!data" class="card">
      <TransitionGroup name="list">
        <div v-for="(project, index) in data.projects" :key="project._id.toString()" class="project-container">
          <h2>
            {{ index + 1 }}. {{ project.title }}
            <span>
              (Added: {{ new Date(project.createdAt).toUTCString() }} | Updated:
              {{ project.updatedAt ? new Date(project.updatedAt).toUTCString() : 'Never' }})
            </span>
          </h2>
          <div class="actions">
            <NuxtLink :to="`/admin/projects/${project._id}`">Edit</NuxtLink>
            <button class="delete-btn" @click="deleteProject(project._id)">Delete</button>
          </div>
        </div>
      </TransitionGroup>
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

// -- Data definitions --
const { userData } = useUser();
const { data, refresh } = useFetch<ProjectsResponse>('/api/projects');

// -- Methods --
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

// Setup meta for SEO
const title = "Spimy's Portfolio - Admin";
const description = 'Login to admin dashboard to add, edit and remove projects displayed in the portfolio.';

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
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10rem);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  width: 100%;
  position: absolute;
}

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
    position: relative;

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

        & > span {
          color: var(--primary-clr);
          font-size: 0.7em;
        }
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
