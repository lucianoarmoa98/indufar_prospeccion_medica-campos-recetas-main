import * as Actions from '../actions';

const initialState = {
  sincronizacion: {},
  cantidadPorSincronizar: {},
  list: {
    pagination: {},
    pageSize: 10,
    page: 0,
    pageSizeOptions: [10],
    isLoading: false,
    data: [],
    searchText: ''
  }
};

const lineasReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.LINEAS_SET_CANTIDAD_POR_SINCRONIZAR:
      return {
        ...state,
        cantidadPorSincronizar: action.payload ? action.payload.data : {},
        //showModal

      };
    case Actions.LINEAS_RESET_SINCRONIZACION:
      return {
        ...state,
        sincronizacion: {},
        //showModal

      };
    case Actions.LINEAS_SET_SINCRONIZACION:
      return {
        ...state,
        sincronizacion: action.payload ? action.payload.data : {},
        //showModal
      };
    case Actions.LINEAS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.LINEAS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.LINEAS_LISTA_SET_VALUE_SEARCH:
      return {
        ...state,
        list: {
          ...state.list,
          searchText: action.payload.value
        }
      };
    default:
      return state;
  }
};

export default lineasReducer;
