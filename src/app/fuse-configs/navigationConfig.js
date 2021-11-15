import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import ar from './navigation-i18n/ar';
import _ from '@lodash';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    'id': 'applications',
    'title': 'Menú',
    'translate': 'Menú',
    'type': 'group',
    'icon': 'apps',
    'children': [
      {
        'id': 'dashboard-component',
        'title': 'Dashboard',
        'translate': 'Dashboard',
        'type': 'item',
        'icon': 'show_chart',
        'url': '/dashboard',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!(roles.includes('ANALISTA') || roles.includes('GERENTE') || roles.includes('JEFE')
            || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO') || roles.includes('T.I.'));
        }
      }, {
        'id': 'medico-component',
        'title': 'Médicos',
        'translate': 'Médicos',
        'type': 'item',
        'icon': 'control_point',
        'url': '/medicos',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!(roles.includes('ANALISTA') || roles.includes('GERENTE') || roles.includes('VISITADOR') || roles.includes('JEFE')
            || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO') || roles.includes('T.I.'));
        }
      }, {
        'id': 'negociaciones-component',
        'title': 'Negociaciones',
        'translate': 'Negociaciones',
        'type': 'item',
        'icon': 'shop',
        'url': '/negociaciones',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!(roles.includes('ANALISTA') || roles.includes('GERENTE') || roles.includes('JEFE')
            || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO') || roles.includes('T.I.'));
        }
      }, {
        'id': 'registros-component',
        'title': 'Registros',
        'translate': 'Registros',
        'type': 'item',
        'icon': 'folder',
        'url': '/registros',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!(roles.includes('ANALISTA') || roles.includes('GERENTE') || roles.includes('JEFE')
            || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO') || roles.includes('T.I.'));
        }
      },
      {
        'id': 'recetas-component',
        'title': 'Recetas',
        'translate': 'Recetas',
        'type': 'item',
        'icon': 'fareceipt',
        'url': '/recetas'
      },
      {
        'id': 'reporte-component',
        'title': 'Reportes de Recetas',
        'translate': 'Reportes de Recetas',
        'type': 'item',
        'icon': 'report',
        'url': '/caligrafia-similar'
      },
      {
        'id': 'productos-indufar-component',
        'title': 'Productos Indufar',
        'translate': 'Productos Indufar',
        'type': 'item',
        'icon': 'poll',
        'url': '/productos-indufar'
      },
      {
        'id': 'lineas-component',
        'title': 'Unidades de Negocio',
        'translate': 'Unidades de Negocio',
        'type': 'item',
        'icon': 'business',
        'url': '/lineas'
      },
      {
        'id': 'lineas-component',
        'title': 'Grillas',
        'translate': 'Grillas',
        'type': 'item',
        'icon': 'apps',
        'url': '/grillas'
      },
      {
        'id': 'products-component',
        'title': 'Productos',
        'translate': 'Productos',
        'type': 'item',
        'icon': 'store',
        'url': '/productos'
      }, {
        'id': 'usuarios-component',
        'title': 'Usuarios',
        'translate': 'Usuarios',
        'type': 'item',
        'icon': 'group',
        'url': '/usuarios',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!(roles.includes('ANALISTA') || roles.includes('GERENTE') || roles.includes('JEFE')
            || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO') || roles.includes('T.I.'));
        }
      },
      /*{
        'id': 'objetivos-component',
        'title': 'Objetivos APM',
        'translate': 'Objetivos APM',
        'type': 'item',
        'icon': 'trending_up',
        'url': '/objetivos',
        isVisible: (roles) => {
          if (_.isEmpty(roles)) {
            return false
          }
          return !!( roles.includes('T.I.'));
        }
      },*/
    ]
  }
];

export default navigationConfig;
