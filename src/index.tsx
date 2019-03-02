import React from 'react';
import ReactDOM from 'react-dom';
import { History } from 'history';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (
  Component: (props: any) => JSX.Element,
  store: any,
  history: History
) => {
  ReactDOM.render(<Component store={store} history={history} />, mainElement);
};

render(Root, store, history);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    import('./containers/Root').then(Root => {
      render(Root.default, store, history);
    });
  });
}

serviceWorker.register();
