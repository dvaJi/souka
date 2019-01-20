import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

// App imports
import routes from '../constants/routes';
import ImageViewer from './ImageViewer';
import MiniGallery from './MiniGallery';
import LabelContainer from '../containers/LabelContainer';
import { FilesState, LabelState } from '../types/States';

type Props = {
  select: (id: string) => void;
  files: FilesState;
  labels: LabelState;
};

const GoBackLink = (props: any) => <Link to={routes.HOME} {...props} />;

export default class TranslateFile extends React.Component<Props> {
  render() {
    const { files: fileList, select } = this.props;
    const { files, file, keys } = fileList;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <IconButton component={GoBackLink} color="inherit" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            {file && <ImageViewer image={files[file]} />}
            <MiniGallery images={files} keys={keys} select={select} />
          </Grid>
          <Grid item xs={4}>
            <LabelContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}
