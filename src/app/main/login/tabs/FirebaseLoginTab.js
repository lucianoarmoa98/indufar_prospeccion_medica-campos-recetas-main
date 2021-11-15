/* global serviceWorkerEsSoportado:false, inicializarFCM:false */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, InputAdornment, Icon, LinearProgress} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {LOGIN_ERROR} from '../../../auth/store/actions';
import UsuarioContext from '../../../UsuarioContext';

function removeArrobaPart(value) {
  return value.split('@')[0];
}

function FirebaseLoginTab(props) {
  const {usuario} = useContext(UsuarioContext);
  const dispatch = useDispatch();
  const login = useSelector(({auth}) => auth.login);
  const [enabledButton, setEnabledButton] = useState(false);
  const [labelButton, setLabelButton] = useState('Ingresar');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  useEffect(() => {
    if (login.error && (login.error.username || login.error.password)) {
      formRef.current.updateInputsWithError({
        ...login.error
      });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setEnabledButton(false);
  }

  function enableButton() {
    setEnabledButton(true);
  }

  function handleSubmit(model) {
    setLabelButton('Ingresando...');
    setEnabledButton(false);
    setLoading(true);
    dispatch(authActions.submitLoginWithFireBase(model))
      .then((e) => {
        if (e.type === LOGIN_ERROR) {
          setLabelButton('Ingresar');
          setEnabledButton(true);
          setLoading(false);
          return;
        }
        localStorage.setItem('username', removeArrobaPart(model.username));
        if (serviceWorkerEsSoportado()) {
          inicializarFCM();
        }
      })
      .catch(e => {
        setLabelButton('Ingresar');
        setEnabledButton(true);
        setLoading(false);
        console.error(e);
      });
  }

  if (usuario) {
    props.history.push('/productos');
  }

  return (
    <div className="w-full">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center w-full">
        <TextFieldFormsy
          className="mb-16"
          type="text"
          name="username"
          label="Correo"
          validations={{minLength: 4}}
          validationErrors={{minLength: 'Min character length is 4'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  email
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required/>
        <TextFieldFormsy
          className="mb-16"
          type="password"
          name="password"
          label="Contraseña"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  className="text-20"
                  color="action">
                  vpn_key
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto normal-case mt-16"
          aria-label="LOG IN"
          disabled={!enabledButton}
          value="firebase">
          {labelButton}
        </Button>
        {
          loading &&
          <LinearProgress
            className="w-xs"
            color="secondary"
            style={{width: '100%'}}/>
        }
      </Formsy>
    </div>
  );
}

export default withRouter(FirebaseLoginTab);
