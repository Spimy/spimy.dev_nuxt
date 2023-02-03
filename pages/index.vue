<template>
  <section id="hero">
    <div class="left">
      <h6>Hi there!</h6>
      <h1>I'm Spimy</h1>
      <p>At least that's the username that I've grown quite fond of. My name is actually William and I am
        {{ calculateAge() }} years old. Coding since 2016 and I got into programming for trying to code a
        <NuxtLink href="https://spigotmc.org" target="_blank">Spigot plugin</NuxtLink> for
        <NuxtLink href="https://minecraft.net" target="_blank">Minecraft</NuxtLink>!
      </p>
    </div>
    <div class="right">
      <div class="logo-container">
        <img src="/logos/character.png" alt="spimy's character logo">
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
function calculateAge() {
  const birthday = '2003/01/30';
  const timeDiff = Math.abs(Date.now() - new Date(birthday).getTime());
  return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
}
</script>

<style lang="scss" scoped>
#hero {
  font-family: 'Fira Code', monospace;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 6rem;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    margin: 5rem 2rem;
  }

  .left {
    h1 {
      color: $dark-text;
      text-shadow: 0.1rem 0.1rem 0.1rem $light-main;
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
  }

  .right:before,
  .right:after,
  .right>:first-child:before,
  .right>:first-child:after {
    content: ' ';
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-color: $light-main;
    border-style: solid;
    border-radius: 5%;
    margin: -1rem;
  }

  .right:before {
    top: 0;
    left: 0;
    border-width: 0.3rem 0 0 0.3rem;
  }

  .right:after {
    top: 0;
    right: 0;
    border-width: 0.3rem 0.3rem 0 0;
  }

  .right>:first-child:before {
    bottom: 0;
    right: 0;
    border-width: 0 0.3rem 0.3rem 0;
  }

  .right>:first-child:after {
    bottom: 0;
    left: 0;
    border-width: 0 0 0.3rem 0.3rem;
  }
}

.light-mode {
  #hero {
    h1 {
      color: $light-text;
      text-shadow: 0.1rem 0.1rem 0.1rem $dark-main;
    }

    .right:before,
    .right:after,
    .right>:first-child:before,
    .right>:first-child:after {
      border-color: #212121;
    }
  }

}
</style>