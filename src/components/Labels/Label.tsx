// @flow
import * as React from 'react';

// UI Imports
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  active: boolean;
  onRemove: (label: any) => void;
  classes: any;
  labelNumber: number;
  label: any;
}

export const styles = ({ spacing }: Theme) =>
  createStyles({
    labelChip: {
      color: '#fff',
      backgroundColor: 'rgba(0, 80, 255, 0.7)',
      outline: 'none',
      border: 0,
      height: 54,
      width: 54,
      padding: 0,
      '&:hover': {
        backgroundColor: 'rgba(0, 80, 255, 0.9)'
      },
      fontSize: 26,
      position: 'absolute',
      bottom: spacing(2),
      right: spacing(2),
      cursor: 'pointer'
    },
    closeIcon: {
      fontSize: 30
    }
  });

class Label extends React.Component<Props, { isHover: boolean }> {
  state = {
    isHover: false
  };

  handleOnHover = () => {
    this.setState({ isHover: !this.state.isHover });
  };

  handleOnClick = () => {
    const { label, onRemove } = this.props;
    onRemove(label);
  };

  calculatePositionStyle(coordinates: any) {
    return {
      top: coordinates.startCoordinates.y,
      left: coordinates.startCoordinates.x
    };
  }

  calculateSizeStyle(coordinates: any) {
    return {
      width: coordinates.endCoordinates.x - coordinates.startCoordinates.x,
      height: coordinates.endCoordinates.y - coordinates.startCoordinates.y
    };
  }

  render() {
    const { isHover } = this.state;
    const { active, labelNumber, label, classes } = this.props;
    const positionStyle = this.calculatePositionStyle(label.image);
    const sizeStyle = this.calculateSizeStyle(label.image);
    const activeStyle = active ? { backgroundColor: 'rgba(0, 173, 255, 0.9)' } : {};
    return (
      <button
        onMouseEnter={this.handleOnHover}
        onMouseLeave={this.handleOnHover}
        onClick={this.handleOnClick}
        type="button"
        className={classes.labelChip}
        style={{ ...positionStyle, ...sizeStyle, ...activeStyle }}
      >
        <div>
          {!isHover ? (
            labelNumber
          ) : (
            <Zoom in={isHover}>
              <CloseIcon className={classes.closeIcon} />
            </Zoom>
          )}
        </div>
      </button>
    );
  }
}

export default withStyles(styles)(Label);
