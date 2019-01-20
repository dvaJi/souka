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
