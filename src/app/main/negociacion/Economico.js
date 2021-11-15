import {Button, Paper, Typography} from '@material-ui/core';
import FieldsSection from '../../../components/Form/FieldSection';
import * as PropTypes from 'prop-types';
import React from 'react';
import {obtenerConfguracionConceptoInfoFormTipoEconomico} from '../negociaciones/NegociacionesConfig';
import Collapse from '@material-ui/core/Collapse';
import {monedas, separadorDeMiles} from '../UIUtils';

function Economico(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [labelButton, setLabelButton] = React.useState('Más');
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setLabelButton(expanded ? 'Más' : 'Menos');
  };
  const {formEditChangeInput, formEdit, clearAsyncError} = props;
  const {values: {aporteEconomico: {montoDeAporteEconomico, monedaDeAporteEconomico, cantidadDePagos}}} = formEdit;
  const formTipoEconomico = obtenerConfguracionConceptoInfoFormTipoEconomico(formEditChangeInput, formEdit);
  const monedaDescrpcion = monedas.find(e => e.value === monedaDeAporteEconomico);
  const detalle = montoDeAporteEconomico ?
    <>
      <span>Monto: {separadorDeMiles(montoDeAporteEconomico)} {monedaDescrpcion?monedaDescrpcion.label : ""}</span><br/>
      <span>Cantidad de pagos: {cantidadDePagos}</span>
    </> :
    'Sin dato';
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div
        className="flex items-center justify-between px-4 pt-4"
        style={{minHeight: 52}}>
        <div>
          <Typography className="text-16 px-12">Aporte</Typography>
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
            fieldsGroup={formTipoEconomico}
            clearAsyncError={clearAsyncError}/>
        </div>
      </Collapse>
    </Paper>
  );
}

Economico.propTypes = {
  formEditChangeInput: PropTypes.any,
  formEdit: PropTypes.any,
  clearAsyncError: PropTypes.any
};

export default Economico;
