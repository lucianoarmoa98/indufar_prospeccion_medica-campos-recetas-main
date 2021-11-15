import {all, select, fork, put, takeEvery} from 'redux-saga/effects';
import * as Actions from '../actions';
import {URL_BASE} from '../../../UIUtils';


export function* getData(action) {
  const {idDeObjetivo} = action.payload;
  const endPointObjetivo = `${URL_BASE}/objetivos-apm/medico-region/${idDeObjetivo}`;
  try {
    const data = yield fetch(endPointObjetivo).then(r => r.json());
    yield put(Actions.setData(data));
  } catch (e) {
    yield put(Actions.setData({}));
    console.error(e);
  }
}

export const getFormValues = (state) => state.objetivo.formEdit;

export function* submit(action) {
  const {history, idDeObjetivo} = action.payload;
  const {values} = yield select(getFormValues);
  let endPointObjetivo;
  let method;
  if (idDeObjetivo) {
    method = 'PUT';
    endPointObjetivo = `${URL_BASE}/objetivos-apm/medico-region/${idDeObjetivo}`;
  } else {
    method = 'POST';
    endPointObjetivo = `${URL_BASE}/objetivos-apm`;
  }
  try {
    yield fetch(endPointObjetivo, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });
    yield put(Actions.formSubmitSuccess());
    history.push('/objetivos');
  } catch (e) {
    yield put(Actions.formSubmitFail());
    console.error(e);
  }
}

export function* watchObjetivosActions() {
  yield takeEvery(Actions.OBJETIVO_GET_DATA, getData);
  yield takeEvery(Actions.OBJETIVO_SUBMIT, submit);
}

function* objetivoSaga() {
  yield all([
    fork(watchObjetivosActions)
  ]);
}

export default objetivoSaga;
