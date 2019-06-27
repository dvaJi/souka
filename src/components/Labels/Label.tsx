// @flow
import * as React from 'react';

// UI Imports
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props {
  onRemove: () => void;
  classes: any;
  labelNumber: number;
  label: any;
}

export const styles = ({ spacing }: Theme) =>
  createStyles({
    labelChip: {
      color: '#fff',
      backgroundColor: '#2196f3',
      outline: 'none',
      border: 0,
      height: 54,
      width: 54,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#0c83e4'
      },
      fontSize: 26,
      position: 'absolute',
      bottom: spacing.unit * 2,
      right: spacing.unit * 2,
      cursor: 'pointer'
    },
    closeIcon: {
      left: 13,
      bottom: 12,
      position: 'absolute',
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

  render() {
    const { isHover } = this.state;
    const { labelNumber, label, classes, onRemove } = this.props;
    const positionStyle = { top: label.image.y, left: label.image.x };
    return (
      <button
        onMouseEnter={this.handleOnHover}
        onMouseLeave={this.handleOnHover}
        type="button"
        className={classes.labelChip}
        style={positionStyle}
      >
        <div>
          <Zoom in={isHover}>
            <CloseIcon className={classes.closeIcon} />
          </Zoom>
          {!isHover && labelNumber}
        </div>
      </button>
    );
  }
}

export default withStyles(styles)(Label);
