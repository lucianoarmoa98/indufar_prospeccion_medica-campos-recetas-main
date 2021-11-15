
export const NEGOCIACIONES_LISTA_CHANGE_PAGE = 'NEGOCIACIONES_LISTA_CHANGE_PAGE';
export const NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE = 'NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const NEGOCIACIONES_LISTA_SET_VALUE_SEARCH = 'NEGOCIACIONES_LISTA_SET_VALUE_SEARCH';
export const NEGOCIACIONES_LISTA_GET_DATA = 'NEGOCIACIONES_LISTA_GET_DATA';
export const NEGOCIACIONES_LISTA_SET_DATA = 'NEGOCIACIONES_LISTA_SET_DATA';
export const NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE = 'NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_APORTE_ECONOMICO_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_APORTE_ECONOMICO_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_BECA_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_BECA_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_TERMO_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_TERMO_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_METODO_MEDICION_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_METODO_MEDICION_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_PERIODO_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_PERIODO_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_VALUE_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_VALUE_INPUT';
export const NEGOCIACIONES_FORM_EDIT_SUBMIT = 'NEGOCIACIONES_FORM_EDIT_SUBMIT';
export const NEGOCIACIONES_FORM_EDIT_SUBMIT_CLEAR = 'NEGOCIACIONES_FORM_EDIT_SUBMIT_CLEAR';
export const NEGOCIACIONES_FORM_EDIT_RESET_STATE = 'NEGOCIACIONES_FORM_EDIT_RESET_STATE';
export const NEGOCIACIONES_FORM_EDIT_SET_DATOS = 'NEGOCIACIONES_FORM_EDIT_SET_DATOS';
export const NEGOCIACIONES_FORM_EDIT_RESET_DATOS = 'NEGOCIACIONES_FORM_EDIT_RESET_DATOS';
export const NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO = 'NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO';
export const NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO = 'NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO';
export const NEGOCIACIONES_FORM_EDIT_PRODUCTO_CHANGE_EXCLUSIVO = 'NEGOCIACIONES_FORM_EDIT_PRODUCTO_CHANGE_EXCLUSIVO';
export const NEGOCIACIONES_FORM_EDIT_SUBMIT_SUCCESS = 'NEGOCIACIONES_FORM_EDIT_SUBMIT_SUCCESS';
export const NEGOCIACIONES_FORM_EDIT_SUBMIT_FAIL = 'NEGOCIACIONES_FORM_EDIT_SUBMIT_FAIL';
export const NEGOCIACIONES_FORM_EDIT_CHANGE_COMENTARIO_INPUT = 'NEGOCIACIONES_FORM_EDIT_CHANGE_COMENTARIO_INPUT';
export const NEGOCIACIONES_FORM_SELECT_DIA = 'NEGOCIACIONES_FORM_SELECT_DIA';
export const NEGOCIACIONES_FORM_ELIMINAR = 'NEGOCIACIONES_FORM_ELIMINAR';
export const NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO_ANTERIORES = 'NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO_ANTERIORES';
export const NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO_ANTERIORES = 'NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO_ANTERIORES';
export const NEGOCIACIONES_LISTA_SET_OPCIONES_DE_ANALISTAS = 'NEGOCIACIONES_LISTA_SET_OPCIONES_DE_ANALISTAS';
export const NEGOCIACIONES_LISTA_SET_VALUE_DE_ANALISTA = 'NEGOCIACIONES_LISTA_SET_VALUE_DE_ANALISTA';
export const NEGOCIACIONES_LISTA_GET_OPCIONES_DE_ANALISTAS = 'NEGOCIACIONES_LISTA_GET_OPCIONES_DE_ANALISTAS';
export const NEGOCIACIONES_LISTA_CHANGE_FILTER_ANALISTA_VALUE = 'NEGOCIACIONES_LISTA_CHANGE_FILTER_ANALISTA_VALUE';

export const NEGOCIACIONES_LISTA_CHANGE_FILTER_HASTA_VALUE = 'NEGOCIACIONES_LISTA_CHANGE_FILTER_HASTA_VALUE';
export const NEGOCIACIONES_LISTA_CHANGE_FILTER_DESDE_VALUE = 'NEGOCIACIONES_LISTA_CHANGE_FILTER_DESDE_VALUE';

export const NEGOCIACIONES_EXPORTAR = 'NEGOCIACIONES_EXPORTAR';

export const listChangePage = page => ({
    type: NEGOCIACIONES_LISTA_CHANGE_PAGE,
    payload: {
        page
    }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
    type: NEGOCIACIONES_LISTA_CHANGE_QUANTITY_PER_PAGE,
    payload: {
        quantityPerPage
    }
});

export const setSearchValue = value => ({
    type: NEGOCIACIONES_LISTA_SET_VALUE_SEARCH,
    payload: {
        value
    }
});

export const getData = idNegociacion => ({
    type: NEGOCIACIONES_LISTA_GET_DATA,
    payload: {
        idNegociacion
    }
});

