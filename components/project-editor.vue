<template>
  <form class="project-editor">
    <input type="text" class="title-edit" v-model="projectInfo.title" placeholder="Project Title..." />

    <TagInput :tags="projectInfo.technologies" />

    <div class="image-edit">
      <NuxtImg :src="previewImageUrl" alt="Project Preview" format="webp" />
      <Dropzone
        @change="
          (newPreview) => {
            previewImageUrl = newPreview.previewUrl;
            projectInfo.previewImage = newPreview.file;
          }
        "
      />
    </div>

    <textarea
      class="description-edit"
      v-model="projectInfo.description"
      placeholder="Project Description..."
      v-autogrow
    />

    <button type="submit" class="btn" @click.prevent="save">Save</button>
  </form>
</template>

<script lang="ts" setup>
import { IProject } from '@/server/database/models/projects.model';

const props = defineProps<{
  project?: IProject;
  type: 'edit' | 'add';
}>();
const emit = defineEmits(['saved']);

// -- Custom Directives --
const vAutogrow = {
  mounted: (element: HTMLTextAreaElement) => {
    element.addEventListener('input', () => {
      element.style.height = `${element.scrollHeight}px`;
    });
  }
};

// -- Data declarations --
const previewImageUrl = ref(props.project?.previewImageUrl || '');
const projectInfo = reactive({
  _id: props.project?._id || '',
  title: props.project?.title || '',
  technologies: props.project?.technologies || ([] as string[]),
  previewImage: null as File | null,
  description: props.project?.description || ''
});

// -- Methods --
const save = async () => {
  // Convert project info from json to formdata
  const formData = new FormData();
  for (const [key, value] of Object.entries(projectInfo)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      continue;
    }
    formData.append(key, value);
  }

  await useAuthFetch(
    '/api/project',
    {
      method: 'PUT',
      body: formData
    },
    false
  ).then(() => emit('saved'));
};
</script>

<style lang="scss" scoped>
input {
  font-weight: bold;
  margin-block: 0.5em;
  margin-inline: -0.05em;
}

textarea {
  height: max-content;
  margin-block: 1em;
  margin-inline: -0.1em;
}

input,
textarea {
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 0.15rem solid var(--secondary-text-clr);
  outline: none;
  transition: all 0.1s ease-in;
  width: 100%;
  resize: none;
  display: block;

  &:focus {
    border-bottom-color: var(--primary-clr);
  }
}

.title-edit {
  font-size: 2.5em;
  margin-top: 0;
}

.image-edit {
  display: flex;
  gap: 1em;
  margin-block: 1em;
  height: 100%;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: top;
    border-radius: 0.5em;

    @media (min-width: 50em) {
      aspect-ratio: 3/2;
    }
  }

  @media (max-width: 50em) {
    flex-direction: column;
  }
}

.btn {
  border-width: 0.2em;
  width: 100%;
  font-weight: bold;
}

@media (min-width: 50em) {
  img {
    aspect-ratio: 3/2;
    width: 50%;
  }

  .btn {
    width: 10em;
  }
}
</style>
