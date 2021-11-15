import React from 'react';
import {LinearProgress} from '@material-ui/core';
import PropTypes from 'prop-types';

function Submiting(props) {
  const text = props.text || 'Procesando datos...';
  const style = props.style || {};
  return (
    <div style={{height: 36, ...style}}>
      <i>{text}</i>
      <LinearProgress
        className="w-xs"
        color="secondary"
        style={{width: '100%'}}/>
    </div>
  );
}

Submiting.propTypes = {
  text: PropTypes.any,
  style: PropTypes.any
};

export default Submiting;
