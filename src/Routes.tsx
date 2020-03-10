import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ShowFilesPage from './containers/ShowFilesPage';

export default () => (
  <App>
    <Switch>
      <Route path={'/files'} component={ShowFilesPage} />
      <Route path={'/'} component={HomePage} />
    </Switch>
  </App>
);
