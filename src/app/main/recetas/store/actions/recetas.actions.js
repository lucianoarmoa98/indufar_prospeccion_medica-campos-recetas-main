export const RECETAS_LISTA_CHANGE_PAGE = 'RECETAS_LISTA_CHANGE_PAGE';
export const RECETAS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'RECETAS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const RECETAS_LISTA_SET_VALUE_SEARCH = 'RECETAS_LISTA_SET_VALUE_SEARCH';

export const listChangePage = page => ({
  type: RECETAS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: RECETAS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: RECETAS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});
