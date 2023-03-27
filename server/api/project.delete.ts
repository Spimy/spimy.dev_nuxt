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

    if (data?.user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
        message: 'You do not have permissions to add a project.'
      });
    }

    const { id } = (await readBody(event)) as { id: string };
    const deletedProject = await Projects.findByIdAndDelete(id);

    return {
      message: deletedProject
        ? `Successfully deleted project '${deletedProject.title}'.`
        : `Cannot find project '${id}'`
    };
  });
});
