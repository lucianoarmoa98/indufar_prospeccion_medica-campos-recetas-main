import withStyles from '@material-ui/core/styles/withStyles';
import {red} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import React from 'react';

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);

export default RedRadio;
