<template>
  <div
    :class="{ isShow: show, success: type === 'success', error: type === 'error', inprogress: type === 'inprogress' }"
    id="message"
  >
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<'success' | 'error' | 'inprogress'>,
    default: 'success'
  }
});
</script>

<style lang="scss" scoped>
#message {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.2rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem;
  line-height: normal;
  opacity: 0;
  transition: opacity $default-animation-time ease-in-out;
  font-size: 1rem;
  user-select: none;
  cursor: default;

  @media screen and (max-width: 900px) {
    width: 80%;
  }

  h3 {
    margin: 0;
  }

  &.isShow {
    user-select: auto;
    cursor: auto;
    opacity: 1;
  }

  &.success {
    color: green;
  }

  &.error {
    color: red;
  }

  &.inprogress {
    color: orange;
  }
}
</style>
