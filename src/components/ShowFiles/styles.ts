import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

const dzShadow =
  '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)';

export const styles = ({ spacing }: Theme) =>
  createStyles({
    container: {
      marginTop: 20
    },
    paper: {
      padding: spacing.unit * 2,
      marginLeft: 10,
      marginRight: 10
    },
    actions: {
      float: 'right',
      height: 50
    },
    buttons: {
      marginRight: 10
    },
    dropzone: {
      margin: '0 auto',
      width: '100%',
      minHeight: 200,
      outlineWidth: 0
    },
    dropzoneComp: {
      width: '100%',
      border: '1px dashed rgba(0,0,0,0.2)',
      borderRadius: 6,
      textAlign: 'center'
    },
    dropzoneContent: {
      padding: '10px 100px',
      position: 'fixed',
      top: '60%',
      left: '35%',
      boxShadow: dzShadow,
      backgroundColor: '#fff',
      zIndex: 99
    },
    gridList: {
      width: '100%',
      transform: 'translateZ(0)'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    cloudIcon: {
      marginBottom: '-6px'
    }
  });
