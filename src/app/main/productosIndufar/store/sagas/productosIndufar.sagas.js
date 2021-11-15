import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { URL_BASE } from '../../../UIUtils';


export function* sincronizarProductosIndufar(action) {

    const endPointProductos = `${URL_BASE}/producto-indufar/sincronizar`;
    try {
        const data = yield fetch(endPointProductos).then(r => r.json());
        yield put(Actions.setSincronizacion(data));
    } catch (e) {
        //yield put(Actions.setLineas([]));
        console.error(e);
    }
}

export function* getCantidadPorSincronizar() {
    const endPointProductos = `${URL_BASE}/producto-indufar/hay-productos-nuevos`;
    try {
        const data = yield fetch(endPointProductos).then(r => r.json());

        yield put(Actions.setCantidadPorSincronizar(data));
    } catch (e) {
        yield put(Actions.setCantidadPorSincronizar({}));
        console.error(e);
    }
}

export function* watchProductosIndufarActions() {
    yield takeEvery(Actions.PRODUCTOS_INDUFAR_SINCRONIZAR, sincronizarProductosIndufar);
    yield takeEvery(Actions.PRODUCTOS_INDUFAR_GET_CANTIDAD_POR_SINCRONIZAR, getCantidadPorSincronizar);
}

function* productosIndufarSaga() {
    yield all([
        fork(watchProductosIndufarActions)
    ]);
}

export default productosIndufarSaga;
