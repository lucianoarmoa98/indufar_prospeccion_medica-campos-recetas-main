import {all, fork, put, takeEvery} from 'redux-saga/effects';
import * as axios from 'axios';
import * as Actions from '../actions';
import {
  END_POINT_APM,
  END_POINT_MEDICOS,
  END_POINT_PRODUCTOS_DE_PROSPECTO,
  END_POINT_TAM
} from '../../../UIUtils';

export function* medicoGetData(action) {
  try {
    const {matricula} = action.payload;
    const endPointMedico = `${END_POINT_MEDICOS}/${matricula}`;
    const datosDeMedico = yield axios.get(endPointMedico);
    const endPointNegociacionesVigentes = `${END_POINT_MEDICOS}/${matricula}/negociaciones-vigentes`;
    const {data: ultimasNegociaciones} = yield axios.get(endPointNegociacionesVigentes);
    let negociacionVigente = null;
    let negociacionAdelantada = null;
    if (ultimasNegociaciones.length > 0) {
      negociacionVigente = ultimasNegociaciones[0];
    }
    if (ultimasNegociaciones.length > 1) {
      negociacionAdelantada = ultimasNegociaciones[1];
    }
    yield put(Actions.setDatosDeMedico({
      ...datosDeMedico.data,
      negociacionVigente,
      negociacionAdelantada
    }));
  } catch (e) {
    console.error(e);
  }
}

export function* getTamsDisponibles() {
  try {
    const tams = yield axios.get(END_POINT_TAM);
    yield put(Actions.setTamsDisponibles(tams.data));
  } catch (e) {
    console.error(e);
  }
}

export function* getCalculoEntryMarket(action) {
  try {
    const {matricula} = action.payload;
    const endPointProductoDeProspecto = `${END_POINT_PRODUCTOS_DE_PROSPECTO}/medicos/${matricula}`;
    const historico = yield axios.get(endPointProductoDeProspecto);
    yield put(Actions.setHistorico(historico.data));
    const endPointApm = `${END_POINT_APM}/medicos/${matricula}`;
    const datosDeApm = yield axios.get(endPointApm);
    yield put(Actions.setDatosDeObjetivo(datosDeApm.data))
  } catch (e) {
    console.error(e);
  }
}

export function* watchMedicoSubmit() {
  yield takeEvery(Actions.MEDICOS_LISTA_GET_DATA, medicoGetData);
  yield takeEvery(Actions.MEDICOS_LISTA_GET_TAMS_DISPONIBLES, getTamsDisponibles);
  yield takeEvery(Actions.MEDICOS_GET_CALCULO_ENTRYMARKET, getCalculoEntryMarket);
}

function* medicoSaga() {
  yield all([
    fork(watchMedicoSubmit)
  ]);
}

export default medicoSaga;
