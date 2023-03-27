import { Projects } from '@/server/database/models/projects.model';
import { cleanProjectData } from '../utils/clean-project-data';

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
    const { _id, ...projectData } = await cleanProjectData(event, false);

    // Can return null if project does not exist
    const updatedProject = await Projects.findByIdAndUpdate(_id, { $set: { ...projectData } }, { new: true });

    return {
      project: updatedProject,
      message: updatedProject ? 'Successfully updated project.' : `Project '${_id}' could not be found.`
    };
  });
});
