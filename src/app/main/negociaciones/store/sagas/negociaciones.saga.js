import { all, fork, takeEvery, put, select } from 'redux-saga/effects';
import * as Actions from '../actions';
import * as axios from 'axios';
import {
    END_POINT_NEGOCIACIONES,
    END_POINT_REGISTROS,
    sleep,
    Metodo
} from '../../../UIUtils';

export function* negociacionGetData(action) {
    const { idNegociacion } = action.payload;
    const endPoint = `${END_POINT_NEGOCIACIONES}/${idNegociacion}`;
    let negociacion = yield axios.get(endPoint);

    negociacion.data = setNegociacion(negociacion.data);

    yield put(Actions.setDatos(negociacion.data));
    try {

    } catch (e) {

    }
}

export function* getOpcionesDeAnalistas() {
    const endPoint = `${END_POINT_REGISTROS}/analistas`;
    try {
        const analistas = yield axios.get(endPoint);
        yield put(Actions.setOpcionesDeAnalistas(analistas.data));
    } catch (e) {
        yield put(Actions.setOpcionesDeAnalistas([]));
    }
}

export function* exportarNegociaciones(action) {
    const endPoint = `${END_POINT_NEGOCIACIONES}/reporte`;
    try {
        let resultado = yield axios.get(endPoint);
        //yield put(Actions.setOpcionesDeAnalistas(analistas.data));
    } catch (e) {
        //yield put(Actions.setOpcionesDeAnalistas([]));
    }
}

export const getFormEditNegociaciones = (state) => state.negociaciones.formEdit;

export function* negociacionesSubmitEdit(action) {
    let { values } = yield select(getFormEditNegociaciones);
    const { id, history } = action.payload;
    if (!id) {
        return;
    }
    try {

        let metodo = values.metodoMedicion.metodo;
        const tipoDeMetodo = values.metodoMedicion.tipoDeMetodo;

        values.metodoMedicion = {};

        values.metodoMedicion.nombre = metodo;

        values.periodoDesembolso = {};

        values.periodoDesembolso.nombre = values.aporteEconomico.periodo;

        values.tipoMedicion = {};

        values.tipoMedicion.nombre = tipoDeMetodo;

        values.fechaPago = values.aporteEconomico.medicionDesembolso;

        values = validacionesCatchment(values);

        const endPoint = `${END_POINT_NEGOCIACIONES}/${id}`;
        let negociacion = yield axios.put(endPoint, { ...values });

        negociacion.data = setNegociacion(negociacion.data);

        yield put(Actions.formEditSubmitSuccess());
        yield sleep(500);
        yield put(Actions.formEditSubmitClear());
        yield put(Actions.setDatos(negociacion.data));
        // const {medico} = values;
        // history.push(`/medicos/${medico.matricula}`);
        // window.location.reload();
    } catch (e) {
        yield put(Actions.formEditSubmitFail(e.toString()));
    }
}

export function* eliminar(action) {
    const endPoint = `${END_POINT_NEGOCIACIONES}/${action.payload.id}`;
    yield put(Actions.formEditSubmit());
    try {
        yield axios.delete(endPoint);
        yield put(Actions.formEditSubmitSuccess());
        yield sleep(500);
        yield put(Actions.resetDatos());
        action.payload.history.push(`/negociaciones`);
    } catch (e) {
        yield put(Actions.formEditSubmitFail(e.toString()));
    }
}

function validacionesCatchment(negociacion){

    if(negociacion.metodoMedicion != undefined && negociacion.metodoMedicion.nombre === Metodo.CLOSE_UP){
        negociacion.periodoDesembolso = null;
        negociacion.tipoMedicion = null;
        negociacion.fechaPago = null;
    }
    return negociacion;
}

function setNegociacion(negociacion){
    
    const metodo = negociacion.metodoMedicion ? negociacion.metodoMedicion.nombre : '';
    const periodo = negociacion.periodoDesembolso ? negociacion.periodoDesembolso.nombre : '';
    const tipoMedicion = negociacion.tipoMedicion ? negociacion.tipoMedicion.nombre : '';

    if (metodo !== '') {
        negociacion.metodoMedicion.metodo = metodo;
    } else {
        negociacion.metodoMedicion = {};
    }
    if (tipoMedicion !== '') {
        negociacion.metodoMedicion.tipoDeMetodo = tipoMedicion;
    } else {
        negociacion.tipoMedicion = {};
    }
    if (periodo !== '') {
        negociacion.aporteEconomico.periodo = periodo;
    }

    return negociacion
}

export function* watchNegociaciones() {
    yield takeEvery(Actions.NEGOCIACIONES_LISTA_GET_DATA, negociacionGetData);
    yield takeEvery(Actions.NEGOCIACIONES_FORM_EDIT_SUBMIT, negociacionesSubmitEdit);
    yield takeEvery(Actions.NEGOCIACIONES_FORM_ELIMINAR, eliminar);
    yield takeEvery(Actions.NEGOCIACIONES_LISTA_GET_OPCIONES_DE_ANALISTAS, getOpcionesDeAnalistas);
    yield takeEvery(Actions.NEGOCIACIONES_EXPORTAR, exportarNegociaciones);
}

function* medicoSaga() {
    yield all([
        fork(watchNegociaciones)
    ]);
}

export default medicoSaga;
