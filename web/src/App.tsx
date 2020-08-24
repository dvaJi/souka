import React, { useEffect } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { pages, chapterSelected } from './state/chapter';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { ImageView } from 'components/ImageView';
import { EditorToolbox } from 'components/EditorToolbox';
import { TextList } from 'components/TextList';

function App() {
  const pageList = useRecoilValueLoadable(pages);
  const setChapterUniqid = useSetRecoilState(chapterSelected);

  useEffect(() => {
    setChapterUniqid('ch01');
  }, []);

  return (
    <div
      data-testid="app-main"
      className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-gray-900"
    >
      <Header />

      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex min-h-0">
          <span>status: {pageList.state}</span>
          <div className="w-full block">
            <div className="float-left" style={{ width: 768 }}>
              <EditorToolbox />
              {pageList.state === 'loading' ? (
                <p>loading...</p>
              ) : pageList.contents.pages.length === 0 ? (
                <p>You have not added any notes yet.</p>
              ) : (
                <div>
                  {pageList.contents &&
                    pageList.contents.pages.map((n: any) => (
                      <ImageView key={n.filename} image={n.path} />
                    ))}
                </div>
              )}
            </div>
            <div className="float-left" style={{ width: 498 }}>
              <TextList texts={[]} />
            </div>
          </div>
        </main>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
