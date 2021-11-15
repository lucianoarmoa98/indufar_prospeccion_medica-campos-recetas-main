import { all, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { URL_BASE } from '../../../UIUtils';


export function* getLineas(action) {
    const { linea } = action.payload;
    const endPointLineas = `${URL_BASE}/lineas?busqueda=${linea}&porPagina=12&ordenadoPor=nombre;ASC`;
    try {
        const data = yield fetch(endPointLineas).then(r => r.json());
        yield put(Actions.setLineas(data));
    } catch (e) {
        yield put(Actions.setLineas([]));
        console.error(e);
    }
}

export function* asignarLinea(action) {
    const { idProducto, idLinea } = action.payload;
    const endPointLineas = `${URL_BASE}/productos/asignar-linea/${idProducto}/${idLinea}`;
    try {
        const data = yield fetch(endPointLineas).then(r => r.json());

        //yield put(Actions.setLineas(data));
    } catch (e) {
        //yield put(Actions.setLineas([]));
        console.error(e);
    }
}


export function* watchProductosActions() {
    yield takeEvery(Actions.PRODUCTOS_GET_LINEAS, getLineas);
    yield takeEvery(Actions.PRODUCTOS_ASIGNAR_LINEA, asignarLinea);

}

function* productosSaga() {
    yield all([
        fork(watchProductosActions)
    ]);
}

export default productosSaga;
