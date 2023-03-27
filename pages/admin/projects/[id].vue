<template>
  <div v-if="project">
    <div class="card">
      <ProjectEditor v-if="edit" :project="project" type="edit" @edited="updatePreview" />
      <div v-else>
        <h1 class="title">{{ project.title }}</h1>
        <p>
          <span class="tag" v-for="technology in project.technologies">{{ technology }}</span>
        </p>

        <NuxtImg :src="project.previewImageUrl" format="webp" />

        <p class="description">{{ project.description }}</p>

        <div class="buttons">
          <button class="btn" @click="edit = true">Edit</button>
          <button class="btn" @click="navigateTo('/admin')">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProject } from '@/server/database/models/projects.model';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// -- Data defintions --
const edit = ref(false);
const route = useRoute();

const { data: project, refresh } = useFetch<IProject>(`/api/project?id=${route.params.id}`);

// -- Methods --
const updatePreview = () => {
  refresh();
  edit.value = false;
};
</script>

<style lang="scss" scoped>
.card {
  font-size: 1rem;
  background-color: var(--secondary-clr);
  width: 100%;
  padding: 3em;
  border-radius: 1em;
  color: var(--secondary-text-clr);
  margin-block: -3rem;

  .title {
    font-size: 2.5em;
    margin-top: 0;
  }

  p {
    white-space: pre-wrap;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: top;
    border-radius: 0.5em;
  }

  .buttons {
    display: flex;
    gap: 1em;

    .btn {
      border-width: 0.2em;
      width: 100%;
      font-weight: bold;
    }
  }

  @media (min-width: 50em) {
    img {
      aspect-ratio: 3/2;
      width: 50%;
    }

    .buttons .btn {
      width: 10em;
    }
  }
}
</style>
