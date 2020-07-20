import { combineReducers } from '@reduxjs/toolkit';

import translateChapterReducer from '../features/translateChapter/translateChapterSlice';

const rootReducer = combineReducers({
  translateChapter: translateChapterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
