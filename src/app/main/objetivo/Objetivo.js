import React, {useEffect} from 'react';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, SubmissionError} from 'redux-form';
import {withRouter} from 'react-router';
import FieldsSection from '../../../components/Form/FieldSection';
import {obtenerConfiguracionDeFormObjetivo} from '../objetivo/ObjetivoConfig';
import _ from 'lodash';
import {FusePageCarded} from '@fuse';
import Header from './Header';
import Footer from '../../../components/Form/Footer';
import {formCreateChangeInput, formCreateSubmit} from "../usuarios/store/actions";


const Objetivo = props => {
  const {
    match: {params: {idDeObjetivo}}, objetivo: {formEdit}, handleSubmit,
    formChangeInput, resetForm, clearAsyncError, error
  } = props;
  const id = idDeObjetivo !== 'crear' ? idDeObjetivo : false;


  useEffect(() => {
    if (id) {
      props.getData(id);
    }
    return () => {
      props.resetForm();
    };
  }, []);
  const validateFields = () => {
    const {objetivo: {formEdit}} = props;
    let errors = {};
    _.each(formEdit.values, (value, key) => {

      if (formEdit.requiredValues[key] && _.isEmpty(value) && value === '') {

        errors = {...errors, [key]: 'Campo obligatorio'};
      }
    });
    if (!_.isEmpty(errors)) {
      throw new SubmissionError({
        ...errors, _error: 'Error al editar...'
      });
    }
  };
  const onSubmit = () => {
    validateFields();
    props.formSubmit(props.history, id);
  };
  const fields = obtenerConfiguracionDeFormObjetivo(formChangeInput, formEdit);
  return (
    < form
  onSubmit = {handleSubmit(onSubmit)} >
    < FusePageCarded
  header = { < Header
  isSubmiting = {formEdit.isSubmiting}
  />}
  content = {
    < div >
    < div
  className = "p-24" >
    < FieldsSection
  fieldsGroup = {fields}
  clearAsyncError = {clearAsyncError}
  />
  < div
  className = 'mb-8' / >
    < /div>
    < Footer
  submitting = {formEdit.isSubmitting}
  error = {error || formEdit.error
}
  success = {formEdit.success}
  />
  < /div>
}
  />
  < /form>
)
  ;
};

function mapStateToProps({objetivo}) {
  return {objetivo};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData: Actions.getData,
      formChangeInput: Actions.formChangeInput,
      formSubmit: Actions.formSubmit,
      resetForm: Actions.resetForm
    },
    dispatch
  );
}

export default reduxForm({
  form: 'formObjetivo'
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Objetivo)));
