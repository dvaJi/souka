import React from 'react';

import Header from './components/Header';

import './tailwind.generated.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-gray-900">
      <Header />

      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex min-h-0">aa</main>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
