import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) =>
  createStyles({
    image: {
      maxWidth: '100%',
      userDrag: 'none',
      userSelect: 'none'
    },
    container: {
      width: '100vw',
      height: '100%',
      overflow: 'auto',
      display: 'block',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      zIndex: 1,
      position: 'sticky'
    },
    fab: {
      position: 'absolute',
      bottom: spacing(2),
      right: spacing(2)
    }
  });

export default styles;
