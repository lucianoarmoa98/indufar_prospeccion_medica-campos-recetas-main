import {all, fork, put, takeEvery} from 'redux-saga/effects';
import * as axios from 'axios';
import * as Actions from '../actions';
import {END_POINT_ESTADISTICAS, END_POINT_UBICACIONES} from '../../../UIUtils';

export function* visitadoresObtenerDatos() {
  try {
    const endPointVisitadores = `${END_POINT_UBICACIONES}/lista-plana`;
    const datosDeMedico = yield axios.get(endPointVisitadores);
    yield put(Actions.setDatosDeMapa(datosDeMedico.data));
  } catch (e) {
    console.error(e);
  }
}

export function* obtenerUltimasNegociaciones() {
}

export function* getNegociacionesPorAnalista() {
  try {
    const endPointNegociacionesPorAnalista = `${END_POINT_ESTADISTICAS}/negociaciones-por-analistas`;
    const datosDeAnalistas = yield axios.get(endPointNegociacionesPorAnalista);
    yield put(Actions.setsNegociacionesPorAnalista(datosDeAnalistas.data));
  } catch (e) {
    console.error(e);
  }
}

export function* watchVisitadorSubmit() {
  yield takeEvery(Actions.DASHBOARD_MAPA_GET_DATOS, visitadoresObtenerDatos);
  yield takeEvery(Actions.DASHBOARD_GET_ULTIMAS_NEGOCIACIONES, obtenerUltimasNegociaciones);
  yield takeEvery(Actions.DASHBOARD_GET_NEGOCIACIONES_POR_ANALISTA, getNegociacionesPorAnalista);
}

function* medicoSaga() {
  yield all([
    fork(watchVisitadorSubmit)
  ]);
}

export default medicoSaga;
