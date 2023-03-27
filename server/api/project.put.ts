import fs from 'fs';
import { readFiles, FieldsAndFiles } from 'h3-formidable';
import { Projects } from '@/server/database/models/projects.model';

interface PersistentFile {
  filepath: string;
  originalFilename: string;
  mimetype: string;
}

interface EditProjectData extends FieldsAndFiles {
  fields: {
    _id: string[];
    title: string[];
    technologies: string[];
    description: string[];
  };
  files: {
    previewImage?: PersistentFile[];
  };
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, 'Authorization');

  // Check if user is authenticated before editing
  // This check is done server side to prevent this endpoint from being accessible by everyone
  return await checkServerAuthentication(authHeader || '').then(async ({ isAuthenticated, data }) => {
    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data
      });
    }

    const { fields, files } = (await readFiles(event, { includeFields: true })) as EditProjectData;
    const { _id, title, technologies, description } = fields;

    // If there was a file, then upload it to the static host
    let previewImageUrl: string | undefined;
    if (files.previewImage) {
      const file = files.previewImage[0];
      const image = fs.readFileSync(file.filepath);

      const formData = new FormData();
      formData.append('file', new Blob([image], { type: file.mimetype }), file.originalFilename);
      formData.append('folder', 'projects'); // Upload to https://static.spimy.dev/projects/<file_name>.<ext>

      const response = await $fetch<{ url: string }>('https://static.spimy.dev/upload', {
        method: 'POST',
        headers: { Authorization: config.static_secret },
        body: formData
      }).catch(() => undefined);
      previewImageUrl = response?.url;
    }

    // Can return null if project does not exist
    const updatedProject = await Projects.findByIdAndUpdate(
      _id[0],
      {
        $set: {
          title: title[0],
          technologies: JSON.parse(technologies[0]),
          description: description[0],
          previewImageUrl: previewImageUrl
        }
      },
      { new: true }
    );

    return {
      project: updatedProject,
      message: updatedProject ? 'Successfully updated project.' : `Project '${_id[0]}' could not be found.`
    };
  });
});
