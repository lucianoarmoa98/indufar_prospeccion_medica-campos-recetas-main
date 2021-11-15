import * as Actions from '../actions';

export const defaultRoles = [
  {
    label: 'Analista',
    value: 'ANALISTA',
    color: '#007bff'
  }, {
    label: 'Visitador',
    value: 'VISITADOR',
    color: '#17a2b8'
  }, {
    label: 'Gerente',
    value: 'GERENTE',
    color: '#6c757d'
  }, {
    label: 'Médico',
    value: 'MEDICO',
    color: '#28a745'
  }, {
    label: 'Jefe',
    value: 'JEFE',
    color: '#F36025'
  }, {
    label: 'Supervisor',
    value: 'SUPERVISOR',
    color: '#2F00A4'
  }, {
    label: 'Directivo',
    value: 'DIRECTIVO',
    color: '#094403'
  }, {
    label: 'T.I.',
    value: 'T.I.',
    color: '#225356'
  }
];

export const getRolColor = (value) => {
  const rol = defaultRoles.find(r => r.value === value);
  return rol.color;
};

export const getRolLabel = (value) => {
  const rol = defaultRoles.find(r => r.value === value);
  return rol.label;
};

export const defaultEstados = [
  {
    label: 'Activo',
    value: true,
    color: '#4CAF50'
  }, {
    label: 'Inactivo',
    value: false,
    color: '#F44336'
  }
];

const defaultValuesFormCreate = {
  nombre: '',
  apellido: '',
  email: '',
  activo: defaultEstados[0].value,
  roles: [],
  legajo: '',
  contrasenha0: '',
  contrasenha1: ''
};

const defaultFormCreateState = {
  options: {
    estados: [...defaultEstados],
    roles: [...defaultRoles]
  },
  values: {
    ...defaultValuesFormCreate
  },
  isSubmiting: false,
  success: false,
  error: '',
  requiredValues: {
    nombre: true,
    apellido: true,
    email: true,
    contrasenha0: true,
    roles: true,
    legajo: true,
    contrasenha1: true
  }
};

const defaultValuesFormEdit = {
  nombre: '',
  apellido: '',
  email: '',
  activo: defaultEstados[0].value,
  roles: [],
  legajo: ''
};

const defaultFormCreateEdit = {
  options: {
    estados: [...defaultEstados],
    roles: [...defaultRoles]
  },
  values: {
    ...defaultValuesFormEdit
  },
  isSubmiting: false,
  success: false,
  error: '',
  requiredValues: {
    nombre: true,
    apellido: true,
    email: true,
    roles: true,
    legajo: true
  }
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
    showActivos: true
  },
  formCreate: {
    ...defaultFormCreateState
  },
  formEdit: {
    ...defaultFormCreateEdit
  }
};

const usuariosReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.USUARIOS_LISTA_CHANGE_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          page: action.payload.page
        }
      };
    case Actions.USUARIOS_LISTA_CHANGE_QUANTITY_PER_PAGE:
      return {
        ...state,
        list: {
          ...state.list,
          pageSize: action.payload.quantityPerPage
        }
      };
    case Actions.USUARIOS_LISTA_SET_VALUE_SEARCH:
      return {
        ...state,
        list: {
          ...state.list,
          searchText: action.payload.value
        }
      };
    case Actions.USUARIOS_LISTA_TOGGLE_ACTIVOS:
      return {
        ...state,
        list: {
          ...state.list,
          showActivos: !state.list.showActivos
        }
      };
    case Actions.USUARIO_SET_DATA:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          values: {
            ...defaultValuesFormEdit,
            ...action.payload.datos
          },
          isSubmiting: false
        }
      };
    case Actions.USUARIO_GET_DATA:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: true
        }
      };
    case Actions.USUARIOS_FORM_CREATE_CHANGE_VALUE_INPUT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          values: {
            ...state.formCreate.values,
            [action.payload.field]: action.payload.value
          }
        }
      };
    case Actions.USUARIOS_FORM_CREATE_SUBMIT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          isSubmiting: true
        }
      };
    case Actions.USUARIOS_FORM_CREATE_SUBMIT_SUCCESS:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          isSubmiting: false,
          success: true
        }
      };
    case Actions.USUARIOS_FORM_CREATE_SUBMIT_FAIL:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          isSubmiting: false,
          error: action.payload.error
        }
      };
    case Actions.USUARIOS_FORM_CREATE_CREATE_RESET_STATE:
      return {
        ...state,
        formCreate: {
          ...defaultFormCreateState
        }
      };
    case Actions.USUARIOS_FORM_EDIT_CHANGE_VALUE_INPUT:
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
    case Actions.USUARIOS_FORM_EDIT_SUBMIT_SUCCESS:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: false,
          success: true
        }
      };
    case Actions.USUARIOS_FORM_EDIT_SUBMIT:
      return {
        ...state,
        formEdit: {
          ...state.formEdit,
          isSubmiting: true
        }
      };
    case Actions.USUARIOS_FORM_EDIT_RESET_STATE:
      return {
        ...state,
        formEdit: {
          ...defaultFormCreateEdit
        }
      };
    case Actions.USUARIOS_FORM_EDIT_SUBMIT_FAIL:
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

export default usuariosReducer;
