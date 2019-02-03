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

type State = {
  availableHeight: number;
};

const GoBackLink = (props: any) => <Link to={routes.HOME} {...props} />;

export default class TranslateFile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      availableHeight: 570
    };

    this.handleAvailableHeight = this.handleAvailableHeight.bind(this);
  }

  componentDidMount() {
    this.handleAvailableHeight();
    window.addEventListener('resize', this.handleAvailableHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleAvailableHeight);
  }

  handleAvailableHeight() {
    let winH = 460;
    if (document.body && document.body.offsetWidth) {
      winH = document.body.offsetHeight;
    }
    if (
      document.compatMode === 'CSS1Compat' &&
      document.documentElement &&
      document.documentElement.offsetWidth
    ) {
      winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
      winH = window.innerHeight;
    }

    const headerHeight = 97;
    const extraBitForIe8 = 0;
    const availableHeight = winH - headerHeight - extraBitForIe8;
    this.setState({ availableHeight });
  }

  render() {
    const { availableHeight } = this.state;
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
            {file && <ImageViewer image={files[file]} availableHeight={availableHeight - 105} />}
            <MiniGallery
              images={files}
              selected={files[file]}
              keys={keys}
              select={select}
              availableHeight={105}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}
