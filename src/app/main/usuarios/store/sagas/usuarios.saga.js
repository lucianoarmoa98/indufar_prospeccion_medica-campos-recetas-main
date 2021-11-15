/* global firebase:false */
import {all, fork, put, select, takeEvery} from 'redux-saga/effects';
import * as Actions from '../actions';
import {sleep} from '../../../UIUtils';
import * as axios from 'axios';

export const getFormUsuario = (state) => state.usuarios.formCreate;
export const getFormEditUsuario = (state) => state.usuarios.formEdit;

export function* usuarioSubmitCreate(action) {
  try {
    const {values} = yield select(getFormUsuario);
    const createFunction = firebase.functions().httpsCallable('usuarioCreate');
    yield createFunction({
      ...values
    });
    yield put(Actions.formCreateSubmitSuccess());
    yield sleep(1500);
    yield put(Actions.formCreateResetValues());
    const {history} = action.payload;
    history.push('/usuarios');
  } catch (e) {
    yield put(Actions.formCreateSubmitFail(e.toString()));
  }
}

export function* usuarioSubmitEdit(action) {
  try {
    const {values} = yield select(getFormEditUsuario);
    const createFunction = firebase.functions().httpsCallable('usuarioEdit');
    yield createFunction({
      ...values
    });
    yield put(Actions.formEditSubmitSuccess());
    yield sleep(1500);
    yield put(Actions.formEditResetValues());
    const {history} = action.payload;
    history.push('/usuarios');
  } catch (e) {
    yield put(Actions.formEditSubmitFail(e.toString()));
  }
}

export function* usuarioGetData(action) {
  try {
    const id = action.payload.id;
    const END_POINT_USUARIO = `https://us-central1-indufar-prospeccion-medi-af3dc.cloudfunctions.net/prospeccion/usuarios/${id}`;
    const data = yield axios.get(END_POINT_USUARIO);
    yield put(Actions.setData(data.data));
  } catch (e) {
    console.error(e);
  }
}

export function* watchUsuarioSubmit() {
  yield takeEvery(Actions.USUARIOS_FORM_CREATE_SUBMIT, usuarioSubmitCreate);
  yield takeEvery(Actions.USUARIOS_FORM_EDIT_SUBMIT, usuarioSubmitEdit);
  yield takeEvery(Actions.USUARIO_GET_DATA, usuarioGetData);
}

function* usuarioSaga() {
  yield all([
    fork(watchUsuarioSubmit)
  ]);
}

export default usuarioSaga;
