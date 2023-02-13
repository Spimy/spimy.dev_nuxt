<template>
  <div id="past-projects">
    <div class="card" v-for="project in projects">
      <div class="header">
        <img :src="project.previewImageUrl" />
        <div class="text">
          <NuxtLink rel="external" :href="project.link" target="_blank"
            ><h2>{{ project.title }}</h2>
          </NuxtLink>
          <h4>Technology: {{ getTechnologies(project) }}</h4>
        </div>
      </div>
      <p class="description">{{ project.description }}</p>
    </div>
    <div class="placeholder" v-if="showPlaceholder">
      <h2>No projects have been uploaded for display yet.</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProjects } from '@/server/database/models/projects.model';

const props = defineProps({
  perPage: {
    type: Number,
    default: 9
  }
});

const showPlaceholder = ref(false);
const { data: projects } = useLazyFetch(`/api/projects?perPage=${props.perPage}`);
watch(
  projects,
  (newProjects) => {
    if (newProjects === null || newProjects.length === 0) {
      showPlaceholder.value = true;
    }
  },
  { immediate: true }
);

const getTechnologies = (project: IProjects) => project.technologies.join(', ');
</script>

<style lang="scss" scoped>
#past-projects {
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  margin: 2em 6em;
  place-items: center;
  gap: 1.5em;

  @media screen and (max-width: 900px) {
    margin: 0 2em;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 26em;
    height: 26em;
    position: relative;
    background-color: theme(secondary, 1);
    border-radius: 0.5em;
    filter: drop-shadow(0.2em 0.2em 0.2em #0f0f0f);

    .light-mode & {
      color: theme(color, 1);
      background-color: theme(secondary, 2);
    }

    .header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: inherit;
      height: inherit;
      transition: all $default-animation-time ease-in-out;
      text-align: center;

      img {
        object-fit: cover;
        object-position: top;
        border-radius: 0.5em;
        width: 100%;
        height: 100%;
        transition: all $default-animation-time ease-in-out 0.3s;
      }

      .text {
        display: none;
      }

      a,
      h2 {
        line-height: 1em;
      }

      a,
      h4 {
        margin: 0;
        display: none;
        width: fit-content;
      }
    }

    .description {
      margin-top: -3em;
      padding: 2em;
      opacity: 1;
      display: none;
      transition: height $default-animation-time ease-in-out;
    }

    &:hover {
      .header {
        padding: 2em;
        gap: 1em;
        height: 50%;

        img {
          width: 14em;
          height: 9em;
          align-self: center;
          transition: all $default-animation-time ease-in-out;
        }

        .text {
          display: initial;
        }

        a,
        h4 {
          display: inline;
          -webkit-animation: fadeInFromNone 0.5s ease-in-out;
          -moz-animation: fadeInFromNone 0.5s ease-in-out;
          -o-animation: fadeInFromNone 0.5s ease-in-out;
          animation: fadeInFromNone 0.5s ease-in-out;
        }
      }

      .description {
        opacity: 1;
        display: inline;
        -webkit-animation: fadeInFromNone 0.5s ease-in-out;
        -moz-animation: fadeInFromNone 0.5s ease-in-out;
        -o-animation: fadeInFromNone 0.5s ease-in-out;
        animation: fadeInFromNone 0.5s ease-in-out;
      }
    }
  }

  .placeholder {
    background-color: theme(secondary, 1);
    border-radius: 0.5em;
    padding: 2em;
    width: 100%;
    text-align: center;

    .light-mode & {
      color: theme(color, 1);
      background-color: theme(secondary, 2);
    }
  }
}
</style>
