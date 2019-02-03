import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export default ({ spacing }: Theme) =>
  createStyles({
    image: {
      height: 500,
      margin: 5
    },
    labelChip: {
      margin: spacing.unit
    },
    tableRow: {
      cursor: 'pointer'
    },
    actionIcon: {
      fontSize: 14,
      marginRight: 5
    },
    textCell: {
      wordWrap: 'break-word',
      maxWidth: 120,
      textOverflow: 'ellipsis',
      padding: '4px 10px'
    },
    deleteCell: {
      width: 48,
      padding: 4,
      paddingRight: '4px !important'
    },
    rownormal: {
      borderLeft: '2px solid yellow',
      '&:hover': {
        borderLeft: '3px solid yellow'
      }
    },
    rowsfx: {
      borderLeft: '2px solid green',
      '&:hover': {
        borderLeft: '3px solid green'
      }
    },
    rowtln: {
      borderLeft: '2px solid blue',
      '&:hover': {
        borderLeft: '3px solid blue'
      }
    },
    textArea: {}
  });
