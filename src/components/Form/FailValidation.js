import React from 'react';
import {Alert} from '@material-ui/lab';
import PropTypes from 'prop-types';

function FailValidation(props) {
  return (
    <Alert style={{padding: '0px 8px', height: 36}} severity="error">
      {props.error}
    </Alert>
  );
}

FailValidation.propTypes = {error: PropTypes.any};

export default FailValidation;
