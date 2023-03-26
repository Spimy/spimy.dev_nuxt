<template>
  <div class="dropbox">
    <input type="file" accept=".png, .jpeg, .jpg, .gif" class="input-file" @change="prepareImage" />
    <p>Drop image here or click to upload</p>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['change']);

const prepareImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.item(0);
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);
  emit('change', { previewUrl, file });
};
</script>

<style lang="scss" scoped>
.dropbox {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  background: var(--background-clr);
  color: var(--text-clr);
  outline-offset: -1em;
  outline: 2px dashed var(--text-clr);
  vertical-align: text-top;
  border-radius: 0.5em;
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
  transition: var(--default-animation-time) ease-in-out;

  &:hover,
  &:focus-within {
    color: var(--primary-clr);
    outline: 2px dashed var(--primary-clr);
  }

  input {
    position: absolute;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  p {
    font-size: 15px;
    padding: 50px 0;
    text-align: center;
  }
}
</style>
