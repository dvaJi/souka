import { createSlice } from '@reduxjs/toolkit';

const initialChapter = {
  id: 1,
  uniqid: '123',
  pages: [],
};

const slice = createSlice({
  name: 'chapter',
  initialState: {
    chapter: initialChapter,
  },
  reducers: {
    getChapterSuccess: (state, action) => {
      state.chapter = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { getChapterSuccess } = slice.actions;

export const getChapter = ({ uniqid }) => async (dispatch) => {
  try {
    // await api.post('/api/chapter/', { uniqid })
    dispatch(getChapterSuccess({ id: 2, uniqid: 'asd910asd', pages: [] }));
  } catch (e) {
    return console.error(e.message);
  }
};
