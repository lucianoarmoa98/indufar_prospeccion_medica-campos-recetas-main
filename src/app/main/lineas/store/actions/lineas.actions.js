export const LINEAS_LISTA_CHANGE_PAGE = 'LINEAS_LISTA_CHANGE_PAGE';
export const LINEAS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'LINEAS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const LINEAS_LISTA_SET_VALUE_SEARCH = 'LINEAS_LISTA_SET_VALUE_SEARCH';

export const LINEAS_SINCRONIZAR = 'LINEAS_SINCRONIZAR';
export const LINEAS_SET_SINCRONIZACION = 'LINEAS_SET_SINCRONIZACION';
export const LINEAS_RESET_SINCRONIZACION = 'LINEAS_RESET_SINCRONIZACION';
export const LINEAS_GET_CANTIDAD_POR_SINCRONIZAR = 'LINEAS_GET_CANTIDAD_POR_SINCRONIZAR';
export const LINEAS_SET_CANTIDAD_POR_SINCRONIZAR = 'LINEAS_SET_CANTIDAD_POR_SINCRONIZAR';

export const setCantidadPorSincronizar = (data) => ({
  type: LINEAS_SET_CANTIDAD_POR_SINCRONIZAR,
  payload: { data }
});

export const getCantidadPorSincronizar = () => ({
  type: LINEAS_GET_CANTIDAD_POR_SINCRONIZAR
});

export const resetSincronizacion = () => ({
  type: LINEAS_SET_SINCRONIZACION
});

export const setSincronizacion = (data) => ({
  type: LINEAS_SET_SINCRONIZACION,
  payload: { data }
});

export const sincronizar = () => ({
  type: LINEAS_SINCRONIZAR
});

export const listChangePage = page => ({
  type: LINEAS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: LINEAS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: LINEAS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});
