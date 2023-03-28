<template>
  <div v-if="project">
    <div class="card">
      <ProjectEditor
        v-if="edit"
        :project="project"
        type="edit"
        @saving="handleSaving"
        @saved="updatePreview"
        @error="handleError"
      />
      <div v-else>
        <h1 class="title">{{ project.title }}</h1>
        Link: <NuxtLink rel="external" :to="project.link" target="_blank">{{ project.link }}</NuxtLink>
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
    <Message :message="messageConfig.message" :show="messageConfig.show" :type="messageConfig.type" />
  </div>
</template>

<script lang="ts" setup>
import { IProject } from '@/server/database/models/projects.model';
import { ProjectResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// -- Data defintions --
const edit = ref(false);
const route = useRoute();
const { data: project, refresh } = useFetch<IProject>(`/api/project?id=${route.params.id}`);

// -- Handlers --
const { messageConfig, showMessage } = new MessageHandler();

// -- Methods --
const updatePreview = (response?: ProjectResponse) => {
  refresh();
  edit.value = false;
  if (response) showMessage(response.message, 'success', 3);
};

const handleSaving = () => showMessage(`Saving changes made to '${project.value?.title}'...`, 'inprogress');

const handleError = (response?: Omit<ProjectResponse, 'project'>) => {
  if (response) showMessage(response.message, 'error', 3);
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
