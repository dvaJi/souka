import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) =>
  createStyles({
    image: {
      maxWidth: '100%',
      paddingTop: 10
    },
    container: {
      width: '100vw',
      height: '100%',
      overflow: 'auto',
      display: 'block',
      justifyContent: 'center',
      textAlign: 'center',
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
