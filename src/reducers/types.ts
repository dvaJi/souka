import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export interface CounterStateType {
  counter: number;
}

export interface Action {
  type: string;
}

export type GetState = () => CounterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
