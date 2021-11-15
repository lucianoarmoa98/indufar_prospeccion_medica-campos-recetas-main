import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { URL_BASE } from '../../../UIUtils';


export function* sincronizarGrillas(action) {
    const endPointGrillas = `${URL_BASE}/grillas/sincronizar`;
    try {
        const data = yield fetch(endPointGrillas).then(r => r.json());
        yield put(Actions.setSincronizacion(data));
    } catch (e) {
        //yield put(Actions.setL([]));
        console.error(e);
    }
}

export function* getCantidadPorSincronizar() {

    const endPointGrillas = `${URL_BASE}/grillas/hay-grillas-nuevas`;
    try {
        const data = yield fetch(endPointGrillas).then(r => r.json());

        yield put(Actions.setCantidadPorSincronizar(data));
    } catch (e) {
        yield put(Actions.setCantidadPorSincronizar({}));
        console.error(e);
    }
}

export function* actualizarDescuento(action) {

    const { idGrilla, descuento } = action.payload;
    const endPointGrilla = `${URL_BASE}/grillas/actualizar/${idGrilla}`;

    let body = {};
    body.descuento = descuento;
    try {
        const data = yield fetch(endPointGrilla, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(res => {
                return res;
            });

        yield put(Actions.setDescuento(data));
    } catch (e) {
        yield put(Actions.setDescuento({}));
        console.error(e);
    }
}

export function* watchGrillasActions() {
    yield takeEvery(Actions.GRILLAS_SINCRONIZAR, sincronizarGrillas);
    yield takeEvery(Actions.GRILLAS_GET_CANTIDAD_POR_SINCRONIZAR, getCantidadPorSincronizar);
    yield takeEvery(Actions.GRILLAS_ACTUALIZAR_DESCUENTO, actualizarDescuento);
}

function* grillasSaga() {
    yield all([
        fork(watchGrillasActions)
    ]);
}

export default grillasSaga;
