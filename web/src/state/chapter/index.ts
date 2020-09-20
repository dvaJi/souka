import { atom, selector } from 'recoil';
import { getChapter } from 'api/chapterAPI';

export interface Chapter {
  uniqid: string;
}

export interface Pages {
  width: number;
  height: number;
}

export interface Chapter {
  pages: Pages[];
  originalTexts: any[];
}

export const pageSelected = atom<string>({
  key: 'pageSelected',
  default: '',
});

export const chapterSelected = atom<string>({
  key: 'chapterSelected',
  default: '',
});

export const pages = selector({
  key: 'pages',
  get: async ({ get }) => {
    const chapterUniqid = get(chapterSelected);

    try {
      const data = await getChapter(chapterUniqid);
      console.log(data);

      if (data) {
        return data;
      }
    } catch (e) {
      console.log(e.message);
    }

    return { pages: [], originalText: [] };
  },
});
