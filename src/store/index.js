import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import psd from './psd';
import chapter from './chapter';
import ui from './ui';

const reducer = combineReducers({
  psd,
  chapter,
  ui,
});

const store = configureStore({
  reducer,
});

export default store;
