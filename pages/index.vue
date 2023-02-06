<template>
  <section id="hero">
    <div class="left">
      <h6>Hi there!</h6>
      <h1 class="highlight shadow">I'm Spimy</h1>
      <p>At least that's the username that I've grown quite fond of. My name is actually William and I am
        {{ calculateAge('2003/01/30') }} years old. Coding since 2016 (~{{ calculateAge('2016') }} years of experience)
        and I got into programming for trying to code a
        <NuxtLink href="https://spigotmc.org" target="_blank" rel="external">Spigot plugin</NuxtLink> for
        <NuxtLink href="https://minecraft.net" target="_blank" rel="external">Minecraft</NuxtLink>; making Java my first
        programming language.
      </p>
    </div>
    <div class="right">
      <div class="logo-container">
        <img src="/logos/character.png" alt="spimy's character logo">
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
    <h1 class="highlight">Projects</h1>
  </section>
</template>

<script lang="ts" setup>
function calculateAge(date: string) {
  const timeDiff = Math.abs(Date.now() - new Date(date).getTime());
  return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
}
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
    &>:first-child:before,
    &>:first-child:after {
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

    &>:first-child:before {
      bottom: 0;
      right: 0;
      border-width: 0 0.3rem 0.3rem 0;
    }

    &>:first-child:after {
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
    background-color: #2e2e2e;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 1rem;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100%;
      background-color: #2e2e2e;
      height: calc((135% + 50vh) / 1.8);
      z-index: -1;
    }

    #skill-tree {
      width: 55%;
      transform: translateY(calc((35% + 50vh) / 12));

      @media screen and (max-width: 900px) {
        width: 100%;
      }
    }
  }
}
</style>