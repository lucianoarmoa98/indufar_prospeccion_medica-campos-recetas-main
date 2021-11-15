import {Paper, Typography} from '@material-ui/core';
import FieldsSection from '../../../components/Form/FieldSection';
import * as PropTypes from 'prop-types';
import React from 'react';
import {obtenerConfguracionConceptoInfoComentarios} from '../negociaciones/NegociacionesConfig';
import UsuarioContext from "../../UsuarioContext";

function Comentarios(props) {
  const seccionComentarios = obtenerConfguracionConceptoInfoComentarios(props.formEditChangeComentario, props.formEdit, props.disabled);
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div
        className="flex items-center justify-between px-4 pt-4"
        style={{minHeight: 52}}>
        <Typography
          className="text-16 px-12">Comentarios</Typography>
      </div>
      <div style={{margin: 16}}>
        <FieldsSection
          fieldsGroup={seccionComentarios}
          clearAsyncError={props.clearAsyncError}/>
      </div>
    </Paper>
  );
  }

Comentarios.propTypes = {
  formEditChangeComentario: PropTypes.any,
  formEdit: PropTypes.any,
  clearAsyncError: PropTypes.any
};

export default Comentarios;
