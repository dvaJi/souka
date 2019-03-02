import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import { Theme, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

// App imports
import routes from '../constants/routes';
import ImageViewer from './ImageViewer';
import MiniGallery from './MiniGallery';
import LabelContainer from '../containers/LabelContainer';
import { FilesState, LabelState } from '../types/States';
import { exportFile } from '../utils/helpers';

type Props = {
  select: (id: string) => void;
  files: FilesState;
  labels: LabelState;
  classes: any;
};

type State = {
  translationName: string;
  isTLNameModalOpen: boolean;
  availableHeight: number;
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = (theme: Theme): any => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
});

const GoBackLink = (props: any) => <Link to={routes.HOME} {...props} />;

class TranslateFile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      translationName: '',
      isTLNameModalOpen: false,
      availableHeight: 570
    };

    this.handleAvailableHeight = this.handleAvailableHeight.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateFile = this.generateFile.bind(this);
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

  handleInputChange(e: React.SyntheticEvent) {
    const element = e.target as HTMLInputElement;
    this.setState({ translationName: element.value });
  }

  generateFile() {
    let file = '';
    const keys = Object.keys(this.props.labels.labels);
    keys.forEach(key => {
      file += `\n>>>>>>>>[${key}]<<<<<<<<\n`;
      const labels = this.props.labels.labels[key];
      const labelsKeys = Object.keys(this.props.labels.labels[key]);
      labelsKeys.forEach(ki => {
        // file += `----------------[${ki}]----------------\n`;
        if (labels[ki].type !== 'normal') {
          file += `${labels[ki].type}: `;
        }
        file += `${labels[ki].text}\n`;
      });
    });

    exportFile(this.state.translationName, file);
    this.handleModalToggle();
  }

  handleModalToggle() {
    this.setState({ isTLNameModalOpen: !this.state.isTLNameModalOpen });
  }

  render() {
    const { availableHeight, translationName, isTLNameModalOpen } = this.state;
    const { files: fileList, select, classes } = this.props;
    const { files, file, keys } = fileList;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar style={{ justifyContent: 'space-between' }} variant="dense">
            <IconButton
              component={GoBackLink}
              color="inherit"
              aria-label="Menu"
            >
              <ArrowBackIcon />
            </IconButton>
            <Button color="primary" onClick={this.handleModalToggle}>
              <SaveIcon />
              Export
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            {file && (
              <ImageViewer
                image={files[file]}
                availableHeight={availableHeight - 105}
              />
            )}
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
        <Modal open={isTLNameModalOpen} onClose={this.handleModalToggle}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              File name
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              <TextField
                id="standard-name"
                label="Name"
                value={translationName}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </Typography>

            <Button onClick={this.generateFile}>Save</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TranslateFile);
