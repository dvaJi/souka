import * as React from 'react';

// UI Imports
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';
import { Label } from '../../types/Label';
import { LabelsKeys } from '../../types/States';

const emptyLabel: Label = {
  id: 1,
  text: '',
  type: 'normal',
  filename: ''
};

type Props = {
  onAddLabel: (label: Label) => void;
  onRemoveLabel: (label: Label) => void;
  onSelectLabel: (label: Label) => void;
  classes: any;
  keys: LabelsKeys;
  labels: { [id: string]: Label };
  file: string;
};

class LabelList extends React.Component<Props> {
  handleOnSelectLabel = (key: string) => {
    const { labels, onSelectLabel } = this.props;
    if (labels[key] !== undefined) {
      onSelectLabel(labels[key]);
    }
  };

  handleOnRemoveLabel = (key: string) => {
    const { labels, onRemoveLabel } = this.props;
    if (labels[key] !== undefined) {
      onRemoveLabel(labels[key]);
    }
  };

  render() {
    const { keys, labels, file, classes, onAddLabel } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <button onClick={() => onAddLabel(emptyLabel)} type="button">
            Add text
          </button>
          <button onClick={() => onAddLabel({ ...emptyLabel, type: 'sfx' })} type="button">
            Add sfx
          </button>
          <button onClick={() => onAddLabel({ ...emptyLabel, type: 'tln' })} type="button">
            Add note
          </button>
        </Grid>
        <Grid container spacing={0}>
          <Table className={classes.table}>
            <TableBody>
              {keys[file].map(key => (
                <TableRow
                  key={`label-${key}`}
                  hover
                  className={classes.tableRow}
                  onClick={() => this.handleOnSelectLabel(key)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes[`row${labels[key].type}`]}
                  >
                    {labels[key].text}
                  </TableCell>
                  <TableCell style={{ padding: '1px' }}>{labels[key].type}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => this.handleOnRemoveLabel(key)} type="button">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LabelList);
