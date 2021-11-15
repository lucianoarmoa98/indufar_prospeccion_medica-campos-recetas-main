import * as Actions from '../actions';
import {
    cantidadDePagos,
    colorDeForrado,
    tipoDeMetodo,
    conceptosDeAporte, condicionado,
    estadosDeNegociacion, excepcionDeAporte, formaDePago,
    monedas,
    opcionesDeNegociacion,
    opcionesDiasDeAtencion, renovacion,
    termos,
    metodos,
    periodos,
} from '../../../UIUtils';

const defaultValuesFormEdit = {
    medico: {
        matricula: '...',
        nombre: '...',
        especialidad: '...',
        consultorio: '...',
        localidad: '...',
        departamento: '...',
        categoria: null
    },
    conceptoDeAporte: 'ECONOMICO',
    itemsNegociacion: [],
    itemsAnteriores: [],
    cantidadDePacientes: null,
    comentarios: [],
    aporteEconomico: {
        cantidadDePagos: 1,
        montoDeAporteEconomico: 0.0,
        monedaDeAporteEconomico: 'DOLLAR'
    },
    pedidoDeBeca: {
        evento: null,
        lugar: null,
        montoDeBeca: 0.0,
        monedaDeBeca: 'DOLLAR'
    },
    pedidoDeTermo: {
        termo: null,
        colorDeForrado: null,
        personalizacion: null
    },
    metodoMedicion: {
        metodo: '',
        nombre: ''
    },
    diasDeAtencion: [],
    desde: null,
    hasta: null,
    fechaNegociacion: null,
    fechaActualizacion: null,
    estado: null,
    esRenovacion: null,
    formaDePago: null,
    cuenta: null,
    excepcionDeAporte: null,
    esCondicionado: null
};

const defaultFormEdit = {
    options: {
        conceptosDeAporte: [...conceptosDeAporte],
        renovacion: [...renovacion],
        formaDePago: [...formaDePago],
        excepcionDeAporte: [...excepcionDeAporte],
        condicionado: [...condicionado],
        monedas: [...monedas],
        cantidadDePagos: [...cantidadDePagos],
        opcionesDeNegociacion: [...opcionesDeNegociacion],
        termos: [...termos],
        metodos: [...metodos],
        periodos: [...periodos],
        colorDeForrado: [...colorDeForrado],
        tipoDeMetodo: [...tipoDeMetodo],
        diasDeAtencion: [...opcionesDiasDeAtencion]
    },
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
        filters: {
            valueEstados: 'TODOS',
            estados: [
                {
                    value: 'TODOS',
                    label: 'Todos'
                },
                ...estadosDeNegociacion
            ],
            monedas: [...monedas],
            valueAnalista: 'TODOS',
            analistas: [
                {
                    legajo: 'TODOS',
                    nombre: 'Todos'
                }
            ]
        }
    },
    formEdit: {
        ...defaultFormEdit
    }
};

