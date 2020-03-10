import { File } from './File';

export interface Files {
  [filename: string]: File;
}

export interface FilesState {
  file: string;
  files: Files;
  keys: string[];
}

export interface RootState {
  router: any;
  files: FilesState;
}
