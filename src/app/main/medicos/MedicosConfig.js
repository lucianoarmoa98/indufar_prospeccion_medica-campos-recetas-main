import Productos from './Medicos';
import {
  estadosDeNegociacion,
  getColorEstado,
  separadorDeMiles,
  URL_BASE
} from '../UIUtils';
import React from 'react';
import Negociacion from '../medico/Prospeccion';
import {
  amber,
  green,
  indigo,
  lime,
  orange,
  purple,
  red, yellow
} from '@material-ui/core/colors';
import NegociacionesDeMedico from '../medico/NegociacionesDeMedico';
import moment from 'moment';
import _ from '@lodash';

export const MedicosConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/medicos',
      component: Productos,
      exact: true
    },
    {
      path: '/medicos/:codigoMedicoRegion',
      component: Negociacion,
      exact: true
    },
    {
      path: '/medicos/:codigoMedicoRegion/negociaciones-de-medico',
      component: NegociacionesDeMedico,
      exact: true
    }
  ]
};

const fontSize = 12;
export const configuracionDeTabla = {
  titulo: 'Médicos',
  columnas: [
    {
      title: 'Cod. Med-Reg (Close up)',
      field: 'matricula',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.codigoMedicoRegion}
          </div>
        );
      }
    }, {
      title: 'Matrícula',
      field: 'codigoMedico',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.matricula}
          </div>
        );
      }
    },
    {
      title: 'Nombre',
      field: 'nombre',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.nombre}
          </div>
        );
      }
    },
    {
      title: 'Especialidad (1)',
      field: 'especialidad1',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.especialidad1}
          </div>
        );
      }
    },
    {
      title: 'Especialidad (2)',
      field: 'especialidad2',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.especialidad2 ? rowData.especialidad2 : '-'}
          </div>
        );
      }
    },
    {
      title: 'Región',
      field: 'regon',
      sorting: false,
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.region ? rowData.region : '-'}
          </div>
        );
      }
    },
    {
      title: 'Categoría',
      field: 'categoria',
      render: rowData => {
        return (
          <div
            style={{fontSize}}>
            {rowData.categoria ? rowData.categoria : '-'}
          </div>
        );
      }
    }
    // {
    //   title: 'Visitador',
    //   field: 'legajoVisitador',
    //   render: rowData => {
    //     return (
    //       <div
    //         style={{fontSize}}>
    //         {rowData.legajoVisitador}
    //       </div>
    //     );
    //   }
    // },
    // {
    //   title: 'Supervisor',
    //   field: 'legajoSupervisor',
    //   render: rowData => {
    //     return (
    //       <div
    //         style={{fontSize}}>
    //         {rowData.legajoSupervisor}
    //       </div>
    //     );
    //   }
    // },
    // {
    //   title: 'Analista',
    //   field: 'legajoAnalista',
    //   render: rowData => {
    //     return (
    //       <div
    //         style={{fontSize}}>
    //         {rowData.legajoAnalista}
    //       </div>
    //     );
    //   }
    // }
  ]
};

export const END_POINT_NEGOCIADOS = URL_BASE + '/negociaciones/medicos/:matricula';

const fontSizeTablaNegociados = 12;
const colorTamAObjetivo = green['600'];
const colorRanking = indigo['700'];
const cellStyle = {
  width: 50,
  paddingLeft: 4,
  paddingRight: 4,
  textAlign: 'center'
};
const headerStyle = {
  fontSize: fontSizeTablaNegociados,
  paddingLeft: 0,
  paddingRight: 0,
  textAlign: 'center'
};

const NO_COMPITE_IF = 'no compite if';

const PREFERENCIA = green['500'];
const CRECE_Y_MENOR_DE_LA_COMPETENCIA = yellow['500'];
const NO_USA = red['500'];
const DEJO_DE_USAR = purple['500'];
const DECRECE = orange['500'];
const DEFAULT = 'black';

