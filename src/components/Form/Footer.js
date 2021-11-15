import React from 'react';
import Pad from './Pad';
import FailValidation from './FailValidation';
import Submiting from './Submiting';
import SuccessValidation from './SuccessValidation';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {submitting, error, success} = props;
  if (submitting) {
    return <Submiting/>;
  }
  if (success) {
    return <SuccessValidation/>;
  }
  if (error) {
    return <FailValidation error={error}/>;
  }
  return <Pad/>;
};

Footer.propTypes = {
  submitting: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any
};

export default Footer;
