import { File } from './File';
import { Label } from './Label';

export type LabelsKeys = {
  [filename: string]: string[];
};

export type Labels = {
  [filename: string]: { [id: string]: Label };
};

export type LabelState = {
  label: string;
  labels: Labels;
  keys: LabelsKeys;
  lastId: number;
};

export type Files = {
  [filename: string]: File;
};

export type FilesState = {
  file: string;
  files: Files;
  keys: string[];
};

export interface RootState {
  router: any;
  files: FilesState;
  labels: LabelState;
}
