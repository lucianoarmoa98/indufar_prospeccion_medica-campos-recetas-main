export const PRODUCTOS_LISTA_CHANGE_PAGE = 'PRODUCTOS_LISTA_CHANGE_PAGE';
export const PRODUCTOS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'PRODUCTOS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const PRODUCTOS_LISTA_SET_VALUE_SEARCH = 'PRODUCTOS_LISTA_SET_VALUE_SEARCH';

export const PRODUCTOS_GET_LINEAS = 'PRODUCTOS_GET_LINEAS';
export const PRODUCTOS_SET_LINEAS = 'PRODUCTOS_SET_LINEAS';
export const PRODUCTOS_ASIGNAR_LINEA = 'PRODUCTOS_ASIGNAR_LINEA';


export const asignarLinea = (idProducto, idLinea) => ({
  type: PRODUCTOS_ASIGNAR_LINEA,
  payload: {
      idProducto,
      idLinea
  }
});


export const setLineas = (lineas) => ({
  type: PRODUCTOS_SET_LINEAS,
  payload: {
      lineas
  }
});

export const getLineas = (linea) => ({
  type: PRODUCTOS_GET_LINEAS,
  payload: {
    linea
  }
});

export const listChangePage = page => ({
  type: PRODUCTOS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: PRODUCTOS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: PRODUCTOS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});
