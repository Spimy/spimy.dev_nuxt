<template>
  <div class="main">
    <div class="container">
      <div v-for="(skill, index) in skills" :key="index">
        <img :src="skill.src" :alt="`${skill.name} logo`">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const skills = [
  { name: 'html', src: '/skills/html.png' },
  { name: 'css', src: '/skills/css.png' },
  { name: 'scss', src: '/skills/scss.png' },
  { name: 'js', src: '/skills/js.png' },
  { name: 'ts', src: '/skills/ts.png' },
  { name: 'node', src: '/skills/node.png' },
  { name: 'express', src: '/skills/express.png' },
  { name: 'svelte', src: '/skills/svelte.png' },
  { name: 'vue', src: '/skills/vue.png' },
  { name: 'nuxt', src: '/skills/nuxt.png' },
  { name: 'sqlite', src: '/skills/sqlite.png' },
  { name: 'discord', src: '/skills/discord.png' },
  { name: 'mongo', src: '/skills/mongo.png' },
  { name: 'mysql', src: '/skills/mysql.png' },
  { name: 'redis', src: '/skills/redis.png' },
  { name: 'java', src: '/skills/java.png' },
  { name: 'python', src: '/skills/python.png' },
  { name: 'django', src: '/skills/django.png' },
  { name: 'heroku', src: '/skills/heroku.png' },
  { name: 'figma', src: '/skills/figma.png' },
  { name: 'git', src: '/skills/git.png' },
  { name: 'ubuntu', src: '/skills/ubuntu.png' },
  { name: 'adobexd', src: '/skills/adobexd.png' },
  { name: 'photoshop', src: '/skills/photoshop.png' },
  { name: 'nginx', src: '/skills/nginx.png' },
  { name: 'certbot', src: '/skills/certbot.png' }
];
</script>

<style lang="scss" scoped>
// Credit to tileable hexagon CSS:
// https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries
.main {
  display: flex;

  // size
  --s: 6rem;
  // ratio
  --r: 0.85;
  // clip-path
  --h: 0.25;
  --v: 0.5;
  --hc: calc(clamp(0, var(--h), 0.5) * var(--s));
  --vc: calc(clamp(0, var(--v), 0.5) * var(--s) * var(--r));

  // margin
  // vertical
  --mv: 0.2rem;
  // horizontal
  --mh: calc(var(--mv) + (var(--s) - 2*var(--hc))/2);
  // for the float
  --f: calc(2*var(--s)*var(--r) + 4*var(--mv) - 2*var(--vc) - 2px);
}

.container {
  // disable white space between inline block element
  font-size: 0;
  transition: filter $default-animation-time ease-in-out;

  .dark-mode & {
    filter: drop-shadow(0.15rem 0.15rem 0.05rem rgba(0, 0, 0, 0.5));
  }

  .light-mode & {
    filter: drop-shadow(0.15rem 0.15rem 0.05rem rgba(255, 255, 255, 0.5));
  }
}

.container div {
  width: var(--s);
  margin: var(--mv) var(--mh);
  height: calc(var(--s)*var(--r));
  display: inline-block;
  font-size: initial;
  clip-path: polygon(var(--hc) 0, calc(100% - var(--hc)) 0, 100% var(--vc), 100% calc(100% - var(--vc)), calc(100% - var(--hc)) 100%, var(--hc) 100%, 0 calc(100% - var(--vc)), 0 var(--vc));
  margin-bottom: calc(var(--mv) - var(--vc));
  position: relative;

  cursor: pointer;

  .dark-mode & {
    background-color: theme(skillHighlight, 1);
  }

  .light-mode & {
    background-color: theme(skillHighlight, 2);
  }

  transition: background-color $default-animation-time ease-in-out;

  &:hover {
    .dark-mode & {
      color: theme(color, 2);
      background: linear-gradient(150deg, rgba(217, 217, 217, 1) 0%, rgba(148, 148, 148, 1) 100%);
    }

    .light-mode & {
      color: theme(color, 1);
      background: linear-gradient(150deg, rgba(217, 217, 217, 1) 0%, rgba(104, 157, 208, 1) 100%);
    }
  }
}

.container::before {
  content: "";
  width: calc(var(--s)/2 + var(--mh));
  float: left;
  height: 135%;
  shape-outside: repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),
      #000 0 var(--f));
}

img {
  width: 2.5rem;
  height: auto;
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;

  &[alt] {
    font-size: 0.8rem;
    word-wrap: break-word;
  }
}
</style>