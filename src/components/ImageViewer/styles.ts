import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) =>
  createStyles({
    image: {
      padding: 5,
      maxWidth: '100%'
    },
    container: {
      height: 465,
      width: '100vw',
      overflow: 'auto',
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
    },
    fab: {
      position: 'absolute',
      bottom: spacing.unit * 2,
      right: spacing.unit * 2
    }
  });

export default styles;
