import * as React from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';

interface Props {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

class ImageViewer extends React.Component<Props> {
  handleReset = () => {
    const { reset } = this.props;
    reset();
  };
  handleZoomIn = () => {
    const { zoomIn } = this.props;
    zoomIn();
  };
  handleZoomOut = () => {
    const { zoomOut } = this.props;
    zoomOut();
  };

  render() {
    return (
      <Grid container={true} spacing={0}>
        <button type="button" onClick={this.handleReset}>
          100%
        </button>
        <button type="button" onClick={this.handleZoomIn}>
          ZOOM IN
        </button>
        <button type="button" onClick={this.handleZoomOut}>
          ZOOM OUT
        </button>
      </Grid>
    );
  }
}

export default ImageViewer;
