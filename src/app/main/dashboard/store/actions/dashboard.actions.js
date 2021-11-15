export const DASHBOARD_MAPA_GET_DATOS = 'DASHBOARD_MAPA_GET_DATOS';
export const DASHBOARD_MAPA_SET_DATOS = 'DASHBOARD_MAPA_SET_DATOS';
export const DASHBOARD_GET_ULTIMAS_NEGOCIACIONES = 'DASHBOARD_GET_ULTIMAS_NEGOCIACIONES';
export const DASHBOARD_SET_ULTIMAS_NEGOCIACIONES = 'DASHBOARD_SET_ULTIMAS_NEGOCIACIONES';
export const DASHBOARD_SET_NEGOCIACIONES_POR_ANALISTA = 'DASHBOARD_SET_NEGOCIACIONES_POR_ANALISTA';
export const DASHBOARD_GET_NEGOCIACIONES_POR_ANALISTA = 'DASHBOARD_GET_NEGOCIACIONES_POR_ANALISTA';

export const getDatosDeMapa = () => ({
  type: DASHBOARD_MAPA_GET_DATOS
});

export const setDatosDeMapa = datos => ({
  type: DASHBOARD_MAPA_SET_DATOS,
  payload: {
    datos
  }
});

export const getUltimasNegociaciones = () => ({
  type: DASHBOARD_GET_ULTIMAS_NEGOCIACIONES
});

export const setUltimasNegociaciones = datos => ({
  type: DASHBOARD_SET_ULTIMAS_NEGOCIACIONES,
  payload: {
    datos
  }
});

export const getNegociacionesPorAnalista = () => ({
  type: DASHBOARD_GET_NEGOCIACIONES_POR_ANALISTA
});

export const setsNegociacionesPorAnalista = datos => ({
  type: DASHBOARD_SET_NEGOCIACIONES_POR_ANALISTA,
  payload: {
    datos
  }
});
