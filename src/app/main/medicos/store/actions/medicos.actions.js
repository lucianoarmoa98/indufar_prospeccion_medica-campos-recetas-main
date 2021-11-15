export const MEDICOS_LISTA_CHANGE_PAGE = 'MEDICOS_LISTA_CHANGE_PAGE';
export const MEDICOS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'MEDICOS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const MEDICOS_LISTA_SET_VALUE_SEARCH = 'MEDICOS_LISTA_SET_VALUE_SEARCH';
export const MEDICOS_LISTA_GET_DATA = 'MEDICOS_LISTA_GET_DATA';
export const MEDICOS_LISTA_SET_DATA = 'MEDICOS_LISTA_SET_DATA';
export const MEDICO_SET_OBJETIVO_DATA = 'MEDICOS_LISTA_SET_OBJETIVO_DATA';
export const MEDICO_RESET_DATA = 'MEDICO_RESET_DATA';
export const MEDICO_SET_HISTORICO = 'MEDICO_SET_HISTORICO';
export const MEDICOS_LISTA_CHANGE_FILTER_VALUE = 'MEDICOS_LISTA_CHANGE_FILTER_VALUE';
export const MEDICOS_NEGOCIACIONES_LISTA_CHANGE_PAGE = 'MEDICOS_NEGOCIACIONES_LISTA_CHANGE_PAGE';
export const MEDICOS_NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE = 'MEDICOS_NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const MEDICOS_NEGOCIACIONES_LISTA_SET_VALUE_SEARCH = 'MEDICOS_NEGOCIACIONES_LISTA_SET_VALUE_SEARCH';
export const MEDICOS_NEGOCIACIONES_LISTA_RESET_PARAMETERS = 'MEDICOS_NEGOCIACIONES_LISTA_RESET_PARAMETERS';
export const MEDICOS_NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE = 'MEDICOS_NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE';
export const MEDICOS_LISTA_CHANGE_FILTER_TAM_EFECTIVIDAD = 'MEDICOS_LISTA_CHANGE_FILTER_TAM_EFECTIVIDAD';
export const MEDICOS_LISTA_SET_TAMS_DISPONIBLES = 'MEDICOS_LISTA_SET_TAMS_DISPONIBLES';
export const MEDICOS_LISTA_GET_TAMS_DISPONIBLES = 'MEDICOS_LISTA_GET_TAMS_DISPONIBLES';
export const MEDICOS_GET_CALCULO_ENTRYMARKET = 'MEDICOS_GET_CALCULO_ENTRYMARKET';
export const MEDICOS_LISTA_CALCULAR_EFECTIVIDAD = 'MEDICOS_LISTA_CALCULAR_EFECTIVIDAD';
export const MEDICOS_LISTA_SET_VALUE_DE_VISITADOR = 'MEDICOS_LISTA_SET_VALUE_DE_VISITADOR';

export const listChangePage = page => ({
  type: MEDICOS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: MEDICOS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: MEDICOS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});

export const getData = matricula => ({
  type: MEDICOS_LISTA_GET_DATA,
  payload: {
    matricula
  }
});

export const setDatosDeMedico = datos => ({
  type: MEDICOS_LISTA_SET_DATA,
  payload: {
    datos
  }
});

export const setTamsDisponibles = datos => ({
  type: MEDICOS_LISTA_SET_TAMS_DISPONIBLES,
  payload: {
    datos
  }
});

export const getTamsDisponibles = () => ({
  type: MEDICOS_LISTA_GET_TAMS_DISPONIBLES
});

export const setDatosDeObjetivo = datos => ({
  type: MEDICO_SET_OBJETIVO_DATA,
  payload: {
    datos
  }
});

export const resetDatosDeMedico = () => ({
  type: MEDICO_RESET_DATA
});

export const setHistorico = datos => ({
  type: MEDICO_SET_HISTORICO,
  payload: {
    datos
  }
});

export const getCalculoEntryMarket = (matricula) => ({
  type: MEDICOS_GET_CALCULO_ENTRYMARKET,
  payload: {
    matricula
  }
});

export const negociacionesListChangePage = page => ({
  type: MEDICOS_NEGOCIACIONES_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const negociacionesListChangeQuantityPerPage = quantityPerPage => ({
  type: MEDICOS_NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const negociacionesSetSearchValue = value => ({
  type: MEDICOS_NEGOCIACIONES_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});

export const negociacionesResetListParameters = () => ({
  type: MEDICOS_NEGOCIACIONES_LISTA_RESET_PARAMETERS
});

export const changeFilterValue = value => ({
  type: MEDICOS_NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE,
  payload: {
    value
  }
});

export const changeFilterListValue = value => ({
  type: MEDICOS_LISTA_CHANGE_FILTER_VALUE,
  payload: {
    value
  }
});


export const changeFilterListTamEfectividad = value => ({
  type: MEDICOS_LISTA_CHANGE_FILTER_TAM_EFECTIVIDAD,
  payload: {
    value
  }
});

export const calcularFectividad = (datos) => ({
  type: MEDICOS_LISTA_CALCULAR_EFECTIVIDAD,
  payload: {
    datos
  }
});

export const setVisitador = value => ({
  type: MEDICOS_LISTA_SET_VALUE_DE_VISITADOR,
  payload: {
    value
  }
});
