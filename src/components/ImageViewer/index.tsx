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

interface TempBox {
  hidden: boolean;
  coordinates: RectLabel;
}

interface ImageViewerState {
  startCoordinates: Coordinate;
  endCoordinates: Coordinate;
  tempBox: TempBox;
}

interface ImageViewerProps {
  classes: any;
  image: File;
  availableHeight: number;
  labels: any;
  labelSelected: any;
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
  state: ImageViewerState = {
    tempBox: {
      hidden: true,
      coordinates: {
        startCoordinates: { x: 0, y: 0 },
        endCoordinates: { x: 0, y: 0 }
      }
    },
    endCoordinates: { x: 0, y: 0 },
    startCoordinates: { x: 0, y: 0 }
  };

  private imageRef = createRef<HTMLImageElement>();
  private containerRef = createRef<HTMLImageElement>();

  onPanStart = (event: any, info: any) => {
    this.setState({ startCoordinates: { x: info.point.x, y: info.point.y } });

    if (this.containerRef.current) {
      const tempBox = {
        hidden: false,
        coordinates: {
          startCoordinates: {
            x: info.point.x - this.containerRef.current.scrollLeft,
            y: info.point.y - 96 + this.containerRef.current.scrollTop
          },
          endCoordinates: { x: info.point.x, y: info.point.y }
        }
      };
      this.setState({ tempBox });
    }
  };

  onPan = (event: any, info: any) => {
    if (this.containerRef.current) {
      const tempBox = {
        ...this.state.tempBox,
        coordinates: {
          ...this.state.tempBox.coordinates,
          endCoordinates: {
            x: info.point.x - this.containerRef.current.scrollLeft,
            y: info.point.y - 96 + this.containerRef.current.scrollTop
          }
        }
      };
      this.setState({ tempBox });
    }
  };

  onPanEnd = (event: any, info: any) => {
    const { insertLabel } = this.props;
    const { startCoordinates } = this.state;

    const tempBox = {
      hidden: true,
      coordinates: {
        startCoordinates: { x: 0, y: 0 },
        endCoordinates: { x: 0, y: 0 }
      }
    };
    this.setState({ tempBox });

    if (this.imageRef.current && this.containerRef.current) {
      const position = calculatePosition(
        this.imageRef.current.clientWidth,
        this.imageRef.current.naturalWidth
      );

      const off: RectLabel = {
        startCoordinates: {
          x: position(startCoordinates.x) / this.imageRef.current.naturalWidth,
          y:
            position(startCoordinates.y - 96 + this.containerRef.current.scrollTop) /
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
          y: startCoordinates.y - 96 + this.containerRef.current.scrollTop
        },
        endCoordinates: {
          x: info.point.x - this.containerRef.current.scrollLeft,
          y: info.point.y - 96 + this.containerRef.current.scrollTop
        }
      };

      insertLabel(off, image);
    }
  };

  render() {
    const { image, labels, labelSelected, availableHeight, classes, onRemoveLabel } = this.props;
    const nextId = labels.length > 0 ? labels[labels.length - 1].id + 1 : 0;
    let divContainerStyle = {};
    if (this.imageRef.current) {
      divContainerStyle = {
        width: this.imageRef.current.naturalWidth,
        height: this.imageRef.current.naturalHeight
      };
    }

    const tempLabel = {
      id: nextId,
      image: this.state.tempBox.coordinates
    };

    return (
      <Grid container spacing={0} style={{ height: availableHeight }}>
        <div ref={this.containerRef} className={classes.container}>
          <motion.div
            onPan={this.onPan}
            onPanEnd={this.onPanEnd}
            onPanStart={this.onPanStart}
            style={divContainerStyle}
          >
            {labels.map((l: any, index: number) => (
              <Label
                key={l.id}
                active={labelSelected === l.id}
                labelNumber={index}
                label={l}
                onRemove={onRemoveLabel}
              />
            ))}
            {!this.state.tempBox.hidden && (
              <Label
                key={'temp.box'}
                active={true}
                labelNumber={tempLabel.id}
                label={tempLabel}
                onRemove={onRemoveLabel}
              />
            )}
            <img
              ref={this.imageRef}
              className={classes.image}
              src={image.preview}
              alt={image.filename}
              draggable={false}
            />
          </motion.div>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
