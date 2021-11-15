
export const OBJETIVOS_LISTA_CHANGE_PAGE = 'OBJETIVOS_LISTA_CHANGE_PAGE';
export const OBJETIVOS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'OBJETIVOS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const OBJETIVOS_LISTA_SET_VALUE_SEARCH = 'OBJETIVOS_LISTA_SET_VALUE_SEARCH';

export const listChangePage = page => ({
  type: OBJETIVOS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: OBJETIVOS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: OBJETIVOS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});
