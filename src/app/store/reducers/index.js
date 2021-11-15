import {combineReducers} from 'redux';
import reduxFormReducer from '../../../app/form-error/reducers';
import fuse from './fuse';
import auth from '../../../app/auth/store/reducers';
import quickPanel
  from '../../../app/fuse-layouts/shared-components/quickPanel/store/reducers';
import dashboard from '../../main/dashboard/store/reducers';
import usuarios from '../../main/usuarios/store/reducers';
import productos from '../../main/productos/store/reducers';
import objetivos from '../../main/objetivos/store/reducers';
import objetivo from '../../main/objetivo/store/reducers';
import medicos from '../../main/medicos/store/reducers';
import negociaciones from '../../main/negociaciones/store/reducers';
import registros from '../../main/registros/store/reducers';
import receta from '../../main/receta/store/reducers';
import recetas from '../../main/recetas/store/reducers';
import lineas from '../../main/lineas/store/reducers';
import productosIndufar from '../../main/productosIndufar/store/reducers';
import grillas from '../../main/grillas/store/reducers';
import caligrafiaSimilar from '../../main/CaligrafiaSimilar/store/reducers';


const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    fuse,
    quickPanel,
    dashboard,
    productos,
    objetivos,
    usuarios,
    medicos,
    objetivo,
    negociaciones,
    registros,
    receta,
    recetas,
    lineas,
    productosIndufar,
    grillas,
    caligrafiaSimilar,
    form: reduxFormReducer,
    ...asyncReducers
  });

export default createReducer;