const colorDeEfectividad = (rowData) => {
  // [CloseUp].[COMPETIDOR_IF]="NO COMPITE IF"  O [CORP_ABS_AnhoActual]=0
  if (rowData.descripcion.toLocaleLowerCase() === NO_COMPITE_IF || rowData.corp === 0) {
    return NO_USA;
  }
  // EsNulo([CORP_ABS_AnhoActual])  Y  EsNulo([OTROS_ABS _AnhoMayor]) O EsNulo([TOTAL_ABS_AnhoMayor])
  if ((rowData.corp === null && rowData.otro === null) || rowData.totalCorp === null) {
    return DEJO_DE_USAR;
  }
  // =[CORP_ABS_AnhoActual]<=[OTROS_ABS _AnhoMayor] Y [CORP_ABS_AnhoActual]>=[CORP_ABS_AnhoAnterior] Y [CORP_ABS_AnhoActual] >0
  if (rowData.corp <= rowData.otros && rowData.corp >= rowData.corpObjetivo && rowData.corp > 0) {
    return CRECE_Y_MENOR_DE_LA_COMPETENCIA;
  }
  //=[CORP_ABS_AnhoActual]>[OTROS_ABS _AnhoMayor]
  if (rowData.corp > rowData.otros) {
    return PREFERENCIA;
  }
  // =[CORP_ABS_AnhoActual]<=[OTROS_ABS _AnhoMayor] Y [CORP_ABS_AnhoActual]<[CORP_ABS_AnhoAnterior] Y [CORP_ABS_AnhoActual]>0
  if (rowData.corp <= rowData.otros && rowData.corp < rowData.corpObjetivo && rowData.corp > 0) {
    return DECRECE;
  }
  return DEFAULT;
};

const colorDeTextoDeEfectividad = (rowData) => {
  const black = 'black';
  const white = 'white';
  if (rowData.descripcion.toLocaleLowerCase() === NO_COMPITE_IF || rowData.corp === 0) {
    return white;
  }
  if ((rowData.corp === null && rowData.otro === null) || rowData.totalCorp === null) {
    return white;
  }
  if (rowData.corp <= rowData.otros && rowData.corp >= rowData.corpObjetivo && rowData.corp > 0) {
    return black;
  }
  if (rowData.corp > rowData.otros) {
    return white;
  }
  if (rowData.corp <= rowData.otros && rowData.corp < rowData.corpObjetivo && rowData.corp > 0) {
    return white;
  }
  return black;
};

