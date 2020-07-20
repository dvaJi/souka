import React from 'react';
import { render } from '@testing-library/react';

import App from '../../app/App';

it('renders without crashing', async () => {
  const app = render(<App />);

  expect(app).toBeTruthy();
});
