import { Document, Schema, model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  link: string;
  description: string;
  previewImageUrl: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

const projectsSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    previewImageUrl: { type: String, required: true },
    technologies: { type: [String], required: true }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Project = model<IProject>('projects', projectsSchema);
