import * as React from 'react';

// UI Imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// App imports
import styles from './styles';

type Props = {
  handleOnChange: (text: string) => void;
  classes: any;
  text: string;
};

function LabelInput(props: Props) {
  const { text, classes, handleOnChange } = props;
  return (
    <div style={{ width: '100%', padding: '10px 20px' }}>
      <TextField
        multiline
        id="label-translate"
        label="Translation"
        rowsMax="4"
        className={classes.textArea}
        value={text}
        onChange={e => handleOnChange(e.target.value)}
        margin="normal"
        spellCheck
        fullWidth
      />
    </div>
  );
}

export default withStyles(styles)(React.memo(LabelInput));
