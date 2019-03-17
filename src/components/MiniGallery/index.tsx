import * as React from 'react';
import classnames from 'classnames';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';
import { File } from '../../types/File';
import { Files } from '../../types/States';

interface Props {
  select: (filename: string) => void;
  availableHeight: number;
  classes: any;
  images: Files;
  selected: File;
  keys: string[];
}

class ImageViewer extends React.Component<Props> {
  handleOnClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const element = event.target as HTMLImageElement;
    const { select } = this.props;
    select(element.alt);
  };

  render() {
    const { images, keys, selected, availableHeight, classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.container} style={{ height: availableHeight }}>
        {keys.map((key: string) => (
          <img
            key={key}
            onClick={this.handleOnClick}
            className={classnames(
              classes.image,
              selected.filename === images[key].filename ? classes.imageActive : ''
            )}
            src={images[key].preview}
            alt={images[key].filename}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
