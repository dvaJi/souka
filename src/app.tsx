import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { History } from 'history';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

const store = configureStore();

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: (props: any) => JSX.Element, store: any, history: History) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    mainElement
  );
};

render(Root, store, history);

if (typeof module.hot !== 'undefined') {
  module.hot.accept('./containers/Root', () => {
    import('./containers/Root').then(World => {
      render(World.default, store, history);
    });
  });
}
