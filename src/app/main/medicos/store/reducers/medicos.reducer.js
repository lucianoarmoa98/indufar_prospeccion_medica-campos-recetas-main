import * as Actions from '../actions';
import _ from 'lodash';
import {categorias} from '../../../UIUtils';

const defaultFormCreateEdit = {
  values: {
    matricula: '...',
    nombre: '...',
    especialidad: '',
    consultorio: '',
    localidad: '',
    departamento: '',
    negociacionVigente: null,
    negociacionAdelantada: null
  },
  isSubmiting: false
};

const defaultEntryMarket = {
  anho: '...',
  objetivo: 0,
  maximoPotencial: 0,
  brechaMaximoPotencial: 0,
  brecha: 0,
  corp: 0,
  negociado: 0,
  objetivoPorcentaje: 0,
  maximoPotencialPorcentaje: 0,
  brechaMaximoPotencialPorcentaje: 0,
  brechaPorcentaje: 0,
  corpPorcentaje: 0,
  negociadoPorcentaje: 0
};

const defaultHistorico = {
  productosDeProspecto: []
};

const defaultNegocicionesState = {
  pagination: {},
  pageSize: 5,
  page: 0,
  pageSizeOptions: [5],
  isLoading: false,
  data: [],
  searchText: '',
  filters: {
    valueTam: '',
    tams: []
  },
  efectividad: []
};

const initialState = {
  list: {
    pagination: {},
    pageSize: 10,
    page: 0,
    pageSizeOptions: [10],
    isLoading: false,
    data: [],
    searchText: '',
    filters: {
      valueCategorias: 0,
      categorias: [...categorias],
      legajoVisitador: ''
    }
  },
  negociaciones: {
    ...defaultNegocicionesState
  },
  formEdit: {
    ...defaultFormCreateEdit
  },
  entryMarket: {
    ...defaultEntryMarket
  },
  historico: {
    ...defaultHistorico
  }
};

const productosReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.MEDICOS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.MEDICOS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.MEDICOS_LISTA_SET_VALUE_SEARCH:
      return {
        ...state,
        list: {
          ...state.list,
          searchText: action.payload.value
        }
      };
    case Actions.MEDICOS_NEGOCIACIONES_LISTA_CHANGE_PAGE:
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          page: action.payload.page
        }
      };
    case Actions.MEDICOS_NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.MEDICOS_NEGOCIACIONES_LISTA_SET_VALUE_SEARCH:
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          searchText: action.payload.value
        }
      };
    case Actions.MEDICOS_NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE:
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          filters: {
            ...state.negociaciones.filters,
            valueEstados: action.payload.value
          }
        }
      };
    case Actions.MEDICOS_LISTA_CHANGE_FILTER_VALUE:
      return {
        ...state,
        list: {
          ...state.list,
          filters: {
            ...state.list.filters,
            valueCategorias: action.payload.value
          }
        }
      };
    case Actions.MEDICOS_NEGOCIACIONES_LISTA_RESET_PARAMETERS:
      return {
        ...state,
        negociaciones: {
          ...defaultNegocicionesState
        }
      };
    case Actions.MEDICOS_LISTA_SET_DATA:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          values: {
            ...defaultFormCreateEdit,
            ...action.payload.datos
          },
          isSubmiting: false
        }
      };
    case Actions.MEDICO_SET_OBJETIVO_DATA:
      return {
        ...state,
        entryMarket: {
          ...state.entryMarket,
          ...action.payload.datos
        }
      };
    case Actions.MEDICO_SET_HISTORICO:
      const productosDeProspecto = [...action.payload.datos];
      let tam = '';
      if (productosDeProspecto.length > 0) {
        tam = productosDeProspecto[0].tam;
      }
      const maximoPotencialConNoCompite = _.reduce(productosDeProspecto, (sum, n) => sum + n.totalCorp, 0);
      const totalNoCompite = _.reduce(productosDeProspecto, (sum, n) => {
        let acum = 0;
        if (n.descripcion.toLowerCase().includes('no comp')) {
          acum = n.totalCorp;
        }
        return sum + acum;
      }, 0);
      let negociado = 0;
      const corp = _.reduce(productosDeProspecto, (sum, n) => {
        if (n.esExclusivo != null) {
          const factor = n.esExclusivo ? 1 : 0.5;
          negociado += n.otros ? (n.otros * factor) : 0;
        }
        return sum + n.corp;
      }, 0);
      const maximoPotencial = maximoPotencialConNoCompite - totalNoCompite;
      const brechaMaximoPotencial = maximoPotencial - corp;
      const maximoPotencialPorcentaje = _.round(maximoPotencial / maximoPotencialConNoCompite * 100, 2);
      const brechaMaximoPotencialPorcentaje = _.round(brechaMaximoPotencial / maximoPotencialConNoCompite * 100, 2);
      const corpPorcentaje = _.round(corp / maximoPotencialConNoCompite * 100, 2);
      const negociadoPorcentaje = _.round(negociado / maximoPotencialConNoCompite * 100, 2);
      return {
        ...state,
        historico: {
          ...state.historico,
          productosDeProspecto
        },
        entryMarket: {
          ...state.entryMarket,
          tam,
          maximoPotencial,
          maximoPotencialPorcentaje,
          corp,
          corpPorcentaje,
          negociado,
          negociadoPorcentaje,
          brechaMaximoPotencial,
          brechaMaximoPotencialPorcentaje
        }
      };
    case Actions.MEDICO_RESET_DATA:
      return {
        ...state,
        formEdit: {
          ...defaultFormCreateEdit
        },
        entryMarket: {
          ...defaultEntryMarket
        },
        historico: {
          ...defaultHistorico
        }
      };
    case Actions.MEDICOS_LISTA_SET_TAMS_DISPONIBLES:
      const tamsDisponibles = [...action.payload.datos];
      let tams = tamsDisponibles.map(tam => ({
        value: tam,
        label: `${tam.substring(4)} - ${tam.substring(0, 4)}`
      }));
      tams = tams.slice(1);
      let {valueTam} = state.negociaciones.filters;
      if (!valueTam && tams.length > 0) {
        valueTam = tams[0].value;
      }
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          filters: {
            ...state.negociaciones.filters,
            tams,
            valueTam
          }
        }
      };
    case Actions.MEDICOS_LISTA_CHANGE_FILTER_TAM_EFECTIVIDAD:
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          filters: {
            ...state.negociaciones.filters,
            valueTam: action.payload.value
          }
        }
      };
    case Actions.MEDICOS_LISTA_CALCULAR_EFECTIVIDAD:
      const _efectividad = action.payload.datos;
      const registro = {
        indufar: 0,
        otros: 0,
        entry: 0,
        porcentaje: 0
      };
      const calculoEfectividad = {
        inicial: {...registro},
        actual: {...registro},
        variacion: {...registro},
        porcentaje: {...registro}
      };
      // TODO: corregir duplicación.
      _.forEach(_efectividad, (registro) => {
        const indufarObjetivo = registro.corpObjetivo ? registro.corpObjetivo : 0;
        const otrosObjetivo = registro.otrosObjetivo ? registro.otrosObjetivo : 0;
        const entryObjetivo = registro.totalCorpObjetivo ? registro.totalCorpObjetivo : 0;
        calculoEfectividad.inicial.indufar += indufarObjetivo;
        calculoEfectividad.inicial.otros += otrosObjetivo;
        calculoEfectividad.inicial.entry += entryObjetivo;
        const indufar = registro.corp ? registro.corp : 0;
        const otros = registro.otros ? registro.otros : 0;
        const totalCorp = registro.totalCorp ? registro.totalCorp : 0;
        calculoEfectividad.actual.indufar += indufar;
        calculoEfectividad.actual.otros += otros;
        calculoEfectividad.actual.entry += totalCorp;
      });
      calculoEfectividad.variacion.indufar = calculoEfectividad.actual.indufar - calculoEfectividad.inicial.indufar;
      calculoEfectividad.variacion.otros = calculoEfectividad.actual.otros - calculoEfectividad.inicial.otros;
      calculoEfectividad.variacion.entry = calculoEfectividad.actual.entry - calculoEfectividad.inicial.entry;
      const porcentajeIndufar = calculoEfectividad.inicial.indufar / calculoEfectividad.inicial.entry;
      const porcentajeOtros = calculoEfectividad.actual.indufar / calculoEfectividad.actual.entry;
      const porcentajeEntry = calculoEfectividad.variacion.indufar / calculoEfectividad.variacion.entry;
      let efectividad = [];
      _.forEach(Object.keys(registro), (entrada) => {
        const fila = {};
        fila.metrica = entrada;
        _.forEach(Object.keys(calculoEfectividad), (columa) => {
          fila[columa] = calculoEfectividad[columa][entrada];
        });
        efectividad = [...efectividad, fila]
      });
      // Se sobre-escribe la ultima fila para que sea compatible con la vista.
      const ultimaFila = efectividad[efectividad.length - 1];
      ultimaFila.noUsarSeparadorDeMiles = true;
      ultimaFila.inicial =  `${(porcentajeIndufar * 100).toFixed(2)} %`;
      ultimaFila.actual = `${(porcentajeOtros * 100).toFixed(2)} %`;
      ultimaFila.variacion = `${(porcentajeEntry * 100).toFixed(2)} %`;
      return {
        ...state,
        negociaciones: {
          ...state.negociaciones,
          efectividad
        }
      };
    case Actions.MEDICOS_LISTA_SET_VALUE_DE_VISITADOR:
      return {
        ...state,
        list: {
          ...state.list,
          filters: {
            ...state.list.filters,
            legajoVisitador: action.payload.value
          }
        }
      };
    default:
      return state;
  }
};

export default productosReducer;
