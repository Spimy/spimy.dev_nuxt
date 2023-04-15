<template>
  <div class="tag-input">
    <div v-for="(tag, index) in tags" :key="index" class="tag-input__tag">
      <span @click="removeTag(index)">x</span>
      {{ tag }}
    </div>
    <input
      type="text"
      placeholder="Enter technology"
      class="tag-input__text"
      @keydown="addTag"
      @keydown.delete="removeLastTag"
    />
  </div>
</template>

<script lang="ts" setup>
// -- Props --
const props = withDefaults(
  defineProps<{
    tags?: string[];
  }>(),
  { tags: () => [] }
);

// -- Methods --
const addTag = (event: KeyboardEvent) => {
  if (event.code === 'Comma' || event.code === 'Enter' || event.code === 'NumpadEnter') {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    const value = target.value.trim();
    if (value.length > 0) {
      if (!props.tags.includes(value)) props.tags.push(value);
      target.value = '';
    }
  }
};

const removeTag = (index: number) => props.tags.splice(index, 1);
const removeLastTag = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  if (target.value.length === 0) removeTag(props.tags.length - 1);
};
</script>

<style lang="scss" scoped>
.tag-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  width: 100%;
  border: 0.15rem solid var(--secondary-text-clr);
  font-size: 0.8rem;
  padding: 0.5em;
  border-radius: 0.5em;

  &:focus-within {
    border-color: var(--primary-clr);
  }

  .tag-input__tag {
    color: var(--secondary-text-clr);
    background-color: var(--primary-clr);

    & > span {
      cursor: pointer;
      opacity: 0.75;
    }
  }

  .tag-input__text {
    border: none;
    outline: none;
    font-size: 0.8rem;
    background: none;
    color: var(--secondary-text-clr);
    max-width: 10em;
    width: 100%;
  }

  .tag-input__tag,
  .tag-input__text {
    margin-block: 0.2em;
    padding: inherit;
    border-radius: inherit;
  }
}
</style>
