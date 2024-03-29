import fs from 'fs/promises';
import { H3Event } from 'h3';
import { readFiles, FieldsAndFiles } from 'h3-formidable';

interface PersistentFile {
  filepath: string;
  originalFilename: string;
  mimetype: string;
}

interface EditProjectData extends FieldsAndFiles {
  fields: {
    _id: string[];
    title: string[];
    link: string[];
    technologies: string[];
    description: string[];
  };
  files: {
    previewImage?: PersistentFile[];
  };
}

interface CleanedData {
  title: string | undefined;
  link: string | undefined;
  technologies: string[];
  description: string | undefined;
}

const getMissingFields = ({ title, link, technologies, description }: CleanedData, files: PersistentFile[]) => {
  const missingFields: (keyof CleanedData | 'previewImage')[] = [];

  if (!title) missingFields.push('title');
  if (!link) missingFields.push('link');
  if (technologies.length === 0) missingFields.push('technologies');
  if (files.length === 0) missingFields.push('previewImage');
  if (!description) missingFields.push('description');

  return missingFields;
};

export const cleanProjectData = async (event: H3Event, isAdd: boolean) => {
  const projectData = (await readFiles(event, { includeFields: true })) as EditProjectData;
  const { fields, files } = projectData;
  const { _id, title, link, technologies, description } = fields;

  const cleanedData = {
    _id: _id?.shift(),
    title: title?.shift(),
    link: link?.shift(),
    technologies: JSON.parse(technologies?.shift() || '[]') as string[],
    description: description?.shift()
  };

  /**
   * If the function is being executed by the add project endpoint then
   * we need to make sure all of the fields have been set, including the preview image
   *
   * Editing does not require this check as mongoose will ignore all undefined values automatically
   */
  if (isAdd) {
    const missingFields = getMissingFields(cleanedData, files.previewImage || []);
    if (missingFields.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `The following fields cannot be empty: [${missingFields.join(', ')}]`
      });
    }
  } else {
    /**
     * List of technologies should never be made blank,
     * therefore a check is made to make sure it is not empty
     */
    if (cleanedData.technologies.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `List of technologies should never be blank.`
      });
    }
  }

  // If there was a file, then upload it to the static host
  let previewImageUrl: string | undefined;
  if (files.previewImage) {
    const file = files.previewImage[0];
    const image = await fs.readFile(file.filepath);

    const formData = new FormData();
    formData.append('file', new Blob([image], { type: file.mimetype }), file.originalFilename);
    formData.append('folder', 'projects'); // Upload to https://static.spimy.dev/projects/<file_name>.<ext>

    const config = useRuntimeConfig();
    const response = await $fetch<{ url: string }>('https://static.spimy.dev/upload', {
      method: 'POST',
      headers: { Authorization: config.static_secret },
      body: formData
    }).catch(() => undefined);
    previewImageUrl = response?.url;

    await fs.unlink(file.filepath);
  }

  return {
    ...cleanedData,
    previewImageUrl
  };
};
