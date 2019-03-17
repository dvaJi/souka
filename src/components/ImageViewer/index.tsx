import React from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';
import { File } from '../../types/File';
import { renderIf } from '../../utils/helpers';

interface Props {
  classes: any;
  image: File;
  availableHeight: number;
}

class ImageViewer extends React.Component<Props> {
  render() {
    const { image, availableHeight, classes } = this.props;
    return (
      <Grid container spacing={0} style={{ height: availableHeight }}>
        <div className={classes.container}>
          <img className={classes.image} src={image.preview} alt={image.filename} />
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
