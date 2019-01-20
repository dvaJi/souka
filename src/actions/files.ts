import { Action, ActionCreator } from 'redux';
import { File } from '../types/File';

export const SELECT_FILE = 'SELECT_FILE';
export const ADD_FILE = 'ADD_FILE';
export const ADD_FILES = 'ADD_FILES';
export const REMOVE_FILE = 'REMOVE_FILE';
export const REMOVE_ALL = 'REMOVE_ALL';

export interface SelectFileAction extends Action {
  type: 'SELECT_FILE';
  filename: string;
}

export interface AddFileAction extends Action {
  type: 'ADD_FILE';
  file: File;
}

export interface AddAllFileAction extends Action {
  type: 'ADD_FILES';
  files: File[];
}

export interface RemoveFileAction extends Action {
  type: 'REMOVE_FILE';
  file: File;
}

export interface RemoveAllFilesAction extends Action {
  type: 'REMOVE_ALL';
}

export const select: ActionCreator<SelectFileAction> = (filename: string) => ({
  type: SELECT_FILE,
  filename
});

export const add: ActionCreator<AddFileAction> = (file: File) => ({
  type: ADD_FILE,
  file
});

export const addAll: ActionCreator<AddAllFileAction> = (files: File[]) => ({
  type: ADD_FILES,
  files
});

export const remove: ActionCreator<RemoveFileAction> = (file: File) => ({
  type: REMOVE_FILE,
  file
});

export const removeAll: ActionCreator<RemoveAllFilesAction> = () => ({
  type: REMOVE_ALL
});

export type FilesAction =
  | SelectFileAction
  | AddFileAction
  | AddAllFileAction
  | RemoveFileAction
  | RemoveAllFilesAction;
