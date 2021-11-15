export const PRODUCTOS_INDUFAR_LISTA_CHANGE_PAGE = 'PRODUCTOS_INDUFAR_LISTA_CHANGE_PAGE';
export const PRODUCTOS_INDUFAR_LISTA_CHANGE_QUANTITY_PER_PAGE = 'PRODUCTOS_INDUFAR_LISTA_CHANGE_QUANTITY_PER_PAGE';
export const PRODUCTOS_INDUFAR_LISTA_SET_VALUE_SEARCH = 'PRODUCTOS_INDUFAR_LISTA_SET_VALUE_SEARCH';

export const PRODUCTOS_INDUFAR_SINCRONIZAR = 'PRODUCTOS_INDUFAR_SINCRONIZAR';
export const PRODUCTOS_INDUFAR_SET_SINCRONIZACION = 'PRODUCTOS_INDUFAR_SET_SINCRONIZACION';
export const PRODUCTOS_INDUFAR_RESET_SINCRONIZACION = 'PRODUCTOS_INDUFAR_RESET_SINCRONIZACION';
export const PRODUCTOS_INDUFAR_GET_CANTIDAD_POR_SINCRONIZAR = 'PRODUCTOS_INDUFAR_GET_CANTIDAD_POR_SINCRONIZAR';
export const PRODUCTOS_INDUFAR_SET_CANTIDAD_POR_SINCRONIZAR = 'PRODUCTOS_INDUFAR_SET_CANTIDAD_POR_SINCRONIZAR';

export const setCantidadPorSincronizar = (data) => ({
    type: PRODUCTOS_INDUFAR_SET_CANTIDAD_POR_SINCRONIZAR,
    payload: { data }
});

export const getCantidadPorSincronizar = () => ({
    type: PRODUCTOS_INDUFAR_GET_CANTIDAD_POR_SINCRONIZAR
});

export const resetSincronizacion = () => ({
    type: PRODUCTOS_INDUFAR_SET_SINCRONIZACION
});

export const setSincronizacion = (data) => ({
    type: PRODUCTOS_INDUFAR_SET_SINCRONIZACION,
    payload: { data }
});

export const sincronizar = () => ({
    type: PRODUCTOS_INDUFAR_SINCRONIZAR
});

export const listChangePage = page => ({
    type: PRODUCTOS_INDUFAR_LISTA_CHANGE_PAGE,
    payload: {
        page
    }
});

export const listChangeQuantityPerPage = quantityPerPage => ({
    type: PRODUCTOS_INDUFAR_LISTA_CHANGE_QUANTITY_PER_PAGE,
    payload: {
        quantityPerPage
    }
});

export const setSearchValue = value => ({
    type: PRODUCTOS_INDUFAR_LISTA_SET_VALUE_SEARCH,
    payload: {
        value
    }
});
