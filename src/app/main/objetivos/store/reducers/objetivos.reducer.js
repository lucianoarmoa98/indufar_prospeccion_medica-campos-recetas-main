import * as Actions from '../actions';

const initialState = {
  list: {
    pagination: {},
    pageSize: 10,
    page: 0,
    pageSizeOptions: [10],
    searchText: ''
  }
};

const objetivosReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.OBJETIVOS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.OBJETIVOS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.OBJETIVOS_LISTA_SET_VALUE_SEARCH:
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

export default objetivosReducer;
