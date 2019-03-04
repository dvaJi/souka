import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import brown from '@material-ui/core/colors/brown';

import { Store } from '../reducers/types';
import Routes from '../Routes';
import { History } from 'history';

type Props = {
  store: Store;
  history: History;
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: brown
  },
  typography: {
    useNextVariants: true
  }
});

export default function Root(props: Props) {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}
