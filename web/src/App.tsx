import React from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { pages, chapterSelected } from './state/chapter';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';

function App() {
  const pageList = useRecoilValueLoadable(pages);
  const setChapterUniqid = useSetRecoilState(chapterSelected);

  console.log(pageList);

  return (
    <div
      data-testid="app-main"
      className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-gray-900"
    >
      <Header />

      <div className="flex-1 flex flex-col">
        <button onClick={() => setChapterUniqid('ch01')}>Load</button>
        <main className="flex-grow flex min-h-0">
          <span>status: {pageList.state}</span>
          <div>
            {pageList.state === 'loading' ? (
              <p>loading...</p>
            ) : pageList.contents.length === 0 ? (
              <p>You have not added any notes yet.</p>
            ) : (
              <ul>
                {pageList.contents &&
                  pageList.contents.map((n: any) => <li key={n.filename}>{n.filename}</li>)}
              </ul>
            )}
          </div>
        </main>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
