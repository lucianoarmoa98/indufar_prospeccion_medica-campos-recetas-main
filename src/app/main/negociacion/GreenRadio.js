import withStyles from '@material-ui/core/styles/withStyles';
import {green} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import React from 'react';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);

export default GreenRadio;
