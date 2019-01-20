import { connect } from 'react-redux';
import TranslateFile from '../components/TranslateFile';
import * as FileActions from '../actions/files';
import { RootState } from '../types/States';

function mapStateToProps({ files, labels }: RootState) {
  return {
    files,
    labels
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    select: (filename: string) => dispatch(FileActions.select(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateFile);
