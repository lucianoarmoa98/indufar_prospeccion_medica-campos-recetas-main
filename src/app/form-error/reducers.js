import {reducer} from 'redux-form';

const reduxFormReducer = reducer.plugin({
  formObjetivo: (state, action) => {
    switch (action.type) {
      case '@@redux-form/CLEAR_ASYNC_ERROR':
        const {form, field} = action.meta;
        if (form !== 'formObjetivo') {
          return state;
        }
        const submitErrors = {
          ...state.submitErrors
        };
        delete submitErrors[field];
        return {
          ...state,
          submitErrors
        };
      default:
        return state;
    }
  },
  formUsuario: (state, action) => {
    switch (action.type) {
      case '@@redux-form/CLEAR_ASYNC_ERROR':
        const {form, field} = action.meta;
        if (form !== 'formUsuario') {
          return state;
        }
        const submitErrors = {
          ...state.submitErrors
        };
        delete submitErrors[field];
        return {
          ...state,
          submitErrors
        };
      default:
        return state;
    }
  }, formEditUsuario: (state, action) => {
    switch (action.type) {
      case '@@redux-form/CLEAR_ASYNC_ERROR':
        const {form, field} = action.meta;
        if (form !== 'formEditUsuario') {
          return state;
        }
        const submitErrors = {
          ...state.submitErrors
        };
        delete submitErrors[field];
        return {
          ...state,
          submitErrors
        };
      default:
        return state;
    }
  }, formEditNegociacion: (state, action) => {
    switch (action.type) {
      case '@@redux-form/CLEAR_ASYNC_ERROR':
        const {form, field} = action.meta;
        if (form !== 'formEditNegociacion') {
          return state;
        }
        const submitErrors = {
          ...state.submitErrors
        };
        delete submitErrors[field];
        return {
          ...state,
          submitErrors
        };
      default:
        return state;
    }
  }
});

export default reduxFormReducer;
