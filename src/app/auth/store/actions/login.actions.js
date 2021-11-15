/* global firebase: true */
import jwtService from 'app/services/jwtService';
import {setUserData} from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password}) {
  return (dispatch) =>
    jwtService.signInWithEmailAndPassword(email, password)
      .then((user) => {
          dispatch(setUserData(user));
          return dispatch({
            type: LOGIN_SUCCESS
          });
        }
      )
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
}

export function submitLoginWithFireBase({username, password}) {
  const usernameFormateado = username.indexOf('@') !== -1 ? username : `${username}@indufar.com.py`;
  return (dispatch) =>
    firebase.auth().signInWithEmailAndPassword(usernameFormateado, password)
      .then(() => {
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        console.info('error');
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];
        const response = {
          username: usernameErrorCodes.includes(error.code) ? error.message : null,
          password: passwordErrorCodes.includes(error.code) ? error.message : null
        };
        dispatch(Actions.showMessage({message: error.message}));
        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}
