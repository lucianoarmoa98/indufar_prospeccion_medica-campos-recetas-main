import { all } from 'redux-saga/effects';
import dashboardSaga from '../../main/dashboard/store/sagas';
import usuarioSaga from '../../main/usuarios/store/sagas';
import medicoSaga from '../../main/medicos/store/sagas';
import negociacionSaga from '../../main/negociaciones/store/sagas';
import registrosSaga from '../../main/registros/store/sagas';
import objetivosSaga from '../../main/objetivos/store/sagas';
import objetivoSaga from '../../main/objetivo/store/sagas';
import recetaSaga from '../../main/receta/store/sagas';
import productosSaga from '../../main/productos/store/sagas';
import lineasSaga from '../../main/lineas/store/sagas';
import productosIndufarSaga from '../../main/productosIndufar/store/sagas';
import grillasSaga from '../../main/grillas/store/sagas';

export default function* rootSaga(getState) {
  yield all([
    usuarioSaga(),
    objetivoSaga(),
    objetivosSaga(),
    medicoSaga(),
    dashboardSaga(),
    negociacionSaga(),
    registrosSaga(),
    recetaSaga(),
    productosSaga(),
    lineasSaga(),
    productosIndufarSaga(),
    grillasSaga()
  ]);
}
