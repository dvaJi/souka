import {
  ADD_LABEL,
  CHANGE_TEXT_LABEL,
  REMOVE_ALL_LABELS,
  REMOVE_LABEL,
  SELECT_LABEL,
  INIT_LABELS,
  LabelAction
} from '../actions/labels';
import { LabelState } from '../types/States';

const initialState: LabelState = {
  label: '',
  labels: {},
  keys: {},
  lastId: 0
};

export default function labels(state: LabelState = initialState, action: LabelAction): LabelState {
  switch (action.type) {
    case INIT_LABELS:
      return {
        ...state,
        labels: filesArrayToLabelObject(action.keys),
        keys: filesArrayToLabelArray(action.keys)
      };
    case ADD_LABEL:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.label.filename]: {
            ...state.labels[action.label.filename],
            [action.label.id]: action.label
          }
        },
        keys: {
          ...state.keys,
          [action.label.filename]: [
            ...state.keys[action.label.filename],
            action.label.id.toString()
          ]
        },
        lastId: action.label.id + 1
      };
    case SELECT_LABEL:
      return { ...state, label: action.id };
    case CHANGE_TEXT_LABEL:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.label.filename]: {
            ...state.labels[action.label.filename],
            [action.label.id]: action.label
          }
        }
      };
    case REMOVE_LABEL: {
      const newLabels = state.labels;
      delete newLabels[action.label.filename][action.label.id];
      return {
        ...state,
        labels: newLabels,
        keys: {
          ...state.keys,
          [action.label.filename]: state.keys[action.label.filename].filter(
            key => key !== action.label.id.toString()
          )
        }
      };
    }

    case REMOVE_ALL_LABELS:
      return { ...state, labels: {} };
    default:
      return state;
  }
}

const filesArrayToLabelObject = (array: any) =>
  array.reduce((obj: any, item: any) => {
    const file = obj;
    file[item] = {};
    return file;
  }, {});

const filesArrayToLabelArray = (array: any) =>
  array.reduce((obj: any, item: any) => {
    const file = obj;
    file[item] = [];
    return file;
  }, {});
