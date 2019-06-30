import React, { createRef } from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import Label from '../Labels/Label';
import styles from './styles';
import { File } from '../../types/File';

interface Props {
  classes: any;
  image: File;
  availableHeight: number;
  labels: any;
  insertLabel: (offset: { x: number; y: number }, image: { x: number; y: number }) => void;
  onRemoveLabel: (label: any) => void;
}

const calculatePosition = (clickPosition: number, resizeValue: number, originalValue: number) => {
  const originalPercentage = (clickPosition * 100) / resizeValue;
  return (originalPercentage * originalValue) / 100;
};

class ImageViewer extends React.Component<Props> {
  private imageRef = createRef<HTMLImageElement>();
  private containerRef = createRef<HTMLImageElement>();

  onClick = (e: any) => {
    const { insertLabel } = this.props;
    if (this.imageRef.current && this.containerRef.current) {
      const image = {
        x: e.pageX - this.containerRef.current.scrollLeft,
        y: e.pageY - 106 + this.containerRef.current.scrollTop
      };

      const widthValue = calculatePosition(
        e.pageX,
        this.imageRef.current.clientWidth,
        this.imageRef.current.naturalWidth
      );
      const heightValue = calculatePosition(
        e.pageY - 106 + this.containerRef.current.scrollTop,
        this.imageRef.current.clientHeight,
        this.imageRef.current.naturalHeight
      );

      const off = {
        x: widthValue / this.imageRef.current.naturalWidth,
        y: heightValue / this.imageRef.current.naturalHeight
      };

      insertLabel(off, image);
    }
  };

  render() {
    const { image, labels, availableHeight, classes, onRemoveLabel } = this.props;

    return (
      <Grid container spacing={0} style={{ height: availableHeight }}>
        <div ref={this.containerRef} className={classes.container}>
          <>
            {labels.map((l: any, index: number) => (
              <Label key={l.id} labelNumber={index} label={l} onRemove={onRemoveLabel} />
            ))}
            <img
              ref={this.imageRef}
              onClick={this.onClick}
              className={classes.image}
              src={image.preview}
              alt={image.filename}
            />
          </>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageViewer);
