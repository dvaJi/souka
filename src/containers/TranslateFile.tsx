import { connect } from 'react-redux';
import TranslateFile from '../components/TranslateFile';
import * as FileActions from '../actions/files';
import * as LabelActions from '../actions/labels';
import { RootState } from '../types/States';
import { Label } from '../types/Label';

function mapStateToProps({ files, labels }: RootState) {
  return {
    files,
    labels
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    select: (filename: string) => dispatch(FileActions.select(filename)),
    addLabel: (label: Label) => dispatch(LabelActions.add(label)),
    removeLabel: (label: Label) => dispatch(LabelActions.remove(label)),
    selectLabel: (id: number) => dispatch(LabelActions.selectLabel(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateFile);
