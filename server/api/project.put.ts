import { readFiles, FieldsAndFiles } from 'h3-formidable';
import { Projects } from '@/server/database/models/projects.model';
import fs from 'fs';

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
  const { fields, files } = (await readFiles(event, { includeFields: true })) as EditProjectData;
  const { title, technologies, description } = fields;

  let previewImageUrl: string | undefined;
  if (files.previewImage) {
    const config = useRuntimeConfig();
    const file = files.previewImage[0];
    const image = fs.readFileSync(file.filepath);

    const formData = new FormData();
    formData.append('file', new Blob([image], { type: file.mimetype }), file.originalFilename);
    formData.append('folder', 'projects');

    const response = await $fetch<{ url: string }>('https://static.spimy.dev/upload', {
      method: 'POST',
      headers: { Authorization: config.static_secret },
      body: formData
    }).catch(() => undefined);
    previewImageUrl = response?.url;
  }

  await Projects.findByIdAndUpdate(
    fields._id[0],
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
  return {};
});
