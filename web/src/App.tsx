import React, { useEffect } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import tw, { styled } from 'twin.macro';

import { pages, chapterSelected } from './state/chapter';
import { Header } from 'components/Header';
// import { Sidebar } from 'components/Sidebar';
import { ImageView } from 'components/ImageView';
import { EditorToolbox } from 'components/EditorToolbox';
import { TextList } from 'components/TextList';
import { ProgressBar } from 'components/ProgressBar';

const AppMain = styled.div(() => [
  tw`h-full w-full flex overflow-hidden antialiased text-gray-800 bg-gray-900`,
]);

function App() {
  const chapter = useRecoilValueLoadable(pages);
  const setChapterUniqid = useSetRecoilState(chapterSelected);

  useEffect(() => {
    setChapterUniqid('ch02');
  }, []);

  return (
    <AppMain data-testid="app-main">
      <Header />

      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex min-h-0">
          <div className="w-full block">
            <div className="float-left" style={{ width: 1089 }}>
              <EditorToolbox />
              {chapter.state === 'loading' ? (
                <p>loading...</p>
              ) : chapter.contents.pages.length === 0 ? (
                <p>You have not added any notes yet.</p>
              ) : (
                <div className="overflow-x-hidden overflow-y-auto h-screen">
                  {chapter.contents &&
                    chapter.contents.pages.map((n: any) => (
                      <ImageView key={n.filename} image={n} />
                    ))}
                </div>
              )}
            </div>
            {chapter.state !== 'loading' && (
              <div
                className="float-left  bg-white pl-5 overflow-x-hidden overflow-y-auto h-screen"
                style={{ width: 498 }}
              >
                <ProgressBar />
                <TextList texts={chapter.contents.originalText} />
              </div>
            )}
          </div>
        </main>
      </div>
    </AppMain>
  );
}

export default App;
