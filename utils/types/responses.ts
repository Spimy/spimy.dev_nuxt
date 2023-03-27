import { User } from '@/utils/types/user';
import { IProject } from '@/server/database/models/projects.model';
import { Paginator } from '@/utils/types/paginator';

export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: User;
  sessionId: string;
  message: string;
}

export interface AuthCheckResponse {
  message: string;
  user: User;
}

export interface ProjectsResponse {
  projects: IProject[];
  paginate: Paginator;
}

export interface ProjectResponse {
  project: IProject;
  message: string;
}
