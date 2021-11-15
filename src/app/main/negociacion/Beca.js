import {Button, Paper, Typography} from '@material-ui/core';
import FieldsSection from '../../../components/Form/FieldSection';
import * as PropTypes from 'prop-types';
import React from 'react';
import {obtenerConfguracionConceptoInfoFormTipoEvento} from '../negociaciones/NegociacionesConfig';
import Collapse from '@material-ui/core/Collapse';
import {monedas} from '../UIUtils';

function Beca(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [labelButton, setLabelButton] = React.useState('Más');
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setLabelButton(expanded ? 'Más' : 'Menos');
  };
  const {formEditChangeInput, formEdit, clearAsyncError} = props;
  const {values: {pedidoDeBeca: {montoDeBeca, monedaDeBeca, evento, lugar}}} = formEdit;
  const formTipoEvento = obtenerConfguracionConceptoInfoFormTipoEvento(formEditChangeInput, formEdit);
  const monedaDescrpcion = monedas.find(e => e.value === monedaDeBeca);
  const detalle = evento ?
    <>
      <span>Evento: {evento}</span><br/>
      {
        montoDeBeca && monedaDescrpcion &&
        <><span>Costo: {montoDeBeca} {monedaDescrpcion.label}</span> < br/></>
      }
      <span>Lugar: {lugar}</span>
    </> :
    'Sin dato';
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div
        className="flex items-center justify-between px-4 pt-4"
        style={{minHeight: 52}}>
        <div>
          <Typography className="text-16 px-12">Beca</Typography>
          {
            !expanded && detalle &&
            <Typography
              variant="body2"
              className='px-12'
              color="textSecondary"
              gutterBottom>
              {detalle}
            </Typography>
          }
        </div>
        <div style={{
          alignSelf: 'start',
          display: 'flex',
          flexDirection: 'row-reverse'
        }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleExpandClick}
            style={{marginRight: 16, marginTop: 8}}>
            {labelButton}
          </Button>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div style={{margin: 16}}>
          <FieldsSection
            fieldsGroup={formTipoEvento}
            clearAsyncError={clearAsyncError}/>
        </div>
      </Collapse>
    </Paper>
  );
}

Beca.propTypes = {
  formEditChangeInput: PropTypes.any,
  formEdit: PropTypes.any,
  clearAsyncError: PropTypes.any
};

export default Beca;
