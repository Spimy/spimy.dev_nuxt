<template>
  <div class="card">
    <ProjectEditor type="add" @saving="handleSaving" @saved="handleAddedProject" @error="handleError" />
    <Message :message="messageConfig.message" :show="messageConfig.show" :type="messageConfig.type" />
  </div>
</template>

<script lang="ts" setup>
import { ProjectResponse } from '@/utils/types/responses';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
});

// -- Handlers --
const { messageConfig, showMessage } = new MessageHandler();

// -- Methods --
const handleAddedProject = (response: ProjectResponse | undefined) => {
  if (response) showMessage(response.message, 'success', 3);
  setTimeout(() => navigateTo(`/admin/projects/${response?.project._id}`), 3 * 1000);
};

const handleSaving = (projectTitle: string) => {
  showMessage(`Saving the new project '${projectTitle}'...`, 'inprogress');
};

const handleError = (response?: Omit<ProjectResponse, 'project'>) => {
  if (response) showMessage(response.message, 'error', 3);
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
