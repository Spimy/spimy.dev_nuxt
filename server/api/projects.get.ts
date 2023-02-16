import { Projects } from '../database/models/projects.model';

interface ProjectQuery {
  perPage: number;
  page?: number;
}

export default defineEventHandler(async (event) => {
  const query = (<unknown>getQuery(event)) as ProjectQuery;

  const currentPage = Math.max(1, query.page || 1);
  const pageCount = Math.ceil((await Projects.count()) / query.perPage);

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

  const projects = await Projects.find({})
    .limit(query.perPage)
    .skip(query.perPage * (currentPage - 1))
    .sort({ createdAt: -1 });

  return { projects, paginate: { pageCount, currentPage, pageRange, pageMin } };
});
