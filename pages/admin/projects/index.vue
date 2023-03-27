<template>
  <div class="card">
    <ProjectEditor type="add" @added="handleAddedProject" @error="handleError" />
  </div>
</template>

<script lang="ts" setup>
import { ProjectResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// -- Methods --
const handleAddedProject = (response: ProjectResponse | undefined) => {
  console.log(response?.message);
  navigateTo(`/admin/projects/${response?.project._id}`);
};

const handleError = (response?: Omit<ProjectResponse, 'project'>) => {
  console.log(response?.message);
};
</script>

<style lang="scss" scoped>
.card {
  font-size: 1rem;
  background-color: var(--secondary-clr);
  width: 100%;
  padding: 3em;
  border-radius: 1em;
  color: var(--secondary-text-clr);
  margin-block: -3rem;
}
</style>
