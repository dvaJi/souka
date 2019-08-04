import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

interface Props {
  classes: any;
}
const styles = createStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 10
  },
  url: {
    color: 'inherit',
    fontSize: '1.3em'
  }
});

function Footer(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <a className={classes.url} href="/assets/PS_Script_en.jsx" download>
        Download photoshop script
      </a>
    </div>
  );
}

export default withStyles(styles)(Footer);