export const configuracionDeTablaNegociados = {
  titulo: 'Histórico de Negociados',
  columnas: [
    {
      title: 'Descripción',
      field: 'descripcion',
      render: rowData => (
        <div style={{
          fontSize: fontSizeTablaNegociados,
          color: colorDeTextoDeEfectividad(rowData),
          fontWeight: 'bold'
        }}>
          {rowData.descripcion}
        </div>
      ),
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: (_, row) => {
        return {paddingLeft: 12, paddingRight: 8, backgroundColor: colorDeEfectividad(row)};
      }
    }, {
      title: 'Corp Anterior',
      field: 'corpObjetivo',
      render: rowData => (
        <div
          style={{fontSize: fontSizeTablaNegociados, color: colorTamAObjetivo}}>
          {rowData.corpObjetivo ? rowData.corpObjetivo : 0}
        </div>
      ),
      headerStyle: {color: colorTamAObjetivo, ...headerStyle},
      cellStyle
    }, {
      title: 'Otros Anterior',
      field: 'otrosObjetivo',
      render: rowData => (
        <div
          style={{fontSize: fontSizeTablaNegociados, color: colorTamAObjetivo}}>
          {rowData.otrosObjetivo ? rowData.otrosObjetivo : 0}
        </div>
      ),
      headerStyle: {color: colorTamAObjetivo, ...headerStyle},
      cellStyle
    }, {
      title: 'Total Anterior',
      field: 'totalCorpObjetivo',
      render: rowData => (
        <div
          style={{fontSize: fontSizeTablaNegociados, color: colorTamAObjetivo}}>
          {rowData.totalCorpObjetivo ? rowData.totalCorpObjetivo : 0}
        </div>
      ),
      headerStyle: {color: colorTamAObjetivo, ...headerStyle},
      cellStyle
    }, {
      title: 'Corp Actual',
      field: 'corp',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.corp ? rowData.corp : 0}
        </div>
      ),
      headerStyle,
      cellStyle
    }, {
      title: 'Otros Actual',
      field: 'otros',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.otros ? rowData.otros : 0}
        </div>
      ),
      headerStyle,
      cellStyle
    }, {
      title: 'Total Actual',
      field: 'totalCorp',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.totalCorp ? rowData.totalCorp : 0}
        </div>
      ),
      headerStyle,
      cellStyle
    }, {
      title: 'Negociado',
      field: 'esExclusivo',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {
            rowData.esExclusivo === null ? 'NO' :
              rowData.esExclusivo ?
                <div style={{color: green['500']}}>Exclusivo</div> :
                <div style={{color: amber['500']}}>Compartido</div>
          }
        </div>
      ),
      headerStyle,
      cellStyle
    }, {
      title: 'Indufar',
      field: 'indufar',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.indufar ? rowData.indufar : 0}
        </div>
      ),
      headerStyle: {...headerStyle, color: colorRanking},
      cellStyle: {...cellStyle, color: colorRanking}
    }, {
      title: 'Entry',
      field: 'entry',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.entry ? rowData.entry : 0}
        </div>
      ),
      headerStyle: {...headerStyle, color: colorRanking},
      cellStyle: {...cellStyle, color: colorRanking}
    }
  ],
  columnasDeNegociacionesEnPerfilDeMedico: [
    {
      title: 'Aporte',
      field: 'aporte',
      render: rowData => (
        <div style={{fontSize: fontSizeTablaNegociados}}>
          {rowData.conceptoDeAporte ? rowData.conceptoDeAporte : '-'}
        </div>
      ),
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: {paddingLeft: 12, paddingRight: 8}
    }, {
      title: 'Concepto',
      field: 'concepto',
      render: rowData => {
        const {montoDeAporteEconomico, monedaDeAporteEconomico} = rowData.aporteEconomico;
        const {evento, montoDeBeca, monedaDeBeca} = rowData.pedidoDeBeca;
        const {termo} = rowData.pedidoDeTermo;
        let concepto = '';
        if (montoDeAporteEconomico) {
          concepto += `${separadorDeMiles(montoDeAporteEconomico)} ${monedaDeAporteEconomico} `;
        }
        if (evento) {
          concepto += `${evento} `;
          if (montoDeBeca) {
            if (!_.isEmpty(concepto)) {
              concepto += ' - ';
            }
            concepto += `${montoDeBeca} ${monedaDeBeca} `;
          }
        }
        if (termo) {
          if (!_.isEmpty(concepto)) {
            concepto += ' - ';
          }
          concepto += `${termo} `;
        }
        return (
          <div style={{fontSize: fontSizeTablaNegociados}}>
            {concepto ? concepto : '-'}
          </div>
        );
      },
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: {paddingLeft: 12, paddingRight: 8}
    }, {
      title: 'Fecha negociación',
      field: 'fechaNegociacion',
      render: rowData => {
        const fechaFormated = moment(rowData.fechaNegociacion).format('DD/MM/YYYY - hh:mm a');
        return (
          <div style={{fontSize: fontSizeTablaNegociados}}>
            {fechaFormated}
          </div>
        );
      },
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: {paddingLeft: 12, paddingRight: 8}
    }, {
      title: 'Desde',
      field: 'desde',
      render: rowData => {
        const fechaFormated = moment(rowData.desde).format('DD/MM/YYYY - hh:mm a');
        return (
          <div style={{fontSize: fontSizeTablaNegociados}}>
            {fechaFormated}
          </div>
        );
      },
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: {paddingLeft: 12, paddingRight: 8}
    }, {
      title: 'Hasta',
      field: 'hasta',
      render: rowData => {
        const fechaFormated = moment(rowData.hasta).format('DD/MM/YYYY - hh:mm a');
        return (
          <div style={{fontSize: fontSizeTablaNegociados}}>
            {fechaFormated}
          </div>
        );
      },
      headerStyle: {paddingLeft: 12, paddingRight: 8, textAlign: 'left'},
      cellStyle: {paddingLeft: 12, paddingRight: 8}
    }, {
      title: 'Aprobación',
      field: 'estado',
      render: rowData => {
        const estado = estadosDeNegociacion.find(e => e.value === rowData.estado);
        const color = getColorEstado(rowData.estado);
        return (
          <div style={{
            fontSizeTablaNegociados,
            color
          }}>
            {
              estado ? estado.label : ''
            }
          </div>
        );
      }
    }
  ]
};
