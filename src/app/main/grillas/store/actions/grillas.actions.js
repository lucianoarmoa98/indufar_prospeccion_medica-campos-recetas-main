export const GRILLAS_LISTA_CHANGE_PAGE = 'GRILLAS_LISTA_CHANGE_PAGE';
export const GRILLAS_LISTA_CHANGE_QUANTITY_PER_PAGE = 'GRILLAS_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const GRILLAS_LISTA_SET_VALUE_SEARCH = 'GRILLAS_LISTA_SET_VALUE_SEARCH';

export const GRILLAS_SINCRONIZAR = 'GRILLAS_SINCRONIZAR';
export const GRILLAS_SET_SINCRONIZACION = 'GRILLAS_SET_SINCRONIZACION';
export const GRILLAS_RESET_SINCRONIZACION = 'GRILLAS_RESET_SINCRONIZACION';
export const GRILLAS_GET_CANTIDAD_POR_SINCRONIZAR = 'GRILLAS_GET_CANTIDAD_POR_SINCRONIZAR';
export const GRILLAS_SET_CANTIDAD_POR_SINCRONIZAR = 'GRILLAS_SET_CANTIDAD_POR_SINCRONIZAR';

export const GRILLAS_ACTUALIZAR_DESCUENTO = 'GRILLAS_ACTUALIZAR_DESCUENTO';

export const GRILLAS_SET_DESCUENTO = 'GRILLAS_SET_DESCUENTO';

export const GRILLAS_RESET_DESCUENTO = 'GRILLAS_RESET_DESCUENTO';


export const resetDescuento = () => ({
    type: GRILLAS_RESET_DESCUENTO
});

export const setDescuento = (data) => ({
    type: GRILLAS_SET_DESCUENTO,
    payload: { data }
});

export const actualizarDescuento = (idGrilla, descuento) => ({
    type: GRILLAS_ACTUALIZAR_DESCUENTO,
    payload: {idGrilla, descuento}
});

export const setCantidadPorSincronizar = (data) => ({
    type: GRILLAS_SET_CANTIDAD_POR_SINCRONIZAR,
    payload: { data }
});

export const getCantidadPorSincronizar = () => ({
    type: GRILLAS_GET_CANTIDAD_POR_SINCRONIZAR
});

export const resetSincronizacion = () => ({
    type: GRILLAS_SET_SINCRONIZACION
});

export const setSincronizacion = (data) => ({
    type: GRILLAS_SET_SINCRONIZACION,
    payload: { data }
});

export const sincronizar = () => ({
    type: GRILLAS_SINCRONIZAR
});

export const listChangePage = page => ({
    type: GRILLAS_LISTA_CHANGE_PAGE,
    payload: {
        page
    }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
    type: GRILLAS_LISTA_CHANGE_QUANTITY_PER_PAGE,
    payload: {
        quantityPerPage
    }
});

export const setSearchValue = value => ({
    type: GRILLAS_LISTA_SET_VALUE_SEARCH,
    payload: {
        value
    }
});
