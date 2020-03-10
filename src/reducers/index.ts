import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import files from './files';
import { RootState } from '../types/States';

export default function createRootReducer(history: any) {
  return combineReducers<RootState | undefined>({
    router: connectRouter(history),
    files
  });
}
