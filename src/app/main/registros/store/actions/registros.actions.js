
export const REGISTROS_LISTA_CHANGE_PAGE = 'REGISTROS_LISTA_CHANGE_PAGE';
export const REGISTROS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'REGISTROS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const REGISTROS_LISTA_SET_VALUE_SEARCH = 'REGISTROS_LISTA_SET_VALUE_SEARCH';
export const REGISTROS_LISTA_GET_DATA = 'REGISTROS_LISTA_GET_DATA';
export const REGISTROS_LISTA_SET_DATA = 'REGISTROS_LISTA_SET_DATA';
export const REGISTROS_LISTA_CHANGE_FILTER_VALUE = 'REGISTROS_LISTA_CHANGE_FILTER_VALUE';
export const REGISTROS_FORM_EDIT_CHANGE_VALUE_INPUT = 'REGISTROS_FORM_EDIT_CHANGE_VALUE_INPUT';
export const REGISTROS_FORM_EDIT_SUBMIT = 'REGISTROS_FORM_EDIT_SUBMIT';
export const REGISTROS_FORM_EDIT_RESET_STATE = 'REGISTROS_FORM_EDIT_RESET_STATE';
export const REGISTROS_FORM_EDIT_SET_DATOS = 'REGISTROS_FORM_EDIT_SET_DATOS';
export const REGISTROS_FORM_EDIT_RESET_DATOS = 'REGISTROS_FORM_EDIT_RESET_DATOS';
export const REGISTROS_FORM_EDIT_ADD_PRODUCTO = 'REGISTROS_FORM_EDIT_ADD_PRODUCTO';
export const REGISTROS_FORM_EDIT_SUBMIT_SUCCESS = 'REGISTROS_FORM_EDIT_SUBMIT_SUCCESS';
export const REGISTROS_FORM_EDIT_SUBMIT_FAIL = 'REGISTROS_FORM_EDIT_SUBMIT_FAIL';
export const REGISTROS_FORM_EDIT_CHANGE_COMENTARIO_INPUT = 'REGISTROS_FORM_EDIT_CHANGE_COMENTARIO_INPUT';

export const listChangePage = page => ({
  type: REGISTROS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: REGISTROS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: REGISTROS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});

export const getData = idNegociacion => ({
  type: REGISTROS_LISTA_GET_DATA,
  payload: {
    idNegociacion
  }
});

export const setDatosDeNegociaciones = datos => ({
  type: REGISTROS_LISTA_SET_DATA,
  payload: {
    datos
  }
});

export const changeFilterValue = value => ({
  type: REGISTROS_LISTA_CHANGE_FILTER_VALUE,
  payload: {
    value
  }
});

export const formEditChangeComentario = (quienComenta, value) => ({
  type: REGISTROS_FORM_EDIT_CHANGE_COMENTARIO_INPUT,
  payload: {
    quienComenta,
    value
  }
});

export const formEditChangeInput = (field, value) => ({
  type: REGISTROS_FORM_EDIT_CHANGE_VALUE_INPUT,
  payload: {
    field,
    value
  }
});

export const formEditSubmit = (file) => ({
  type: REGISTROS_FORM_EDIT_SUBMIT,
  payload: {
    file
  }
});

export const formEditResetValues = (error) => ({
  type: REGISTROS_FORM_EDIT_RESET_STATE,
  payload: {
    error
  }
});

export const setDatos = (datos) => ({
  type: REGISTROS_FORM_EDIT_SET_DATOS,
  payload: {
    datos
  }
});

export const resetDatos = () => ({
  type: REGISTROS_FORM_EDIT_RESET_DATOS,
});

export const addProducto = (producto) => ({
  type: REGISTROS_FORM_EDIT_ADD_PRODUCTO,
  payload: {
    producto
  }
});

export const formEditSubmitSuccess = () => ({
  type: REGISTROS_FORM_EDIT_SUBMIT_SUCCESS
});

export const formEditSubmitFail = (error) => ({
  type: REGISTROS_FORM_EDIT_SUBMIT_FAIL,
  payload: {
    error
  }
});
