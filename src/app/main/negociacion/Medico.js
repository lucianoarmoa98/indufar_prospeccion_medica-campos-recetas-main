import {Button, Paper, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as PropTypes from 'prop-types';
import React from 'react';
import {blue} from '@material-ui/core/colors';
import {obtenerConfguracionMedico} from '../negociaciones/NegociacionesConfig';
import FieldsSection from '../../../components/Form/FieldSection';
import Collapse from '@material-ui/core/Collapse';

function Medico(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [labelButton, setLabelButton] = React.useState('Más');
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setLabelButton(expanded ? 'Más' : 'Menos');
  };
  const {history, formEdit, clearAsyncError, formEditChangeInput, changeDiaDeTrabajo} = props;
  const {values: {medico}} = formEdit;
  const seccionMedico = obtenerConfguracionMedico(formEditChangeInput, changeDiaDeTrabajo, formEdit);
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-4 pt-4"
           style={{minHeight: 52}}>
        <Typography className="text-16 px-12">Médico</Typography>
        <div>
          <a href={`/medicos/${medico.codigoMedicoRegion}`} target='_blank'
             style={{marginRight: 16, color: blue['500']}}>Ver Prospección</a>
          <a
            href={`/medicos/${medico.codigoMedicoRegion}/negociaciones-de-medico`}
            target='_blank' style={{marginRight: 16, color: blue['500']}}>Ver
            todas las negociaciones</a>
        </div>
      </div>
      <div
        style={{marginTop: 0, marginLeft: 16, marginRight: 16}}>
        <List dense={true}>
          <ListItem
            key={0}
            dense={true}
            style={{paddingLeft: 0}}>
            <ListItemText
              primary={`${medico.nombre} (Matrícula ${medico.matricula})`}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                    style={{display: 'inline', color: blue['500']}}>
                    Categoría {medico.categoria ? `(${medico.categoria})` : '(sin dato)'}
                  </Typography>
                  <br/>
                  Especialidad
                  - {`${medico.especialidad1}`} {medico.especialidad2 ? ` y ${medico.especialidad2}` : ''}
                  <br/>
                  {medico.consultorio} -
                  Área {medico.area ? medico.area : '(sin área)'}
                </>
              }/>
          </ListItem>
        </List>
        <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button variant="outlined" size="small" color="primary"
                  onClick={handleExpandClick} style={{marginBottom: 8}}>
            {labelButton}
          </Button>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div>
            <FieldsSection
              fieldsGroup={seccionMedico}
              clearAsyncError={clearAsyncError}/>
          </div>
        </Collapse>
      </div>
    </Paper>
  );
}

Medico.propTypes = {
  history: PropTypes.any,
  formEditChangeInput: PropTypes.any,
  changeDiaDeTrabajo: PropTypes.any,
  formEdit: PropTypes.any,
  clearAsyncError: PropTypes.any
};

export default Medico;
