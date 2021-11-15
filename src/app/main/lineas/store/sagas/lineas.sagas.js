import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { URL_BASE } from '../../../UIUtils';


export function* sincronizarLineas(action) {
    const endPointLineas = `${URL_BASE}/lineas/sincronizar`;
    try {
        const data = yield fetch(endPointLineas).then(r => r.json());
        yield put(Actions.setSincronizacion(data));
    } catch (e) {
        //yield put(Actions.setLineas([]));
        console.error(e);
    }
}

export function* getCantidadPorSincronizar() {

    const endPointLineas = `${URL_BASE}/lineas/hay-lineas-nuevas`;
    try {
        const data = yield fetch(endPointLineas).then(r => r.json());

        yield put(Actions.setCantidadPorSincronizar(data));
    } catch (e) {
        yield put(Actions.setCantidadPorSincronizar({}));
        console.error(e);
    }
}

export function* watchLineasActions() {
    yield takeEvery(Actions.LINEAS_SINCRONIZAR, sincronizarLineas);
    yield takeEvery(Actions.LINEAS_GET_CANTIDAD_POR_SINCRONIZAR, getCantidadPorSincronizar);
}

function* lineasSaga() {
    yield all([
        fork(watchLineasActions)
    ]);
}

export default lineasSaga;
