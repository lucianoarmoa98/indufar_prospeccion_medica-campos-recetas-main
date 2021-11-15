import Receta from './Receta';

const RecetaConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/recetas/:idReceta',
      component: Receta
    }
  ]
};

export default RecetaConfig;