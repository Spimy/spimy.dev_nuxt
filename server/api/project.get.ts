import { Project } from '@/server/database/models/projects.model';

export default defineEventHandler(async (event) => {
  const query = (<unknown>getQuery(event)) as { id: string };
  return await Project.findById(query.id).then((project) => project || undefined);
});
