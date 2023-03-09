<template>
  <div>
    <div v-if="!showPlaceholder" id="past-projects">
      <div class="card" v-for="project in data?.projects">
        <img class="preview" :src="project.previewImageUrl" />
        <div class="header">
          <NuxtLink class="title" rel="external" :href="project.link" target="_blank">{{ project.title }} </NuxtLink>
          <p class="technologies">
            Technology:
            <span class="tag" v-for="technology in project.technologies">{{ technology }}</span>
          </p>
        </div>
        <p class="description">{{ project.description }}</p>
      </div>
    </div>

    <div v-if="showPlaceholder" id="placeholder">
      <h2 v-if="pending">Projects are currently being fetched...</h2>
      <h2 v-else>No projects have been uploaded for display yet.</h2>
    </div>

    <div id="more-container">
      <div id="paginator" v-if="showPaginator && data !== null && data.paginate.pageCount > 1">
        <NuxtLink
          class="pagination-item prev"
          :class="{ disable: data.paginate.currentPage === 1 }"
          @click="refresh"
          :href="`?page=${data.paginate.currentPage === 1 ? 1 : data.paginate.currentPage - 1}`"
        >
          <FontAwesomeIcon icon="fa-solid fa-angle-left" />
        </NuxtLink>

        <NuxtLink
          v-for="(_, index) in data.paginate.pageRange"
          class="pagination-item"
          :class="{ current: index + data.paginate.pageMin === data.paginate.currentPage }"
          @click="refresh"
          :href="`?page=${index + data.paginate.pageMin}`"
        >
          {{ index + data.paginate.pageMin }}
        </NuxtLink>

        <NuxtLink
          class="pagination-item next"
          :class="{ disable: data.paginate.currentPage === data.paginate.pageCount }"
          @click="refresh"
          :href="`?page=${
            data.paginate.currentPage === data.paginate.pageCount
              ? data.paginate.pageCount
              : data.paginate.currentPage + 1
          }`"
        >
          <FontAwesomeIcon icon="fa-solid fa-angle-right" />
        </NuxtLink>
      </div>

      <div v-if="!showPaginator && hasProjects" id="more-btn">
        <NuxtLink rel="next" href="/projects" class="btn">View More</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  perPage: {
    type: Number,
    default: 9
  },
  showPaginator: {
    type: Boolean,
    default: true
  },
  page: {
    type: Number,
    default: 1
  }
});

const hasProjects = ref(false);
const showPlaceholder = ref(false);

let { pending, data, refresh } = useLazyFetch(() => `/api/projects?perPage=${props.perPage}&page=${props.page || 1}`);
watch(
  data,
  (newProjects) => {
    if (newProjects === null || newProjects.projects.length === 0) {
      hasProjects.value = false;
      showPlaceholder.value = true;
    } else {
      hasProjects.value = true;
      showPlaceholder.value = false;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
#past-projects {
  --animation-delay: 0.15s;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 2rem;

  .card {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 2rem;
    border-radius: 0.3em;
    color: var(--secondary-text-clr);
    background-color: var(--secondary-clr);
    overflow: hidden;
    position: relative;
    isolation: isolate;
    aspect-ratio: 1;

    .preview {
      user-select: none;
      position: absolute;
      inset: 0 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      border-radius: inherit;
      transition: all var(--default-animation-time) ease-in-out;
      transition-delay: var(--animation-delay);
    }

    .header {
      margin-left: 60%;
      transform: translateX(10%);
      flex: 0.5;

      .title {
        font-size: clamp(1.25rem, 1.2175rem + 0.137vw, 1.875rem);
        font-weight: bold;
        display: inline-block;
      }

      .technologies {
        font-size: clamp(0.75rem, 0.724rem + 0.1096vw, 1.25rem);
        margin: 0;
      }
    }

    .description {
      font-size: clamp(0.875rem, 0.8555rem + 0.0822vw, 1.25rem);
      transform: translateY(10%);
      max-width: 75ch;
    }

    .header,
    .description {
      opacity: 0;
      transition: all var(--default-animation-time) ease-in-out;
      transition-delay: 0s;
    }

    &:hover,
    &:focus-within {
      .preview {
        z-index: -1;
        height: 60%;
        transform: scale(50%) translate(-40%, -30%);
        transition-delay: 0s;
      }

      .header,
      .description {
        opacity: 1;
        transform: translate(0, 0);
        transition-delay: var(--animation-delay);
      }
    }
  }
}

#placeholder {
  background-color: var(--secondary-clr);
  padding: 1.5em;
  border-radius: 0.5rem;
  text-align: center;

  h2 {
    font-size: 1.2rem;
  }
}

#more-container {
  display: flex;
  justify-content: center;
  align-items: center;

  #paginator {
    display: flex;
    gap: 1rem;

    .pagination-item {
      cursor: pointer;
      font-size: 1rem;
      background-color: var(--secondary-clr);
      border-radius: 0.2rem;
      text-align: center;
      text-decoration: none;
      padding: 1rem;
      transition: background-color var(--default-animation-time) ease-in-out;
      color: var(--text-clr);

      &.disable {
        color: grey;
      }

      &.current,
      &:hover:not(.disable),
      &:focus:not(.disable) {
        background-color: var(--primary-clr);
      }
    }
  }

  #more-btn {
    margin-block: 2rem;
  }
}
</style>
