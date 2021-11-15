
import {all, select, fork, out, takeEvery} from 'redux-saga/effects';

export function* getData(action){

}

export function* submit(action){

}

export function* watchObjetivosActions(){

}

function* objetivosSaga() {

  yield all( [
    fork(watchObjetivosActions)
  ]);
}

export default objetivosSaga
