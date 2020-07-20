import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getChapter } from '../../api/chapterAPI';
import { AppThunk } from 'app/store';

interface ChapterState {
  id: number;
  uniqid: string | null;
  pages: any[];
  isLoading: boolean;
  error: string | null;
}

const chapterInitialState: ChapterState = {
  id: 0,
  uniqid: null,
  pages: [],
  isLoading: false,
  error: null,
};

function startLoading(state: ChapterState) {
  state.isLoading = true;
}

function loadingFailed(state: ChapterState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const chapter = createSlice({
  name: 'chapter',
  initialState: chapterInitialState,
  reducers: {
    getChapterStart: startLoading,
    getChapterSuccess(state, { payload }: PayloadAction<any>) {
      const { id, uniqid, pages } = payload;
      state.id = id;
      state.uniqid = uniqid;
      state.pages = pages;
      state.isLoading = false;
      state.error = null;
    },
    getChapterFailure: loadingFailed,
  },
});

export const { getChapterStart, getChapterSuccess, getChapterFailure } = chapter.actions;

export default chapter.reducer;

export const fetchChapter = (uniqid: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getChapterStart());
    const chapter = await getChapter(uniqid);
    dispatch(getChapterSuccess(chapter));
  } catch (err) {
    dispatch(getChapterFailure(err.toString()));
  }
};
