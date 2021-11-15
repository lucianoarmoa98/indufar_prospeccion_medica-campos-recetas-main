import * as Actions from '../actions';

const defaultValues = {
  //id: '',
  matricula: '',
  objetivo: ''
};

const initialState = {
  getDataLoading: false,
  formEdit: {
    isSubmitting: false,
    values: {...defaultValues},
    requiredValues: {
      //id: false,
      matricula: true,
      objetivo: true
    }
  }
};

const objetivoReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.OBJETIVO_GET_DATA:
      return {
        ...state,
        getDataLoading: true
      };
    case Actions.OBJETIVO_SET_DATA:
      return {
        ...state,
        getDataLoading: false,
        formEdit: {
          ...state.formEdit,
          values: {
            ...action.payload.data
          }
        }
      };
    case Actions.OBJETIVO_EDIT_DATA:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          values: {
            ...state.formEdit.values,
            [action.payload.field]: action.payload.value
          }
        }
      };
    case Actions.OBJETIVO_SUBMIT:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmitting: true
        }
      };
    case Actions.OBJETIVO_SUBMIT_SUCCESS:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmitting: false
        }
      };
    case Actions.OBJETIVO_SUBMIT_FAIL:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmitting: false
        }
      };
    case Actions.OBJETIVO_FORM_RESET:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          values: {
            ...defaultValues
          }
        }
      };
    default:
      return state;
  }
};

export default objetivoReducer;
