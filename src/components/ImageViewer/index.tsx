import React, { createRef } from 'react';
import { motion } from 'framer-motion';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import Label from '../Labels/Label';
import styles from './styles';
import { File } from '../../types/File';

interface Coordinate {
  x: number;
  y: number;
}

export interface RectLabel {
  startCoordinates: Coordinate;
  endCoordinates: Coordinate;
}

interface ImageViewerState {
  startCoordinates: Coordinate;
  endCoordinates: Coordinate;
}

interface ImageViewerProps {
  classes: any;
  image: File;
  availableHeight: number;
  labels: any;
  insertLabel: (offset: RectLabel, image: RectLabel) => void;
  onRemoveLabel: (label: any) => void;
}

const calculatePosition = (resizeValue: number, originalValue: number) => (
  clickPosition: number
) => {
  const originalPercentage = (clickPosition * 100) / resizeValue;
  return (originalPercentage * originalValue) / 100;
};

class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  private imageRef = createRef<HTMLImageElement>();
  private containerRef = createRef<HTMLImageElement>();

  onPanStart = (event: any, info: any) => {
    this.setState({ startCoordinates: { x: info.point.x, y: info.point.y } });
  };

  onPanEnd = (event: any, info: any) => {
    const { insertLabel } = this.props;
    const { startCoordinates } = this.state;

    if (this.imageRef.current && this.containerRef.current) {
      const position = calculatePosition(
        this.imageRef.current.clientWidth,
        this.imageRef.current.naturalWidth
      );

      const off: RectLabel = {
        startCoordinates: {
          x: position(startCoordinates.x) / this.imageRef.current.naturalWidth,
          y:
            position(startCoordinates.y - 106 + this.containerRef.current.scrollTop) /
            this.imageRef.current.naturalHeight
        },
        endCoordinates: {
          x: info.point.x,
          y: info.point.y
        }
      };

      const image: RectLabel = {
        startCoordinates: {
          x: startCoordinates.x - this.containerRef.current.scrollLeft,
          y: startCoordinates.y - 106 + this.containerRef.current.scrollTop
        },
        endCoordinates: {
          x: info.point.x - this.containerRef.current.scrollLeft,
          y: info.point.y - 106 + this.containerRef.current.scrollTop
        }
      };

      insertLabel(off, image);
    }
  };

  render() {
    const { image, labels, availableHeight, classes, onRemoveLabel } = this.props;
    let divContainerStyle = {};
    if (this.imageRef.current) {
      divContainerStyle = {
        width: this.imageRef.current.naturalWidth,
        height: this.imageRef.current.naturalHeight
      };
    }

    return (
      <Grid container spacing={0} style={{ height: availableHeight }}>
        <div ref={this.containerRef} className={classes.container}>
          <motion.div
            onPanEnd={this.onPanEnd}
            onPanStart={this.onPanStart}
            style={divContainerStyle}
          >
            {labels.map((l: any, index: number) => (
              <Label key={l.id} labelNumber={index} label={l} onRemove={onRemoveLabel} />
            ))}
            <img
              ref={this.imageRef}
              className={classes.image}
              src={image.preview}
              alt={image.filename}
            />
          </motion.div>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
