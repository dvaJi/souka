import {
  SELECT_FILE,
  ADD_FILE,
  ADD_FILES,
  REMOVE_FILE,
  REMOVE_ALL,
  FilesAction
} from '../actions/files';
import { FilesState } from '../types/States';

const initialState: FilesState = {
  file: '',
  files: {},
  keys: []
};

export default function files(state: FilesState = initialState, action: FilesAction): FilesState {
  switch (action.type) {
    case SELECT_FILE:
      return { ...state, file: action.filename };
    case ADD_FILE:
      if (!state.keys.includes(action.file.filename)) {
        return {
          ...state,
          files: { ...state.files, [action.file.filename]: action.file },
          keys: [...new Set([...state.keys, action.file.filename])].sort((k1, k2) =>
            k1.localeCompare(k2)
          )
        };
      }
      return state;
    case ADD_FILES:
      return {
        ...state,
        files: { ...state.files, ...filesArrayToObject(action.files) },
        keys: [...new Set([...state.keys, ...action.files.map(f => f.filename)])].sort((k1, k2) =>
          k1.localeCompare(k2)
        )
      };
    case REMOVE_FILE: {
      const newFiles = state.files;
      delete newFiles[action.file.filename];
      return {
        ...state,
        keys: state.keys.filter(k => k !== action.file.filename),
        files: newFiles
      };
    }

    case REMOVE_ALL:
      return { ...state, files: {}, keys: [] };
    default:
      return state;
  }
}

const filesArrayToObject = (array: any) =>
  array.reduce((obj: any, item: any) => {
    const file = obj;
    file[item.filename] = item;
    return file;
  }, {});
