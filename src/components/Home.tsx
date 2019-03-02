import React from 'react';

import ShowFilesPage from '../containers/ShowFilesPage';

import { fileTemplate } from '../utils/helpers';

export default function Home() {
  console.log(fileTemplate)
  return (
    <div>
      <ShowFilesPage />
    </div>
  );
}
