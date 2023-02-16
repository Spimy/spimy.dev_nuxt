<template>
  <section id="hero">
    <div class="left">
      <h6>Hi there!</h6>
      <h1 class="highlight shadow">I'm Spimy</h1>
      <p>
        At least that's the username that I've grown quite fond of. My name is actually William and I am
        {{ calculateAge('2003/01/30') }} years old. Coding since 2016 (~{{ calculateAge('2016') }}
        years of experience) and I got into programming for trying to code a
        <NuxtLink href="https://spigotmc.org" target="_blank" rel="external">Spigot plugin</NuxtLink>
        for
        <NuxtLink href="https://minecraft.net" target="_blank" rel="external">Minecraft</NuxtLink>; making Java my first
        programming language.
      </p>
    </div>
    <div class="right">
      <div class="logo-container">
        <img src="/logos/character.png" alt="spimy's character logo" />
      </div>
    </div>
  </section>

  <section id="skills">
    <h1 class="highlight">Skills</h1>
    <div class="skills-container">
      <Skills id="skill-tree" />
    </div>
  </section>

  <section id="projects">
    <h1>Latest</h1>
    <h1 class="highlight">Projects</h1>
    <ProjectsList :perPage="6" :showPaginator="false" @hasProjects="showMoreBtn = true" />

    <div v-if="showMoreBtn" class="button-container">
      <NuxtLink rel="next" href="/projects" class="btn">View More</NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
const showMoreBtn = ref(false);

function calculateAge(date: string) {
  const timeDiff = Math.abs(Date.now() - new Date(date).getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
}

// Setup meta for SEO
const title = 'Home';
const description = "Homepage of Spimy's portfolio. Get an overview of Spimy's skillsets and past projects.";

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
h1 {
  margin: 0 6rem;
  font-weight: 600;

  @media screen and (max-width: 900px) {
    margin: 0 2rem;
  }
}

#hero {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 6rem;
  height: 100vh;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    justify-content: center;
    margin: 0 2rem;
  }

  .left {
    h1 {
      margin: revert;
    }

    h1,
    h6 {
      line-height: 0;
    }

    p {
      font-size: 1rem;
      max-width: 75ch;
    }
  }

  .right {
    position: relative;

    img {
      width: 20rem;
      height: auto;
    }

    &::before,
    &::after,
    & > :first-child:before,
    & > :first-child:after {
      content: ' ';
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-style: solid;
      border-radius: 5%;
    }

    &::before {
      top: 0;
      left: 0;
      border-width: 0.3rem 0 0 0.3rem;
    }

    &::after {
      top: 0;
      right: 0;
      border-width: 0.3rem 0.3rem 0 0;
    }

    & > :first-child:before {
      bottom: 0;
      right: 0;
      border-width: 0 0.3rem 0.3rem 0;
    }

    & > :first-child:after {
      bottom: 0;
      left: 0;
      border-width: 0 0 0.3rem 0.3rem;
    }
  }
}

#skills {
  margin-bottom: 15rem;

  .skills-container {
    width: 100%;
    transition: background-color $default-animation-time ease-in-out;

    .dark-mode & {
      background-color: theme(secondary, 1);
    }

    .light-mode & {
      background-color: theme(secondary, 2);
    }

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 1rem;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      background-color: inherit;
      height: calc((135% + 50vh) / 1.8);
      z-index: -1;
      transition: background-color $default-animation-time ease-in-out;
    }

    #skill-tree {
      width: 55%;
      transform: translateY(calc((35% + 50vh) / 9));

      @media screen and (max-width: 900px) {
        transform: translateY(calc((35% + 50vh) / 30));
        width: 100%;
      }
    }
  }
}

#projects {
  margin-bottom: 5rem;

  h1 {
    line-height: 100%;
  }

  .button-container {
    display: flex;
    justify-content: center;

    .btn {
      text-decoration: none;
      font-size: 1rem;
      padding: 1rem 3rem;
      border: 0.1em solid theme(accentColor, 1);
      border-radius: 0.2em;
      transition: all $default-animation-time ease-in-out;

      &:hover {
        color: theme(color, 1);
        background-color: theme(accentColor, 1);
      }

      .light-mode & {
        border: 0.1em solid theme(accentColor, 2);

        &:hover {
          color: theme(color, 1);
          background-color: theme(accentColor, 2);
        }
      }
    }
  }
}
</style>
