import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RootState } from '../types/States';

import ShowFiles from '../components/ShowFiles';
import * as FilesActions from '../actions/files';

function mapStateToProps({ files, router }: RootState, own: any) {
  return {
    files,
    router,
    location: own.location
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    select: (filename: string) => dispatch(FilesActions.select(filename)),
    add: (file: File) => dispatch(FilesActions.add(file)),
    addAll: (files: File[]) => dispatch(FilesActions.addAll(files)),
    remove: (file: File | any) => dispatch(FilesActions.remove(file)),
    removeAll: () => dispatch(FilesActions.removeAll())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowFiles));
