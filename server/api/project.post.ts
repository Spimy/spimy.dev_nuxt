import { Projects } from '../database/models/projects.model';

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

    // Clean up the form inputs and return only the necessary data
    const { _id, ...projectData } = await cleanProjectData(event, true);

    // TODO: need to get link of project from form, temporarily always setting the link to portfolio
    const project = await new Projects({ ...projectData, link: 'https://spimy.dev' }).save();
    return { project, message: `Successfully added project '${project.title}'` };
  });
});
