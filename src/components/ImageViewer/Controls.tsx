import * as React from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';

type Props = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

class ImageViewer extends React.Component<Props> {
  render() {
    const { zoomIn, zoomOut, reset } = this.props;
    return (
      <Grid container spacing={0}>
        <button type="button" onClick={() => reset()}>
          100%
        </button>
        <button type="button" onClick={() => zoomIn()}>
          ZOOM IN
        </button>
        <button type="button" onClick={() => zoomOut()}>
          ZOOM OUT
        </button>
      </Grid>
    );
  }
}

export default ImageViewer;
