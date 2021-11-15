import {Button, Paper, Typography} from '@material-ui/core';
import FieldsSection from '../../../components/Form/FieldSection';
import * as PropTypes from 'prop-types';
import React from 'react';
import {
  opcionesDeNegociacion,
  opcionesDeNegociacionDetalle
} from '../negociaciones/NegociacionesConfig';
import Collapse from '@material-ui/core/Collapse';
import {separadorDeMiles} from '../UIUtils';

function Aprobacion(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [labelButton, setLabelButton] = React.useState('Más');
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setLabelButton(expanded ? 'Más' : 'Menos');
  };
  const formOpcionesNegociacion = opcionesDeNegociacion(props.formEditChangeInput, props.formEdit);
  const formOpcionesNegociacionDetalle = opcionesDeNegociacionDetalle(props.formEditChangeInput, props.formEdit);
  let renovacion = props.formEdit.values.esRenovacion;
  renovacion = renovacion === null ? 'Sin dato' : renovacion ? 'Sí' : 'No';
  let formaDePago = props.formEdit.values.formaDePago;
  formaDePago = formaDePago ? formaDePago.replace(/_/g, ' ') : 'Sin dato';
  const detalle =
    <>
      <span>Renovación: {renovacion}</span> • <span>Forma de pago: {formaDePago}</span>
    </>;
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div
        className="flex items-center justify-between px-4 pt-4"
        style={{minHeight: 52}}>
        <Typography className="text-16 px-12">
          Aprobación y Fecha
        </Typography>
      </div>
      <div style={{margin: 16}}>
        <Typography className="text-14">
          Legajo Visitador: {props.formEdit.values.legajoVisitador}
        </Typography>
      </div>
      <div style={{margin: 16}}>
        <FieldsSection
          fieldsGroup={formOpcionesNegociacion}
          clearAsyncError={props.clearAsyncError}/>
      </div>
      <div
        style={{
          marginTop: 0,
          marginLeft: 16,
          marginRight: 16
        }}>
        <div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleExpandClick}
            style={{marginBottom: 8}}>
            {labelButton}
          </Button>
          {
            !expanded &&
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom>
              {detalle}
            </Typography>
          }
        </div>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit>
          <div>
            <FieldsSection
              fieldsGroup={formOpcionesNegociacionDetalle}
              clearAsyncError={props.clearAsyncError}/>
          </div>
        </Collapse>
      </div>
    </Paper>
  );
}

Aprobacion.propTypes = {
  formEditChangeInput: PropTypes.any,
  formEdit: PropTypes.any,
  clearAsyncError: PropTypes.any
};

export default Aprobacion;
