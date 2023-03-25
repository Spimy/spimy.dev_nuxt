import { Projects } from '@/server/database/models/projects.model';

export default defineEventHandler(async (event) => {
  const query = (<unknown>getQuery(event)) as { id: string };
  return await Projects.findById(query.id).then((project) => project || undefined);
});
