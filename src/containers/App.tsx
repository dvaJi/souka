import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, Theme } from '@material-ui/core/styles';

import Header from '../components/Layout/Header';

interface Props {
  classes: { root: string };
  children: React.ReactNode;
}

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  }
});

class App extends React.Component<Props> {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <div className={classes.root}>{children}</div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
