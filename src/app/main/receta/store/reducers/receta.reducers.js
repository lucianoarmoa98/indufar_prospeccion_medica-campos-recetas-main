import * as Actions from '../actions';

// Estado inicial de los campos del formulario
const defaultValues = {
    id: '',
    nombre: '',
    descripcion: '',
    codigoDeBarras: '',
    presentacion: '',
    fechaDeActualizacion: ''
};

// Para agregar campos obligatorios
const initialState = {
    medicos: [],
    productos: [],
    getDataLoading: false,
    formEdit: [],
    mostrarToast: false,
    list: {
        pagination: {},
        pageSize: 10,
        page: 0,
        pageSizeOptions: [10],
        searchText: ''
    },
    toast: {
        error: false,
        mensaje: ''
    }
};

const recetaReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.RECETA_SET_TAMS:
            return {
                ...state,
                tams: action.payload.tams.data,
                mostrarToast: false
            };
        case Actions.RECETA_SET_MEDICOS:

            return {
                ...state,
                medicos: action.payload.medicos.data,
                mostrarToast: false
            };
        case Actions.RECETA_SET_VISITADOR:

            return {
                ...state,
                medicos: action.payload.medicos.data,
                mostrarToast: false
            };
        case Actions.RECETA_SET_PRODUCTOS:
            return {
                ...state,
                productos: action.payload.productos.data,
                mostrarToast: false
            };
        case Actions.RECETA_GET_DATA:
            return {
                ...state,
                getDataLoading: true,
                mostrarToast: false
            };
        case Actions.RECETA_SET_DATA:

            return {
                ...state,
                getDataLoading: false,
                formEdit: action.payload.data.data,
                mostrarToast: false
            };
        case Actions.RECETA_SET_MENSAJE:
            return {
                ...state,
                mostrarToast: true,
                toast: action.payload.data
            };
        case Actions.RECETA_MOSTRAR_TOAST:
            return {
                ...state,
                mostrarToast: action.payload.data
            };
        case Actions.RECETA_SUBMIT:
            return {
                ...state,
                mostrarToast: false
            };
        case Actions.RECETA_SUBMIT_CALIGRAFIA:
            return {
                ...state,
                mostrarToast: false
            };
        case Actions.RECETA_LISTA_CHANGE_PAGE:
            return {
                ...state,
                list: {
                    ...state.list,
                    page: action.payload.page
                }
            };
        case Actions.RECETA_LISTA_CHANGE_QUANTITY_PER_PAGE:
            return {
                ...state,
                list: {
                    ...state.list,
                    pageSize: action.payload.quantityPerPage
                }
            };
        case Actions.RECETA_LISTA_SET_VALUE_SEARCH:
            return {
                ...state,
                list: {
                    ...state.list,
                    searchText: action.payload.value
                }
            };
        /*case Actions.RECETA_SUBMIT_SUCCESS:
            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmitting: false
                }
            };
        case Actions.RECETA_SUBMIT_FAIL:
            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmitting: false
                }
            };
        case Actions.RECETA_FORM_RESET:
            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...defaultValues
                    }
                }
            };*/
        default:
            return state;
    }
};

export default recetaReducer;
