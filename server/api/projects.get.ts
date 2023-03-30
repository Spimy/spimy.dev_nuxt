import { ProjectQuery } from '@/utils/types/project-query';
import { Project } from '@/server/database/models/projects.model';

export default defineEventHandler(async (event) => {
  const query = (<unknown>getQuery(event)) as ProjectQuery;
  const numProjects = await Project.count();

  query.perPage ??= numProjects;

  const currentPage = Math.max(1, query.page || 1);
  const pageCount = Math.ceil(numProjects / (query.perPage || numProjects));

  const pageRange = pageCount >= 5 ? 5 : pageCount;

  let pageMin: number;
  if (currentPage - 2 < 1) {
    pageMin = 1;
  } else if (currentPage >= pageCount) {
    pageMin = currentPage - pageRange + 1;
  } else if (currentPage === pageCount - 1) {
    pageMin = currentPage - pageRange + 2;
  } else {
    pageMin = currentPage - 2;
  }

  const projects = await Project.find({})
    .limit(query.perPage)
    .skip(query.perPage * (currentPage - 1))
    .sort({ createdAt: -1 });

  return { projects, paginate: { pageCount, currentPage, pageRange, pageMin } };
});
