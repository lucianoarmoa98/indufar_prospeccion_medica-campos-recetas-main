import * as Actions from '../actions';

const defaultValuesFormEdit = {};

const defaultFormEdit = {
  options: {},
  values: {
    ...defaultValuesFormEdit
  },
  isSubmiting: false,
  success: false,
  error: '',
  requiredValues: {}
};

const initialState = {
  list: {
    pagination: {},
    pageSize: 10,
    page: 0,
    pageSizeOptions: [10],
    isLoading: false,
    data: [],
    searchText: '',
    filters: {}
  },
  formEdit: {
    ...defaultFormEdit
  }
};

const productosReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.REGISTROS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.REGISTROS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.REGISTROS_LISTA_SET_VALUE_SEARCH:
      return {
        ...state,
        list: {
          ...state.list,
          searchText: action.payload.value
        }
      };
    case Actions.REGISTROS_FORM_EDIT_RESET_DATOS:
      return {
        ...state,
        formEdit: {
          ...defaultFormEdit
        }
      };
    case Actions.REGISTROS_FORM_EDIT_SUBMIT:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: true
        }
      };
    case Actions.REGISTROS_FORM_EDIT_SUBMIT_SUCCESS:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: false,
          success: true
        }
      };
    case Actions.REGISTROS_FORM_EDIT_SUBMIT_FAIL:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: false,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
};

export default productosReducer;
