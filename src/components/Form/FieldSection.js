import React from 'react';
import _ from '@lodash';
import * as PropTypes from 'prop-types';
import {Field} from 'redux-form';
import {Grid} from '@material-ui/core';

function FieldsSection(props) {
  const {clearAsyncError, fieldsGroup} = props;
  return (
    <Grid container spacing={3}>
      {
        _.map(fieldsGroup, (value, key) => {
          return (
            <Grid
              key={key}
              item
              xs={12}
              sm={value.col ? value.col : 6}
              style={{paddingBottom: 0, paddingTop: 0}}>
              <Field
                {...value}
                clearAsyncError={clearAsyncError}/>
            </Grid>
          );
        })
      }
    </Grid>
  );
}

FieldsSection.propTypes = {
  fieldsGroup: PropTypes.arrayOf(PropTypes.any),
  clearAsyncError: PropTypes.any
};

export default FieldsSection;
