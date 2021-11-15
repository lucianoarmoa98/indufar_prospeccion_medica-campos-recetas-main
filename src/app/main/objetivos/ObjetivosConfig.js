import Objetivos from './Objetivos';

const ObjetivosConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/objetivos',
      component: Objetivos,
      exact: true
    }
  ]
};

export default ObjetivosConfig;
