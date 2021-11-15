// React y Redux.
import React from 'react';
import {reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getData, formEditChangeInput, formEditSubmit, formEditResetValues} from '../usuarios/store/actions';
// Componentes de Material-ui.
import {FusePageCarded} from '@fuse';
// Componentes de formulario.
import Footer from '../../../components/Form/Footer';
import FieldsSection from '../../../components/Form/FieldSection';
import {
  obtenerConfguracionUsuario0,
  obtenerConfguracionUsuario1
} from '../usuarios/UsuariosConfig';
// Otros.
import _ from '@lodash';
import EdicionHeader from './EdicionHeader';

const classes = {
  toolbar: 'p-0',
  header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
};

class Edicion extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  componentDidMount() {
    this.props.getData(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.formEditResetValues();
  }

  onSubmit() {
    this.validateFields();
    this.props.formEditSubmit(this.props.history);
  }

  validateFields() {
    const {
      formEdit
    } = this.props;
    let errors = {};
    _.each(formEdit.values, (value, key) => {
      if (formEdit.requiredValues[key] && _.isEmpty(value)) {
        errors = {
          ...errors,
          [key]: 'Campo obligatorio'
        };
      }
    });
    if (!_.isEmpty(formEdit.values.contrasenha0) && formEdit.values.contrasenha0.length < 6) {
      errors = {
        ...errors,
        contrasenha0: 'La contraseña debe tener como mínima 6 caracteres'
      };
    } else if (!_.isEmpty(formEdit.values.contrasenha0) && formEdit.values.contrasenha0 !== formEdit.values.contrasenha1) {
      errors = {
        ...errors,
        contrasenha1: 'La confirmación debe coincidir con la contraseña'
      };
    }
    if (!_.isEmpty(errors)) {
      throw new SubmissionError({
        ...errors,
        _error: 'Error al editar el Usuario...'
      });
    }
  }

  render() {
    const {
      props: {
        error,
        formEdit,
        clearAsyncError,
        handleSubmit,
        formEditChangeInput
      },
      onSubmit
    } = this;
    const fields0 = obtenerConfguracionUsuario0(formEditChangeInput, formEdit);
    const fields1 = obtenerConfguracionUsuario1(formEditChangeInput, formEdit);
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FusePageCarded
          classes={classes}
          header={<EdicionHeader isSubmiting={formEdit.isSubmiting}/>}
          content={
            <div className="p-16 sm:p-24 max-w-2xl">
              <FieldsSection
                fieldsGroup={fields0}
                clearAsyncError={clearAsyncError}/>
              <div className='mb-8'/>
              <div className='mb-8'/>
              <h4>Cambiar Contraseña</h4>
              <div className='mb-8'/>
              <FieldsSection
                fieldsGroup={fields1}
                clearAsyncError={clearAsyncError}/>
              <Footer
                submitting={formEdit.isSubmiting}
                error={error || formEdit.error}
                success={formEdit.success}/>
            </div>
          }/>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const {formEdit} = state.usuarios;
  return {formEdit};
};

const UsuarioConnected = connect(
  mapStateToProps,
  {
    getData,
    formEditChangeInput,
    formEditSubmit,
    formEditResetValues
  }
)(withRouter(Edicion));

export default reduxForm({
  form: 'formEditUsuario'
})(UsuarioConnected);
