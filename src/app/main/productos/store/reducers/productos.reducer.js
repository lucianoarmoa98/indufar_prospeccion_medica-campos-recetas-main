import * as Actions from '../actions';

const initialState = {
  lineas: [],
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

const productosReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PRODUCTOS_SET_LINEAS:
      return {
          ...state,
          lineas: action.payload.lineas ? action.payload.lineas.data : [],
      };
    case Actions.PRODUCTOS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.PRODUCTOS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.PRODUCTOS_LISTA_SET_VALUE_SEARCH:
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

export default productosReducer;
