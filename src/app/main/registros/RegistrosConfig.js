import Productos from './Registros';
import {
  Departamento,
  estadosDeNegociacion, getColorEstado,
  monedas,
  separadorDeMiles
} from '../UIUtils';
import React from 'react';
import moment from 'moment';
import RenderField from '../../../components/Form/RenderField';
import RenderSingleSelect from '../../../components/Form/RenderSingleSelect';
import RenderSingleOption from '../../../components/Form/RenderSingleOption';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import RenderMultipleOption
  from '../../../components/Form/RenderMultipleOption';

export const RegistrosConfig = {
  settings: {layout: {config: {}}},
  routes: [
    {
      path: '/registros',
      component: Productos,
      exact: true
    }
  ]
};

const fontSize = 11;
export const configuracionDeTabla = {
  titulo: 'Registros',
  columnas: [
    {
      title: 'Matrícula',
      field: 'matricula',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.matricula}
          </div>
        );
      }
    }, {
      title: 'Médico',
      field: 'nombreMedico',
      render: rowData => {
        return <div style={{fontSize}}>{rowData.nombreMedico}</div>;
      }
    }, {
      title: 'Consultorio',
      field: 'consultorio',
      render: rowData => {
        return <div style={{fontSize}}>{rowData.consultorio}</div>;
      }
    }, {
      title: 'Leg. Visitador',
      field: 'legajoVisitador',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.legajoVisitador}
          </div>
        );
      }
    }, {
      title: 'Visitador',
      field: 'visitador',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.visitador}
          </div>
        );
      }
    }, {
      title: 'Leg. Analista',
      field: 'legajoAnalista',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.legajoAnalista}
          </div>
        );
      }
    }, {
      title: 'Analista',
      field: 'analista',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.analista}
          </div>
        );
      }
    }, {
      title: 'Leg. Supervisor',
      field: 'legajoSupervisor',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.legajoSupervisor}
          </div>
        );
      }
    }, {
      title: 'Supervisor',
      field: 'supervisor',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData.supervisor}
          </div>
        );
      }
    }, 
    {
      title: 'Unidad de Negocio',
      field: 'linea',
      render: rowData => {
        return (
          <div style={{fontSize}}>
            {rowData ? rowData.linea : '-'}
          </div>
        );
      }
    }
  ]
};
