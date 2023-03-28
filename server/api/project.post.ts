import { Project } from '../database/models/projects.model';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');

  // Check if user is authenticated before editing
  // This check is done server side to prevent this endpoint from being accessible by everyone
  return await checkServerAuthentication(authHeader || '').then(async ({ isAuthenticated, data }) => {
    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: data?.message
      });
    }

    if (data?.user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
        message: 'You do not have permissions to add a project.'
      });
    }

    // Clean up the form inputs and return only the necessary data
    const { _id, ...projectData } = await cleanProjectData(event, true);

    const project = await new Project({ ...projectData }).save();
    return { project, message: `Successfully added project '${project.title}'` };
  });
});
