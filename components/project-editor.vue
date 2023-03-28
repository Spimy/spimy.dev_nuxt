<template>
  <form class="project-editor">
    <input type="text" class="title" v-model="projectInfo.title" placeholder="Project Title..." />
    <input type="text" class="link" v-model="projectInfo.link" placeholder="Project Link..." />

    <TagInput :tags="projectInfo.technologies" />

    <div class="image">
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

    <textarea class="description" v-model="projectInfo.description" placeholder="Project Description..." v-autogrow />

    <div class="buttons">
      <button type="submit" class="btn" @click.prevent="save">Save</button>
      <button class="btn" @click.prevent="handleBackButton">Back</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { FetchError } from 'ofetch';
import { IProject } from '@/server/database/models/projects.model';
import { ProjectResponse } from '@/utils/types/responses';

const props = defineProps<{
  project?: IProject;
  type: 'edit' | 'add';
}>();
const emit = defineEmits<{
  (event: 'saving', projectTitle: string): void;
  (event: 'saved', response?: ProjectResponse): void;
  (event: 'error', response?: Omit<ProjectResponse, 'project'>): void;
}>();

// -- Custom Directives --
const vAutogrow = {
  mounted: (element: HTMLTextAreaElement) => {
    const INITIAL_EMPTY_HEIGHT = 38;
    let previousHeight = element.scrollHeight || INITIAL_EMPTY_HEIGHT;

    element.style.height = `${previousHeight}px`;

    element.addEventListener('input', () => {
      if (element.scrollHeight > previousHeight) {
        previousHeight = element.scrollHeight;
        element.style.height = `${element.scrollHeight}px`;
      }

      if (element.value.length === 0) {
        previousHeight = INITIAL_EMPTY_HEIGHT;
        element.style.height = `${previousHeight}px`;
      }
    });
  }
};

// -- Data declarations --
const previewImageUrl = ref(props.project?.previewImageUrl || 'empty');
const projectInfo = reactive({
  _id: props.project?._id || '',
  title: props.project?.title || '',
  link: props.project?.link || '',
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

  emit('saving', projectInfo.title);
  await useAuthFetch<ProjectResponse>(
    '/api/project',
    {
      method: props.type === 'edit' ? 'PUT' : 'POST',
      body: formData
    },
    false
  )
    .then((response) => {
      if (response.status !== 200) return emit('error', response._data);
      return emit('saved', response._data);
    })
    .catch((error: FetchError) => emit('error', error.response?._data));
};

const handleBackButton = () => {
  if (props.type === 'edit') return emit('saved'); // this is to set 'edit' to false in the admin/projects/[id] page
  else navigateTo('/admin');
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
  overflow: hidden;
  margin-block: 1em;
  margin-inline: -0.1em;
}

input,
textarea {
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  border-bottom: 0.15rem solid var(--secondary-text-clr);
  border-radius: 0.2em;
  outline: none;
  transition: all 0.1s ease-in;
  width: 100%;
  resize: none;
  display: block;

  &:focus {
    border-bottom-color: var(--primary-clr);
  }
}

.title {
  font-size: 2.5em;
}

.link {
  color: var(--primary-clr);
  font-size: 1em;
  margin-bottom: 1em;

  &::placeholder {
    color: var(--secondary-text-clr);
  }
}

.title,
.link {
  margin-top: 0;
}

.image {
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

    // For when there's no image in preview to center the alt text
    background-color: var(--primary-clr);
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 50em) {
      aspect-ratio: 3/2;
    }
  }

  @media (max-width: 50em) {
    flex-direction: column;
  }
}

.buttons {
  display: flex;
  gap: 1em;

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
}
</style>
