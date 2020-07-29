import React from 'react';
import { RecoilRoot } from 'recoil';
import { render, act, fireEvent } from '@testing-library/react';

import App from '../App';

test('renders', () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const linkElement = getByText(/contet of the fisrt block./i);
  expect(linkElement).toBeInTheDocument();
});
