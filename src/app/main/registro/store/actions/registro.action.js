export const REGISTRO_GET_DATA = 'REGISTRO_GET_DATA';
export const REGISTRO_SET_DATA = 'REGISTRO_SET_DATA';
export const REGISTRO_EDIT_DATA = 'REGISTRO_EDIT_DATA';
export const REGISTRO_SUBMIT = 'REGISTRO_SUBMIT';
export const REGISTRO_SUBMIT_SUCCESS = 'REGISTRO_SUBMIT_SUCCESS';
export const REGISTRO_SUBMIT_FAIL = 'REGISTRO_SUBMIT_FAIL';
export const REGISTRO_FORM_RESET = 'REGISTRO_FORM_RESET';

export const getData = (idDeRegistro) => ({

  type: REGISTRO_GET_DATA,
  payload: {
    idDeRegistro
  }
});

export const setData = (data) => ({
  type: REGISTRO_SET_DATA,
  payload: {
    data
  }
});

export const formChangeInput = (field, value) => ({
  type: REGISTRO_EDIT_DATA,
  payload: {
    field,
    value
  }
});

export const formSubmit = (history, idDeObjetivo) => ({
  type: REGISTRO_SUBMIT,
  payload: {
    history,
    idDeObjetivo
  }
});

export const formSubmitSuccess = () => ({
  type: REGISTRO_SUBMIT_SUCCESS
});

export const formSubmitFail = () => ({
  type: REGISTRO_SUBMIT_FAIL
});

export const resetForm = () => ({
  type: REGISTRO_FORM_RESET
});
