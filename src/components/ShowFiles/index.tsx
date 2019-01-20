import * as React from 'react';
import Dropzone from 'react-dropzone';
import { History } from 'history';

// UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Grow from '@material-ui/core/Grow';

// App imports
import { renderIf } from '../../utils/helpers';
import { styles } from './styles';
import routes from '../../constants/routes';
import { FilesState } from '../../types/States';

type Props = {
  init: (keys: string[]) => void;
  select: (filename: string) => void;
  add: (file: File) => void;
  addAll: (files: File[]) => void;
  remove: (file: File | any) => void;
  removeAll: () => void;
  classes: any;
  files: FilesState;
  history: History;
};

class ShowFiles extends React.Component<Props> {
  onDrop(files: File[]) {
    const { addAll } = this.props;
    const filesFormatted = files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        filename: file.name
      })
    );
    addAll(filesFormatted);
  }

  async selectFile() {
    const { select, init, files, history } = this.props;
    await init(files.keys);
    await select(files.keys[0]);
    history.push(routes.TRANSLATE_FILE);
  }

  render() {
    const { classes, remove, removeAll, files } = this.props;
    const hasFiles = files.keys.length > 0;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grow in timeout={500}>
            <Typography component="h2" variant="h1" align="center" gutterBottom>
              Drop files
            </Typography>
          </Grow>
        </Grid>

        <Grid item xs={12}>
          <Grow in timeout={200}>
            <Paper className={classes.paper}>
              <div className={classes.actions}>
                <Button
                  onClick={this.selectFile.bind(this)}
                  color="primary"
                  variant="contained"
                  className={classes.buttons}
                  disabled={!hasFiles}
                >
                  <EditIcon />
                  Translate
                </Button>
                <Button
                  onClick={removeAll}
                  color="secondary"
                  variant="contained"
                  className={classes.buttons}
                  disabled={!hasFiles}
                >
                  <DeleteIcon />
                  Remove All
                </Button>
              </div>
              <div className={classes.dropzone}>
                <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)} disableClick>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div className={classes.dropzone} {...getRootProps()}>
                      <input {...getInputProps()} />

                      <Grow in={!hasFiles || isDragActive}>
                        <div className={classes.dropzoneContent}>
                          <Typography variant="overline" gutterBottom>
                            <CloudIcon className={classes.cloudIcon} /> Drop your files here
                          </Typography>
                        </div>
                      </Grow>

                      {renderIf(hasFiles, () => (
                        <GridList cellHeight={180} className={classes.gridList} cols={4}>
                          {files.keys.map((key: string) => (
                            <GridListTile key={files.files[key].name}>
                              <img alt={files.files[key].name} src={files.files[key].preview} />
                              <GridListTileBar
                                title={files.files[key].name}
                                subtitle={<span>by: {files.files[key].size}</span>}
                                actionIcon={
                                  <IconButton className={classes.icon}>
                                    <DeleteIcon onClick={() => remove(files.files[key])} />
                                  </IconButton>
                                }
                              />
                            </GridListTile>
                          ))}
                        </GridList>
                      ))}
                    </div>
                  )}
                </Dropzone>
              </div>
            </Paper>
          </Grow>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ShowFiles);
