import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import { History } from 'history';

type Props = {
  store: Store;
  history: History;
};

export default function Root(props: Props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
