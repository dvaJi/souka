import * as React from 'react';

// UI Imports
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';

type Props = {
  classes: any;
  text: string;
};

class Suggestion extends React.Component<Props> {
  handleSuggestion() {}
  render() {
    const { text, classes } = this.props;
    return <div style={{ width: '100%', padding: '10px 20px' }}>{text}</div>;
  }
}

export default withStyles(styles)(Suggestion);
