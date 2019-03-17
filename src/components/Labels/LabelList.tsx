import * as React from 'react';
import classnames from 'classnames';

// UI Imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteIcon from '@material-ui/icons/Note';

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

interface Props {
  onAddLabel: (label: Label) => void;
  onRemoveLabel: (label: Label) => void;
  onSelectLabel: (label: Label) => void;
  classes: any;
  keys: LabelsKeys;
  labels: { [id: string]: Label };
  file: string;
}

class LabelList extends React.Component<Props> {
  handleOnSelectLabel = (key: string) => () => {
    const { labels, onSelectLabel } = this.props;
    if (labels[key] !== undefined) {
      onSelectLabel(labels[key]);
    }
  };

  handleOnRemoveLabel = (key: string) => () => {
    const { labels, onRemoveLabel } = this.props;
    if (labels[key] !== undefined) {
      onRemoveLabel(labels[key]);
    }
  };

  handleOnAddLabel = (type = 'normal') => () => {
    const { onAddLabel } = this.props;
    onAddLabel({ ...emptyLabel, type });
  };

  render() {
    const { keys, labels, file, classes } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Button onClick={this.handleOnAddLabel()} size="small" className={classes.margin}>
            <ChatBubbleIcon className={classes.actionIcon} />
            Add text
          </Button>
          <Button onClick={this.handleOnAddLabel('sfx')} size="small" className={classes.margin}>
            <SurroundSoundIcon className={classes.actionIcon} />
            Add sfx
          </Button>
          <Button onClick={this.handleOnAddLabel('tln')} size="small" className={classes.margin}>
            <NoteIcon className={classes.actionIcon} />
            Add note
          </Button>
        </Grid>
        <Grid container spacing={0}>
          <Table className={classes.table}>
            <TableBody>
              {keys[file].map(key => (
                <TableRow
                  key={`label-${key}`}
                  hover
                  className={classes.tableRow}
                  onClick={this.handleOnSelectLabel(key)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={classnames(classes[`row${labels[key].type}`], classes.textCell)}
                  >
                    {labels[key].text}
                  </TableCell>
                  {/*<TableCell style={{ padding: '1px' }}>{labels[key].type}</TableCell>*/}
                  <TableCell align="right" className={classes.deleteCell}>
                    <IconButton
                      onClick={this.handleOnRemoveLabel(key)}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <DeleteIcon />
                    </IconButton>
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
