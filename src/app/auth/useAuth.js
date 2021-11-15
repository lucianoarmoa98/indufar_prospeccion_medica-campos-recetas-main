/* global firebase:false */
import React, {useCallback, useEffect, useState} from 'react';

export const useAuth = () => {

  const [usuario, setUsuario] = useState(null);
  const [usuarioActualizado, setUsuarioActualizado] = useState(undefined);
  const [inicializando, setInicializando] = useState(true);

  const actualizarUsuario = useCallback(usuario => {
    setUsuarioActualizado(usuario);
  }, []);

  const onChange = (usuario) => {
    setUsuarioActualizado(usuario);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchClaims = async () => {
      const {claims: {roles, legajo}} = await firebase.auth().currentUser.getIdTokenResult(true);
      setUsuario({
        ...usuarioActualizado,
        roles,
        legajo
      });
      setInicializando(false);
    };
    if (usuarioActualizado) {
      fetchClaims();
    } else if (usuarioActualizado === null) {
      setInicializando(false);
      setUsuario(null);
    }
  }, [usuarioActualizado]);

  return {
    usuario,
    inicializando,
    actualizarUsuario
  };
};
