// Obtención de datos.
export const USUARIOS_LISTA_CHANGE_PAGE = 'USUARIOS_LISTA_CHANGE_PAGE';
export const USUARIOS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'USUARIOS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const USUARIOS_LISTA_SET_VALUE_SEARCH = 'USUARIOS_LISTA_SET_VALUE_SEARCH';
export const USUARIOS_LISTA_TOGGLE_ACTIVOS = 'USUARIOS_LISTA_TOGGLE_ACTIVOS';
export const USUARIO_GET_DATA = 'USUARIO_GET_DATA';
export const USUARIO_SET_DATA = 'USUARIO_SET_DATA';
// Creación.
export const USUARIOS_FORM_CREATE_CHANGE_VALUE_INPUT = 'USUARIOS_FORM_CREATE_CHANGE_VALUE_INPUT';
export const USUARIOS_FORM_CREATE_SUBMIT = 'USUARIOS_FORM_CREATE_SUBMIT';
export const USUARIOS_FORM_CREATE_SUBMIT_SUCCESS = 'USUARIOS_FORM_CREATE_SUBMIT_SUCCESS';
export const USUARIOS_FORM_CREATE_SUBMIT_FAIL = 'USUARIOS_FORM_CREATE_SUBMIT_FAIL';
export const USUARIOS_FORM_CREATE_CREATE_RESET_STATE = 'USUARIOS_FORM_CREATE_CREATE_RESET_STATE';
// Edición.
export const USUARIOS_FORM_EDIT_CHANGE_VALUE_INPUT = 'USUARIOS_FORM_EDIT_CHANGE_VALUE_INPUT';
export const USUARIOS_FORM_EDIT_SUBMIT = 'USUARIOS_FORM_EDIT_SUBMIT';
export const USUARIOS_FORM_EDIT_RESET_STATE = 'USUARIOS_FORM_EDIT_RESET_STATE';
export const USUARIOS_FORM_EDIT_SUBMIT_SUCCESS = 'USUARIOS_FORM_EDIT_SUBMIT_SUCCESS';
export const USUARIOS_FORM_EDIT_SUBMIT_FAIL = 'USUARIOS_FORM_EDIT_SUBMIT_FAIL';

export const getData = id => ({
  type: USUARIO_GET_DATA,
  payload: {
    id
  }
});

export const setData = datos => ({
  type: USUARIO_SET_DATA,
  payload: {
    datos
  }
});

export const listChangePage = page => ({
  type: USUARIOS_LISTA_CHANGE_PAGE,
  payload: {
    page
  }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
  type: USUARIOS_LISTA_CHANGE_QUANTITY_PER_PAGE,
  payload: {
    quantityPerPage
  }
});

export const setSearchValue = value => ({
  type: USUARIOS_LISTA_SET_VALUE_SEARCH,
  payload: {
    value
  }
});

export const formCreateChangeInput = (field, value) => ({
  type: USUARIOS_FORM_CREATE_CHANGE_VALUE_INPUT,
  payload: {
    field,
    value
  }
});

export const formCreateSubmit = (history) => ({
  type: USUARIOS_FORM_CREATE_SUBMIT,
  payload: {
    history
  }
});

export const formCreateSubmitSuccess = () => ({
  type: USUARIOS_FORM_CREATE_SUBMIT_SUCCESS
});

export const formCreateSubmitFail = (error) => ({
  type: USUARIOS_FORM_CREATE_SUBMIT_FAIL,
  payload: {
    error
  }
});

export const formCreateResetValues = (error) => ({
  type: USUARIOS_FORM_CREATE_CREATE_RESET_STATE,
  payload: {
    error
  }
});

export const formEditChangeInput = (field, value) => ({
  type: USUARIOS_FORM_EDIT_CHANGE_VALUE_INPUT,
  payload: {
    field,
    value
  }
});

export const formEditSubmit = (history) => ({
  type: USUARIOS_FORM_EDIT_SUBMIT,
  payload: {
    history
  }
});

export const formEditResetValues = (error) => ({
  type: USUARIOS_FORM_EDIT_RESET_STATE,
  payload: {
    error
  }
});

export const formEditSubmitSuccess = () => ({
  type: USUARIOS_FORM_EDIT_SUBMIT_SUCCESS
});

export const listToggleActivos = () => ({
  type: USUARIOS_LISTA_TOGGLE_ACTIVOS
});

export const formEditSubmitFail = (error) => ({
  type: USUARIOS_FORM_EDIT_SUBMIT_FAIL,
  payload: {
    error
  }
});
