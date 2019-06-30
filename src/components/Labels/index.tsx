import * as React from 'react';
import { Redirect } from 'react-router-dom';

// UI Imports
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// App imports
import LabelInput from './LabelInput';
import LabelList from './LabelList';
import { renderIf } from '../../utils/helpers';
import styles from './styles';
import { Label } from '../../types/Label';
import { FilesState, LabelState } from '../../types/States';

interface Props {
  add: (label: Label) => void;
  remove: (label: Label) => void;
  update: (label: Label) => void;
  selectLabel: (id: number) => void;
  classes: any;
  files: FilesState;
  labels: LabelState;
}

class LabelContainer extends React.Component<Props> {
  handleOnAddLabel = (label: Label) => {
    const { labels, files, add, selectLabel } = this.props;
    const newLabel: Label = {
      ...label,
      filename: files.file ? files.file : '',
      id: labels.lastId
    };
    add(newLabel);
    selectLabel(labels.lastId);
  };

  handleOnRemoveLabel = (label: Label) => {
    const { remove } = this.props;
    remove(label);
  };

  handleOnSelectLabel = (label: Label) => {
    const { selectLabel } = this.props;
    selectLabel(label.id);
  };

  handleOnChange = (text: string) => {
    const { update, labels: labelState, files: fileState } = this.props;
    const { file } = fileState;
    const { labels, label } = labelState;
    const actualLabel = labels[file][label];
    update({ ...actualLabel, text });
  };

  render() {
    const { files: fileList, labels: labelList, classes } = this.props;
    const { file, keys } = fileList;
    const { labels, label, keys: labelKeys } = labelList;
    if (file === '') {
      return <Redirect to="/" />;
    }
    const actualLabel = labels[file][label];

    return keys.length > 0 ? (
      <Grid container spacing={0} className={classes.containerLabels}>
        <Grid item style={{ width: '100%' }}>
          <LabelList
            file={file}
            keys={labelKeys}
            labels={labels[file]}
            onSelectLabel={this.handleOnSelectLabel}
            onAddLabel={this.handleOnAddLabel}
            onRemoveLabel={this.handleOnRemoveLabel}
          />
        </Grid>
        {actualLabel && (
          <Grid item style={{ width: '100%' }}>
            <Grid container spacing={0}>
              <LabelInput text={actualLabel.text} handleOnChange={this.handleOnChange} />
            </Grid>
          </Grid>
        )}
      </Grid>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withStyles(styles)(LabelContainer);
