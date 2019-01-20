import { connect } from 'react-redux';
import LabelComponent from '../components/Labels';
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
    add: (label: Label) => dispatch(LabelActions.add(label)),
    selectLabel: (id: number) => dispatch(LabelActions.selectLabel(id)),
    remove: (label: Label) => dispatch(LabelActions.remove(label)),
    update: (label: Label) => dispatch(LabelActions.update(label))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelComponent);
