import React from 'react';
import ReactDOM from 'react-dom';
import { History } from 'history';

import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { Store, AnyAction } from 'redux';
import { RootState } from './types/States';

const store = configureStore();

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (
  Component: (props: any) => JSX.Element,
  elstore: Store<RootState, AnyAction>,
  elhistory: History
) => {
  ReactDOM.render(<Component store={elstore} history={elhistory} />, mainElement);
};

render(Root, store, history);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    import('./containers/Root').then(RootContainer => {
      render(RootContainer.default, store, history);
    });
  });
}

serviceWorker.register();
