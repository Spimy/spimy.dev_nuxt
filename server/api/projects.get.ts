import { Projects } from '../database/models/projects.model';

interface ProjectQuery {
  perPage: number;
}

export default defineEventHandler(async (event) => {
  const query = (<unknown>getQuery(event)) as { perPage: number };
  const projects = await Projects.find({}).limit(query.perPage).sort({ createdAt: -1 });
  return projects;
});
