import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ShowFilesPage from './containers/ShowFilesPage';
import TranslateFile from './containers/TranslateFile';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TRANSLATE_FILE} component={TranslateFile} />
      <Route path={routes.SHOW_FILES} component={ShowFilesPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
