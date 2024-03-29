<template>
  <main class="container">
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
        <NuxtImg src="/logos/character.png" alt="spimy's character logo" format="webp" quality="80" />
        <div class="avatar-border"></div>
        <div class="avatar-border"></div>
      </div>
    </section>

    <section id="skills">
      <h1 class="highlight">Skills</h1>
      <div class="skills-container">
        <div class="texture" />
        <div class="texture" />
        <Skills id="skill-tree" />
        <div class="texture" />
        <div class="texture" />
      </div>
    </section>

    <section id="projects">
      <h1>Latest <br /><span class="highlight">Projects</span></h1>
      <ProjectsList id="projects-list" :perPage="6" :showPaginator="false" />
    </section>
  </main>
</template>

<script lang="ts" setup>
// -- Lifecycle hooks --
onMounted(() => {
  window.scrollTo(0, 0);
});

// -- Methods --
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
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 6rem);
  gap: 5rem;

  @media (min-width: 50em) {
    flex-direction: row;
    justify-content: space-between;
  }

  .logo-container {
    user-select: none;
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
  .skills-container {
    background-color: var(--secondary-clr);
    margin: 2rem -6rem;
    margin-top: 0;
    position: relative;
    isolation: isolate;

    .texture {
      --radius: 8rem;
      background-color: var(--skill-texture-clr);
      position: absolute;
      height: 50%;
      width: var(--radius);
      z-index: -1;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: var(--radius);
        left: 0;
        background-color: inherit;
        border-radius: 50%;
      }

      &:nth-child(even) {
        height: 30%;
        margin-inline: calc(1.5 * var(--radius));
      }

      &:nth-child(-n + 2) {
        left: 0;
        bottom: 0;

        &::after {
          top: calc(-0.5 * var(--radius));
        }
      }

      &:nth-last-child(-n + 2) {
        right: 0;
        top: 0;

        &::after {
          bottom: calc(-0.5 * var(--radius));
        }
      }

      @media (max-width: 40em) {
        &:nth-child(odd) {
          display: none;
        }

        &:nth-child(even) {
          margin-inline: 0;
        }
      }
    }

    #skill-tree {
      display: grid;
      place-items: center;
    }
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
