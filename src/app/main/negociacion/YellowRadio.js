import withStyles from '@material-ui/core/styles/withStyles';
import {yellow} from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import React from 'react';

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600]
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />);

export default YellowRadio;
