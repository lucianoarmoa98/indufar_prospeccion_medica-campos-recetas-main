import React from 'react';
import {FuseAuthorization, FuseLayout, FuseTheme} from '@fuse';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import jssExtend from 'jss-extend';
import history from '@history';
import store from './store';
import routes from './fuse-configs/routesConfig';
import {create} from 'jss';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider
} from '@material-ui/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import rtl from 'jss-rtl';
import UsuarioContext from './UsuarioContext';
import AppContext from './AppContext';
import {FuseSplashScreen} from '../@fuse';
import {useAuth} from './auth/useAuth';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
  const {
    usuario,
    inicializando,
    actualizarUsuario
  } = useAuth();
  if (inicializando) {
    return <FuseSplashScreen/>;
  }
  return (
    <UsuarioContext.Provider value={{
      usuario,
      actualizarUsuario
    }}>
      <AppContext.Provider
        value={{routes}}>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <Provider store={store}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Router history={history}>
                <FuseAuthorization usuario={usuario}>
                  <FuseTheme>
                    <FuseLayout/>
                  </FuseTheme>
                </FuseAuthorization>
              </Router>
            </MuiPickersUtilsProvider>
          </Provider>
        </StylesProvider>
      </AppContext.Provider>
    </UsuarioContext.Provider>
  );
};

export default App;
