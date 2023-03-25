<template>
  <div v-if="data">
    <div v-if="edit" class="card">
      <input type="text" class="title-edit" :value="data.title" />
      <p>
        <span class="tag" v-for="technology in data.technologies">{{ technology }}</span>
      </p>

      <NuxtImg :src="data.previewImageUrl" format="webp" />

      <textarea class="description-edit" :value="data.description" v-autogrow />

      <button class="btn" @click="edit = !edit">Save</button>
    </div>
    <div v-else class="card">
      <h1 class="title">{{ data.title }}</h1>
      <p>
        <span class="tag" v-for="technology in data.technologies">{{ technology }}</span>
      </p>

      <NuxtImg :src="data.previewImageUrl" format="webp" />

      <p class="description">{{ data.description }}</p>

      <button class="btn" @click="edit = !edit">Edit</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// -- Custom Directives --
const vAutogrow = {
  mounted: (element: HTMLTextAreaElement) => {
    element.style.height = `${element.scrollHeight}px`;

    element.addEventListener('input', () => {
      element.style.height = `${element.scrollHeight}px`;
    });
  }
};

// -- Data defintions --
const edit = ref(false);
const route = useRoute();

const { data } = useFetch(`/api/project?id=${route.params.id}`);
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

  input {
    font-weight: bold;
    // Magic numbers
    margin-block: 0.65em;
    margin-inline: -0.05em;
  }

  textarea {
    height: max-content;
    overflow: hidden;
    // Magic numbers
    margin-block: 0.85em;
    margin-inline: -0.1em;
  }

  input,
  textarea {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    background-color: transparent;
    border: none;
    border-bottom: 0 solid var(--primary-clr);
    outline: none;
    transition: all 0.1s ease-in;
    width: 100%;
    resize: none;
    display: block;

    &:focus {
      border-bottom-width: 0.1em;
    }
  }

  .title,
  .title-edit {
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
    border-radius: 1em;
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
}
</style>
