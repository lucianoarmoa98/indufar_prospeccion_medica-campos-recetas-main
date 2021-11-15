import { all, select, fork, put, takeEvery } from 'redux-saga/effects';
import * as Actions from '../actions';
import { URL_BASE } from '../../../UIUtils';

export function* getProductos(action) {
    const { data } = action.payload;
    const endPointProducto = `${URL_BASE}/productos?busqueda=${data}`;
    try {
        const data = yield fetch(endPointProducto).then(r => r.json());

        yield put(Actions.setProductos(data));
    } catch (e) {
        yield put(Actions.setProductos([]));
        console.error(e);
    }
}

export function* getMedicos(action) {

    const { data } = action.payload;
    const endPointRegistro = `${URL_BASE}/registros?busquedaV2=${data}&porPagina=12&ordenadoPor=nombreMedico;ASC`;
    try {
        const data = yield fetch(endPointRegistro).then(r => r.json());

        yield put(Actions.setMedicos(data));
    } catch (e) {
        yield put(Actions.setMedicos([]));
        console.error(e);
    }
}

export function* getVisitador(action) {

    const { data } = action.payload;
    const endPointRegistro = `${URL_BASE}/registros?porPagina=1&paginaActual=0&busqueda=${data}`;
    try {
        const data = yield fetch(endPointRegistro).then(r => r.json());

        yield put(Actions.setVisitador(data));
    } catch (e) {
        yield put(Actions.setVisitador([]));
        console.error(e);
    }
}

export function* getTams(action) {

    const { data } = action.payload;
    const endPointTams = `${URL_BASE}/tams/paginado?busqueda=${data}`;
    try {
        const data = yield fetch(endPointTams).then(r => r.json());
        yield put(Actions.setTams(data));
    } catch (e) {
        yield put(Actions.setTams([]));
        console.error(e);
    }
}


export function* guardarReceta(action) {

    const { body } = action.payload;
    const endPointRecetas = `${URL_BASE}/recetas/guardar`;

    let data;
    try {

        data = yield fetch(endPointRecetas, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(res => {
                return res;
            });

    } catch (e) {
        data = {};
        data.mensaje = "ERROR, el servidor no responde.";
        data.error = true;

        console.error(e);
    }

    yield put(Actions.setMensaje(data));
}

export function* guardarCaligrafia(action) {

    const { body } = action.payload;
    
    const endPointCaligrafia = `${URL_BASE}/caligrafias-similar/guardar`;

    let data;
    try {

        data = yield fetch(endPointCaligrafia, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(res => {
                return res;
            });

    } catch (e) {
        data = {};
        data.mensaje = "ERROR, el servidor no responde.";
        data.error = true;

        console.error(e);
    }

    yield put(Actions.setMensaje(data));
}



export function* editarReceta(action) {

    const { idReceta, body } = action.payload;
    const endPointRecetas = `${URL_BASE}/recetas/guardar/${idReceta}`;
    let data
    try {

        data = yield fetch(endPointRecetas, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(res => {
                return res;
            });


    } catch (e) {
        //yield put(Actions.setTams([]));
        data = {};
        data.mensaje = "ERROR, el servidor no responde.";
        data.error = true;

        console.error(e);
    }

    yield put(Actions.setMensaje(data));
}


export function* getReceta(action) {
    const { idReceta } = action.payload;
    const endPointReceta = `${URL_BASE}/recetas/${idReceta}`;
    try {
        const data = yield fetch(endPointReceta).then(r => r.json());

        yield put(Actions.setReceta(data));
    } catch (e) {
        yield put(Actions.setReceta({}));
        console.error(e);
    }
}

export function* desactivarReceta(action) {
    const { history, idReceta } = action.payload;
    const endPointReceta = `${URL_BASE}/recetas/desactivar/${idReceta}`;
    let data;
    try {
        data = yield fetch(endPointReceta, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
                return res;
            });

        if(data.error){
            // mensaje de ERROR
            yield put(Actions.setMensaje(data));
        } else {
            history.push('/recetas');
        }

    } catch (e) {
        data = {};
        data.mensaje = "ERROR, el servidor no responde.";
        data.error = true;
        yield put(Actions.setMensaje(data));

        console.error(e);
    }

}

export const getFormValues = (state) => state.producto.formEdit;
export function* submit(action) {
    const { history, idDeProducto } = action.payload;
    const { values } = yield select(getFormValues);
    let endPointProducto;
    let method;
    if (idDeProducto) {
        method = 'PUT';
        endPointProducto = `${URL_BASE}/productos/${idDeProducto}`;
    } else {
        method = 'POST';
        endPointProducto = `${URL_BASE}/productos`;
    }
    try {
        yield fetch(endPointProducto, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        yield put(Actions.formSubmitSuccess());
        history.push('/productos');
    } catch (e) {
        yield put(Actions.formSubmitFail());
        console.error(e);
    }
}

export function* watchRecetasActions() {
    yield takeEvery(Actions.RECETA_GET_PRODUCTOS, getProductos);
    yield takeEvery(Actions.RECETA_GET_MEDICOS, getMedicos);
    yield takeEvery(Actions.RECETA_GET_TAMS, getTams);
    yield takeEvery(Actions.RECETA_SUBMIT, guardarReceta);
    yield takeEvery(Actions.RECETA_GET_DATA, getReceta);
    yield takeEvery(Actions.RECETA_EDIT_DATA, editarReceta);
    yield takeEvery(Actions.RECETA_DESACTIVAR, desactivarReceta);
    yield takeEvery(Actions.RECETA_GET_VISITADOR, getVisitador);
    yield takeEvery(Actions.RECETA_SUBMIT_CALIGRAFIA, guardarCaligrafia);
}

function* recetaSaga() {
    yield all([
        fork(watchRecetasActions)
    ]);
}

export default recetaSaga;
