import * as React from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';
import { Files } from '../../types/States';

type Props = {
  select: (filename: string) => void;
  classes: any;
  images: Files;
  keys: string[];
};

class ImageViewer extends React.Component<Props> {
  handleOnClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const element = event.target as HTMLImageElement;
    const { select } = this.props;
    select(element.alt);
  };

  render() {
    const { images, keys, classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.container}>
        {keys.map((key: string) => (
          <img
            key={key}
            onClick={this.handleOnClick}
            className={classes.image}
            src={images[key].preview}
            alt={images[key].filename}
          />
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
