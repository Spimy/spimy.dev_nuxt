<template>
  <div class="main">
    <div class="hexGrid">
      <div
        v-for="(skillArr, index) in chunk(skills, 3) as SkillsList[][]"
        :key="index"
        :class="index % 2 === 0 ? 'hexGridA' : 'hexGridB'"
      >
        <div v-for="(skill, i) in skillArr" :key="i" class="hex">
          <img :src="skill.src" :alt="`${skill.name} logo`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SkillsList {
  name: string;
  src: string;
}

const skills: SkillsList[] = [
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

function chunk(array: SkillsList[], size: number): SkillsList[][] | SkillsList[] {
  if (!array) return [];
  const firstChunk = array.slice(0, size);
  if (!firstChunk.length) return array;
  return [firstChunk].concat(chunk(array.slice(size, array.length), size));
}
</script>

<style lang="scss" scoped>
img {
  width: 30%;
  height: auto;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.hexGrid {
  width: 60%;
  margin: 2rem 5rem;
  transform: translateX(-2.5%);

  @media (min-width: 50em) {
    width: 40%;
  }

  @media (min-width: 90em) {
    width: 35%;
  }

  .hexGridA,
  .hexGridB {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    pointer-events: none;
  }

  .hexGridB {
    transform: translateX(calc(100% / 6));
    margin: calc(-9.62% + 2px) auto; /* 100%*cos(30)/9 */
  }

  .hex {
    display: flex;
    pointer-events: initial;
    width: calc(100% * 2 / 3 - 2px);
    background-color: #424242;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    position: relative;
    cursor: pointer;

    &::before {
      content: '';
      padding-top: 86.6%; /* 100%*cos(30) */
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0 0;
      background: linear-gradient(150deg, #d9d9d9, #949494);
      opacity: 0;
      transition: opacity $default-animation-time ease-in-out;
      z-index: -1;
    }

    &:hover::after {
      opacity: 1;
    }
  }
}
</style>