export const setDatosDeNegociaciones = datos => ({
    type: NEGOCIACIONES_LISTA_SET_DATA,
    payload: {
        datos
    }
});

export const changeFilterValue = value => ({
    type: NEGOCIACIONES_LISTA_CHANGE_FILTER_VALUE,
    payload: {
        value
    }
});

export const changeFilterValueAnalista = value => ({
    type: NEGOCIACIONES_LISTA_CHANGE_FILTER_ANALISTA_VALUE,
    payload: {
        value
    }
});

export const changeFilterValueDesde = value => (
    {
        type: NEGOCIACIONES_LISTA_CHANGE_FILTER_DESDE_VALUE,
        payload: {
            value
        }
    });

export const changeFilterValueHasta = value => (
    {
        type: NEGOCIACIONES_LISTA_CHANGE_FILTER_HASTA_VALUE,
        payload: {
            value
        }
    });

export const exportarNegociaciones = value => (

    {
        type: NEGOCIACIONES_EXPORTAR,
        payload: {
            value
        }
    });

export const formEditChangeComentario = (quienComenta, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_COMENTARIO_INPUT,
    payload: {
        quienComenta,
        value
    }
});

export const formEditChangeAporteEconomicoInput = (field, value) => (
    {
        type: NEGOCIACIONES_FORM_EDIT_CHANGE_APORTE_ECONOMICO_VALUE_INPUT,
        payload: {
            field,
            value
        }
    });

export const formEditChangePedidoDeBecaInput = (field, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_BECA_VALUE_INPUT,
    payload: {
        field,
        value
    }
});

export const formEditChangePedidoDeTermoInput = (field, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_PEDIDO_DE_TERMO_VALUE_INPUT,
    payload: {
        field,
        value
    }
});

export const formEditChangePeriodoInput = (field, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_PERIODO_VALUE_INPUT,
    payload: {
        field,
        value
    }
});

export const formEditChangeMetodoMedicionInput = (field, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_METODO_MEDICION_VALUE_INPUT,
    payload: {
        field,
        value
    }
});

export const formEditChangeInput = (field, value) => ({
    type: NEGOCIACIONES_FORM_EDIT_CHANGE_VALUE_INPUT,
    payload: {
        field,
        value
    }
});

export const formEditSubmit = (history, id) => ({
    type: NEGOCIACIONES_FORM_EDIT_SUBMIT,
    payload: {
        history,
        id
    }
});

export const formEditSubmitClear = () => ({
    type: NEGOCIACIONES_FORM_EDIT_SUBMIT_CLEAR
});

export const formEditResetValues = (error) => ({
    type: NEGOCIACIONES_FORM_EDIT_RESET_STATE,
    payload: {
        error
    }
});

export const setDatos = (datos) => ({
    type: NEGOCIACIONES_FORM_EDIT_SET_DATOS,
    payload: {
        datos
    }
});

export const resetDatos = () => ({
    type: NEGOCIACIONES_FORM_EDIT_RESET_DATOS,
});

export const addProducto = (producto) => ({
    type: NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO,
    payload: {
        producto
    }
});

export const removeProducto = (item) => ({
    type: NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO,
    payload: {
        item
    }
});

export const changeExclusivoProducto = (esExclusivo, item) => ({
    type: NEGOCIACIONES_FORM_EDIT_PRODUCTO_CHANGE_EXCLUSIVO,
    payload: {
        esExclusivo,
        item
    }
});

export const formEditSubmitSuccess = () => ({
    type: NEGOCIACIONES_FORM_EDIT_SUBMIT_SUCCESS
});

export const formEditSubmitFail = (error) => ({
    type: NEGOCIACIONES_FORM_EDIT_SUBMIT_FAIL,
    payload: {
        error
    }
});

export const changeDiaDeTrabajo = (dias) => ({
    type: NEGOCIACIONES_FORM_SELECT_DIA,
    payload: {
        dias
    }
});

export const eliminar = (id, history) => ({
    type: NEGOCIACIONES_FORM_ELIMINAR,
    payload: {
        id, history
    }
});


export const addProductoAnteriores = (producto) => ({
    type: NEGOCIACIONES_FORM_EDIT_ADD_PRODUCTO_ANTERIORES,
    payload: {
        producto
    }
});

export const removeProductoAnteriores = (item) => ({
    type: NEGOCIACIONES_FORM_EDIT_REMOVE_PRODUCTO_ANTERIORES,
    payload: {
        item
    }
});

export const setOpcionesDeAnalistas = (analistas) => ({
    type: NEGOCIACIONES_LISTA_SET_OPCIONES_DE_ANALISTAS,
    payload: {
        analistas
    }
});

export const setAnalista = (legajoDeAnalista) => ({
    type: NEGOCIACIONES_LISTA_SET_VALUE_DE_ANALISTA,
    payload: {
        legajoDeAnalista
    }
});

export const getOpcionesDeAnalistas = () => ({
    type: NEGOCIACIONES_LISTA_GET_OPCIONES_DE_ANALISTAS
});