const productosReducer = function (state = initialState, action) {

    switch (action.type) {
        case Actions.NEGOCIACIONES_LISTA_CHANGE_PAGE:

            return {
                ...state,
                list: {
                    ...state.list,
                    page: action.payload.page
                }
            };
        case Actions.NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE:

            return {
                ...state,
                list: {
                    ...state.list,
                    pageSize: action.payload.quantityPerPage
                }
            };
        case Actions.NEGOCIACIONES_LISTA_SET_VALUE_SEARCH:

            return {
                ...state,
                list: {
                    ...state.list,
                    searchText: action.payload.value
                }
            };
        case Actions.NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE:

            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        valueEstados: action.payload.value
                    },
                    page: 0
                }
            };
        case Actions.NEGOCIACIONES_LISTA_CHANGE_FILTER_ANALISTA_VALUE:

            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        valueAnalista: action.payload.value
                    },
                    page: 0
                }
            };
        case Actions.NEGOCIACIONES_LISTA_CHANGE_FILTER_DESDE_VALUE:

            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        valueDesde: action.payload.value
                    },
                    page: 0
                }
            };
        case Actions.NEGOCIACIONES_LISTA_CHANGE_FILTER_HASTA_VALUE:

            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        valueHasta: action.payload.value
                    },
                    page: 0
                }
            };
        case Actions.NEGOCIACIONES_EXPORTAR:

            return {
                ...state,
                list: {
                    ...state.list,
                    alerta: {
                        ...state.list.alerta,
                        monstrar: action.payload.value,
                        error: action.payload.value,
                        mensaje: action.payload.value
                    }
                }
            };
        case Actions.NEGOCIACIONES_LISTA_SET_VALUE_DE_ANALISTA:
            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        valueAnalista: action.payload.legajoDeAnalista
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_APORTE_ECONOMICO_VALUE_INPUT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        aporteEconomico: {
                            ...state.formEdit.values.aporteEconomico,
                            [action.payload.field]: action.payload.value
                        }
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_BECA_VALUE_INPUT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        pedidoDeBeca: {
                            ...state.formEdit.values.pedidoDeBeca,
                            [action.payload.field]: action.payload.value
                        }
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_TERMO_VALUE_INPUT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        pedidoDeTermo: {
                            ...state.formEdit.values.pedidoDeTermo,
                            [action.payload.field]: action.payload.value
                        }
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_PERIODO_VALUE_INPUT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        metodoMedicion: {
                            ...state.formEdit.values.metodoMedicion,
                            [action.payload.field]: action.payload.value
                        }
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_METODO_MEDICION_VALUE_INPUT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        metodoMedicion: {
                            ...state.formEdit.values.metodoMedicion,
                            [action.payload.field]: action.payload.value
                        }
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_VALUE_INPUT:

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
        case Actions.NEGOCIACIONES_FORM_EDIT_SET_DATOS:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        ...action.payload.datos,
                        /*metodoMedicion: {
                            metodo: ''
                        }*/
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_RESET_DATOS:

            return {
                ...state,
                formEdit: {
                    ...defaultFormEdit
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        itemsNegociacion: [
                            {
                                producto: {
                                    ...action.payload.producto
                                },
                                esExclusivo: false
                            },
                            ...state.formEdit.values.itemsNegociacion
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO_ANTERIORES:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        itemsAnteriores: [
                            {
                                producto: {
                                    ...action.payload.producto
                                },
                                esExclusivo: true
                            },
                            ...state.formEdit.values.itemsAnteriores
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO:
            const productoARemover = action.payload.item.producto;
            const itemsEnLista = state.formEdit.values.itemsNegociacion;
            const index = itemsEnLista.findIndex(it => it.producto.codigo === productoARemover.codigo);
            const itemsIzq = itemsEnLista.slice(0, index);
            const itemsDer = itemsEnLista.slice(index + 1, itemsEnLista.length);

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        itemsNegociacion: [
                            ...itemsIzq,
                            ...itemsDer
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO_ANTERIORES:
            const productoAnteriorARemover = action.payload.item.producto;
            const itemsAnterioresEnLista = state.formEdit.values.itemsAnteriores;
            const indexDeProductoAnterior = itemsAnterioresEnLista.findIndex(it => it.producto.codigo === productoAnteriorARemover.codigo);
            const itemsAnterioresIzq = itemsAnterioresEnLista.slice(0, indexDeProductoAnterior);
            const itemsAnterioresDer = itemsAnterioresEnLista.slice(indexDeProductoAnterior + 1, itemsAnterioresEnLista.length);

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        itemsAnteriores: [
                            ...itemsAnterioresIzq,
                            ...itemsAnterioresDer
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_PRODUCTO_CHANGE_EXCLUSIVO:
            const productoAActuLizar = action.payload.item.producto;
            const itemsEnListaAActualizar = state.formEdit.values.itemsNegociacion;
            const indexAActualizar = itemsEnListaAActualizar.findIndex(it => it.producto.codigo === productoAActuLizar.codigo);
            const itemsIzqAModificar = itemsEnListaAActualizar.slice(0, indexAActualizar);
            const itemsDerAModificar = itemsEnListaAActualizar.slice(indexAActualizar + 1, itemsEnListaAActualizar.length);

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        itemsNegociacion: [
                            ...itemsIzqAModificar,
                            {
                                ...itemsEnListaAActualizar[indexAActualizar],
                                esExclusivo: action.payload.esExclusivo
                            },
                            ...itemsDerAModificar
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_SUBMIT:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmiting: true
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_SUBMIT_CLEAR:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmiting: false,
                    success: false,
                    error: ''
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_SUBMIT_SUCCESS:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmiting: false,
                    success: true
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_SUBMIT_FAIL:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    isSubmiting: false,
                    error: action.payload.error
                }
            };
        case Actions.NEGOCIACIONES_FORM_EDIT_CHANGE_COMENTARIO_INPUT:
            const departamento = action.payload.quienComenta;
            const contenido = action.payload.value;
            const comentarios = state.formEdit.values.comentarios;
            const indexComnetario = comentarios.findIndex(c => c.departamento === departamento);
            const comentariosIzq = comentarios.slice(0, indexComnetario);
            const comentariosDer = comentarios.slice(indexComnetario + 1, comentarios.length);
            let id = null;
            if (indexComnetario !== -1) {
                id = comentarios[indexComnetario].id ? comentarios[indexComnetario].id : null;
            }

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        comentarios: [
                            ...comentariosIzq,
                            {
                                id,
                                departamento,
                                contenido
                            },
                            ...comentariosDer
                        ]
                    }
                }
            };
        case Actions.NEGOCIACIONES_FORM_SELECT_DIA:

            return {
                ...state,
                formEdit: {
                    ...state.formEdit,
                    values: {
                        ...state.formEdit.values,
                        diasDeAtencion: [...action.payload.dias]
                    }
                }
            };
        case Actions.NEGOCIACIONES_LISTA_SET_OPCIONES_DE_ANALISTAS:

            return {
                ...state,
                list: {
                    ...state.list,
                    filters: {
                        ...state.list.filters,
                        analistas: [
                            {
                                legajo: 'TODOS',
                                nombre: 'Todos'
                            },
                            ...action.payload.analistas
                        ]
                    }
                }
            };
        default:
            return state;
    }
};

export default productosReducer;
