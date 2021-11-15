import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import {DashboardConfig} from '../main/dashboard/DashboardConfig';
import {ProductosConfig} from '../main/productos/ProductosConfig';
import {MedicosConfig} from '../main/medicos/MedicosConfig';
import {UsuariosConfig} from '../main/usuarios/UsuariosConfig';
import {pagesConfigs} from '../main/pages/pagesConfigs';
import {LoginConfig} from '../main/login/LoginConfig';
import {NegociacionesConfig} from '../main/negociaciones/NegociacionesConfig';
import {RegistrosConfig} from '../main/registros/RegistrosConfig';
import ObjetivosConfig from '../main/objetivos/ObjetivosConfig';
import ObjetivoConfig from '../main/objetivo/ObjetivoConfig';

import RecetaConfig from '../main/receta/RecetaConfig';
import {RecetasConfig} from '../main/recetas/RecetasConfig';

import {LineasConfig} from '../main/lineas/LineasConfig';
import {ProductosIndufarConfig} from '../main/productosIndufar/ProductosIndufarConfig';
import {GrillasConfig} from 'app/main/grillas/GrillasConfig';
import { ReporteIndufarConfig } from 'app/main/reporte-Indufar/ReporteIndufarConfig';
import {CaligrafiaSimilarConfig} from 'app/main/CaligrafiaSimilar/CaligrafiaSimilarConfig';




const routeConfigs = [
  ...pagesConfigs,
  DashboardConfig,
  ExampleConfig,
  LoginConfig,
  ProductosConfig,
  MedicosConfig,
  UsuariosConfig,
  NegociacionesConfig,
  RegistrosConfig,
  ObjetivoConfig,
  ObjetivosConfig,
  RecetaConfig,
  RecetasConfig,
  LineasConfig,
  ProductosIndufarConfig,
  GrillasConfig,
  ReporteIndufarConfig,
  CaligrafiaSimilarConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/medicos"/>
  }, {
    component: () => <Redirect to="/pages/errors/error-404"/>
  }
];

export default routes;
