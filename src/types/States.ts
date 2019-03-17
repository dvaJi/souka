import { File } from './File';
import { Label } from './Label';

export interface LabelsKeys {
  [filename: string]: string[];
}

export interface Labels {
  [filename: string]: { [id: string]: Label };
}

export interface LabelState {
  label: string;
  labels: Labels;
  keys: LabelsKeys;
  lastId: number;
}

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
  labels: LabelState;
}
