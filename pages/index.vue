<template>
  <div class="container">
    <section id="hero">
      <div>
        <h1>Hi there!</h1>
        <h2 class="highlight shadow">I'm Spimy</h2>
        <p class="introduction">
          At least that's the username that I've grown quite fond of. My name is actually William and I am
          {{ calculateAge('2003/01/30') }} years old. Coding since 2016 (~{{ calculateAge('2016') }}
          years of experience) and I got into programming for trying to code a
          <NuxtLink href="https://spigotmc.org" target="_blank" rel="external">Spigot plugin</NuxtLink>
          for
          <NuxtLink href="https://minecraft.net" target="_blank" rel="external">Minecraft</NuxtLink>; making Java my
          first programming language.
        </p>
      </div>
      <div class="logo-container">
        <div class="avatar-border"></div>
        <div class="avatar-border"></div>
        <img src="/logos/character.png" alt="spimy's character logo" />
        <div class="avatar-border"></div>
        <div class="avatar-border"></div>
      </div>
    </section>

    <section id="skills">
      <h1 class="highlight">Skills</h1>
      <div class="skills-container">
        <Skills id="skill-tree" />
      </div>
    </section>

    <section id="projects">
      <h1>Latest <br /><span class="highlight">Projects</span></h1>
      <ProjectsList id="projects-list" :perPage="6" :showPaginator="false" />
    </section>
  </div>
</template>

<script lang="ts" setup>
function calculateAge(date: string) {
  const timeDiff = Math.abs(Date.now() - new Date(date).getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
}

// Setup meta for SEO
const title = 'Home';
const description =
  "Homepage of Spimy's portfolio. Spimy is a username and my real name is William. On my portfolio, you will get an overview of my skillsets and past projects.";

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
h1,
h2 {
  margin: 0;
}

#hero {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 6rem);
  gap: 5rem;

  @media (min-width: 50em) {
    flex-direction: row;
  }

  .logo-container {
    position: relative;

    img {
      max-width: 20rem;
      aspect-ratio: 1;
    }

    .avatar-border {
      --border-width: 0.3rem;

      position: absolute;
      border-style: solid;
      border-radius: 5%;
      height: 4rem;
      aspect-ratio: 1;
      border-style: solid;

      &:nth-of-type(1) {
        border-width: var(--border-width) 0 0 var(--border-width);
        top: 0;
        left: 0;
      }

      &:nth-of-type(2) {
        border-width: 0 0 var(--border-width) var(--border-width);
        bottom: 0;
        left: 0;
      }

      &:nth-of-type(3) {
        border-width: var(--border-width) var(--border-width) 0 0;
        top: 0;
        right: 0;
      }

      &:nth-of-type(4) {
        border-width: 0 var(--border-width) var(--border-width) 0;
        bottom: 0;
        right: 0;
      }
    }
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 4rem;
  }

  .introduction {
    max-width: 75ch;
  }
}

#skills {
  #skill-tree {
    display: grid;
    place-items: center;
    background-color: theme(secondary, 1);
    margin: 2rem -6rem;
    margin-top: 0;
  }
}

#projects {
  h1 {
    line-height: 4rem;
  }

  #projects-list {
    margin-block: 1rem;
  }
}
</style>
