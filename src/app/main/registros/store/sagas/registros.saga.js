import {all, fork, takeEvery, put} from 'redux-saga/effects';
import * as Actions from '../actions';
import * as axios from 'axios';
import {
  END_POINT_REGISTROS, sleep
} from '../../../UIUtils';

export function* negociacionesSubmitEdit(action) {
  let data = new FormData();
  data.append('file', action.payload.file);
  try {
    yield axios.post(END_POINT_REGISTROS + "/actualizar", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    yield put(Actions.formEditSubmitSuccess());
    yield sleep(900);
    window.location.reload();
  } catch (e) {
    yield put(Actions.formEditSubmitFail(e.toString()));
  }
}

export function* watchNegociaciones() {
  yield takeEvery(Actions.REGISTROS_FORM_EDIT_SUBMIT, negociacionesSubmitEdit);
}

function* medicoSaga() {
  yield all([
    fork(watchNegociaciones)
  ]);
}

export default medicoSaga;
