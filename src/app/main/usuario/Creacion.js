// React y Redux.
import React from 'react';
import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
  formCreateChangeInput,
  formCreateSubmit
} from '../usuarios/store/actions';
// Componentes de Material-ui.
import {FusePageCarded} from '@fuse';
// Componentes de formulario.
import CreacionHeader from './CreacionHeader';
import Footer from '../../../components/Form/Footer';
import FieldsSection from '../../../components/Form/FieldSection';
import {
  obtenerConfguracionUsuario0,
  obtenerConfguracionUsuario1
} from '../usuarios/UsuariosConfig';
// Otros.
import _ from '@lodash';

const classes = {
  toolbar: 'p-0',
  header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
};

class Creacion extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  onSubmit() {
    this.validateFields();
    this.props.formCreateSubmit(this.props.history);
  }

  validateFields() {
    const {
      formCreate
    } = this.props;
    let errors = {};
    _.each(formCreate.values, (value, key) => {
      if (formCreate.requiredValues[key] && _.isEmpty(value)) {
        errors = {
          ...errors,
          [key]: 'Campo obligatorio'
        };
      }
    });
    if (formCreate.values.contrasenha0.length < 6) {
      errors = {
        ...errors,
        contrasenha0: 'La contraseña debe tener como mínima 6 caracteres'
      };
    } else if (formCreate.values.contrasenha0 !== formCreate.values.contrasenha1) {
      errors = {
        ...errors,
        contrasenha1: 'La confirmación debe coincidir con la contraseña'
      };
    }
    if (!_.isEmpty(errors)) {
      throw new SubmissionError({
        ...errors,
        _error: 'Error al crear el Usuario...'
      });
    }
  }

  render() {
    const {
      props: {
        error,
        formCreate,
        clearAsyncError,
        handleSubmit,
        formCreateChangeInput
      },
      onSubmit
    } = this;
    const fields0 = obtenerConfguracionUsuario0(formCreateChangeInput, formCreate);
    const fields1 = obtenerConfguracionUsuario1(formCreateChangeInput);
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FusePageCarded
          classes={classes}
          header={<CreacionHeader isSubmiting={formCreate.isSubmiting}/>}
          content={
            <div className="p-16 sm:p-24 max-w-2xl">
              <FieldsSection
                fieldsGroup={fields0}
                clearAsyncError={clearAsyncError}/>
              <div className='mb-8'/>
              <FieldsSection
                fieldsGroup={fields1}
                clearAsyncError={clearAsyncError}/>
              <Footer
                submitting={formCreate.isSubmiting}
                error={error || formCreate.error}
                success={formCreate.success}/>
            </div>
          }/>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const {formCreate} = state.usuarios;
  return {formCreate};
};

const UsuarioConnected = connect(
  mapStateToProps,
  {formCreateChangeInput, formCreateSubmit}
)(withRouter(Creacion));

export default reduxForm({
  form: 'formUsuario'
})(UsuarioConnected);
