export const OBJETIVO_GET_DATA = 'OBJETIVO_GET_DATA';
export const OBJETIVO_SET_DATA = 'OBJETIVO_SET_DATA';
export const OBJETIVO_EDIT_DATA = 'OBJETIVO_EDIT_DATA';
export const OBJETIVO_SUBMIT = 'OBJETIVO_SUBMIT';
export const OBJETIVO_SUBMIT_SUCCESS = 'OBJETIVO_SUBMIT_SUCCESS';
export const OBJETIVO_SUBMIT_FAIL = 'OBJETIVO_SUBMIT_FAIL';
export const OBJETIVO_FORM_RESET = 'OBJETIVO_FORM_RESET';

export const getData = (idDeObjetivo) => ({

  type: OBJETIVO_GET_DATA,
  payload: {
    idDeObjetivo
  }
});

export const setData = (data) => ({
  type: OBJETIVO_SET_DATA,
  payload: {
    data
  }
});

export const formChangeInput = (field, value) => ({
  type: OBJETIVO_EDIT_DATA,
  payload: {
    field,
    value
  }
});

export const formSubmit = (history, idDeObjetivo) => ({
  type: OBJETIVO_SUBMIT,
  payload: {
    history,
    idDeObjetivo
  }
});

export const formSubmitSuccess = () => ({
  type: OBJETIVO_SUBMIT_SUCCESS
});

export const formSubmitFail = () => ({
  type: OBJETIVO_SUBMIT_FAIL
});

export const resetForm = () => ({
  type: OBJETIVO_FORM_RESET
});
