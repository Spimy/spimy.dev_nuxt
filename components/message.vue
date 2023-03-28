<template>
  <div :class="`${show ? 'isShow' : ''} ${type}`" id="message">
    <div class="icon">
      <FontAwesomeIcon v-if="type === 'inprogress'" icon="fa-regular fa-clock" />
      <FontAwesomeIcon v-else-if="type === 'error'" icon="fa-regular fa-circle-xmark" />
      <FontAwesomeIcon v-else icon="fa-regular fa-circle-check" />
    </div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

  position: fixed;
  @media (min-width: 80em) {
    left: 50%;
    transform: translate(-50%);
  }

  font-size: 0.5rem;
  padding: 2em;
  border-radius: 0.5rem;
  user-select: none;
  z-index: 9999;

  opacity: 0;
  bottom: -6rem;
  transition: all 0.8s ease-in-out;

  h3 {
    margin: 0;
  }

  h3,
  .icon {
    font-size: 1.5em;
  }

  &.isShow {
    bottom: 1rem;
    opacity: 1;
    user-select: text;
  }

  &.success {
    color: green;
    border: 0.1rem solid green;
    background-color: #002400;
  }

  &.error {
    color: red;
    border: 0.1rem solid red;
    background-color: #390000;
  }

  &.inprogress {
    color: orange;
    border: 0.1rem solid orange;
    background-color: #523500;
  }
}
</style>
