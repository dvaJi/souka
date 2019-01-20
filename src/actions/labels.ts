import { Action, ActionCreator } from 'redux';
import { Label } from '../types/Label';

export const INIT_LABELS = 'INIT_LABELS';
export const SELECT_LABEL = 'SELECT_LABEL';
export const ADD_LABEL = 'ADD_LABEL';
export const REMOVE_LABEL = 'REMOVE_LABEL';
export const REMOVE_ALL_LABELS = 'REMOVE_ALL_LABELS';
export const CHANGE_TEXT_LABEL = 'CHANGE_TEXT_LABEL';

export interface InitAction extends Action {
  type: 'INIT_LABELS';
  keys: string[];
}

export interface SelectLabelAction extends Action {
  type: 'SELECT_LABEL';
  id: string;
}

export interface AddLabelAction extends Action {
  type: 'ADD_LABEL';
  label: Label;
}

export interface RemoveLabelAction extends Action {
  type: 'REMOVE_LABEL';
  label: Label;
}

export interface RemoveAllLabelAction extends Action {
  type: 'REMOVE_ALL_LABELS';
  filename: string;
}

export interface UpdateLabelAction extends Action {
  type: 'CHANGE_TEXT_LABEL';
  label: Label;
}

export const init: ActionCreator<InitAction> = (keys: string[]) => ({
  type: INIT_LABELS,
  keys
});

export const selectLabel: ActionCreator<SelectLabelAction> = (id: string) => ({
  type: SELECT_LABEL,
  id
});

export const add: ActionCreator<AddLabelAction> = (label: Label) => ({
  type: ADD_LABEL,
  label
});

export const remove: ActionCreator<RemoveLabelAction> = (label: Label) => ({
  type: REMOVE_LABEL,
  label
});

export const removeAll: ActionCreator<RemoveAllLabelAction> = (filename: string) => ({
  type: REMOVE_ALL_LABELS,
  filename
});

export const update: ActionCreator<UpdateLabelAction> = (label: Label) => ({
  type: CHANGE_TEXT_LABEL,
  label
});

export type LabelAction =
  | InitAction
  | SelectLabelAction
  | AddLabelAction
  | RemoveLabelAction
  | RemoveAllLabelAction
  | UpdateLabelAction;
