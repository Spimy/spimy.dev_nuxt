import { Schema, model } from 'mongoose';

export interface IProjects {
  title: string;
  link: string;
  description: string;
  previewImageUrl: string;
  technologies: string[];
}

const projectsSchema = new Schema<IProjects>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    previewImageUrl: { type: String, required: true },
    technologies: { type: [String], required: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Projects = model<IProjects>('projects', projectsSchema);
