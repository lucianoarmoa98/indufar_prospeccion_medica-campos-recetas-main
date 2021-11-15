import * as Actions from '../actions';

const initialState = {
  mapa: {
    visitadores: []
  },
  negociaciones: [],
  negociacionesPorAnalista: []
};

const productosReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.DASHBOARD_MAPA_SET_DATOS:
      return {
        ...state,
        mapa: {
          ...state.mapa,
          visitadores: [...action.payload.datos]
        }
      };
    case Actions.DASHBOARD_SET_ULTIMAS_NEGOCIACIONES:
      return {
        ...state,
        negociaciones: [...action.payload.datos]
      };
    case Actions.DASHBOARD_SET_NEGOCIACIONES_POR_ANALISTA:
      return {
        ...state,
        negociacionesPorAnalista: [
          ...action.payload.datos
        ]
      };
    default:
      return state;
  }
};

export default productosReducer;
