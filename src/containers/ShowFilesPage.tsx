import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RootState } from '../types/States';

import ShowFiles from '../components/ShowFiles';
import * as FilesActions from '../actions/files';
import * as LabelActions from '../actions/labels';

function mapStateToProps({ files, router }: RootState, own: any) {
  return {
    files,
    router,
    location: own.location
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    init: (keys: string[]) => dispatch(LabelActions.init(keys)),
    select: (filename: string) => dispatch(FilesActions.select(filename)),
    add: (file: File) => dispatch(FilesActions.add(file)),
    addAll: (files: File[]) => dispatch(FilesActions.addAll(files)),
    remove: (file: File | any) => dispatch(FilesActions.remove(file)),
    removeAll: () => dispatch(FilesActions.removeAll())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ShowFiles)
);
