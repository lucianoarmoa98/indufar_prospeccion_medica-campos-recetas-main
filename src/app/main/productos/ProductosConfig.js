import Productos from './Productos';
import React from 'react';
import { URL_BASE } from '../UIUtils';

export const END_POINT_PRODUCTOS = URL_BASE + '/productos';

export const ProductosConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/productos',
      component: Productos
    }
  ]
};

const fontSize = 12;
export const configuracionDeTabla = {
  titulo: 'Productos',
  columnas: [
    {
      title: 'Código',
      field: 'codigo',
      render: rowData => {
        return (
          <div
            style={{ fontSize }}>
            {rowData.codigo}
          </div>
        );
      }
    },
    {
      title: 'Nombre',
      field: 'descripcion',
      render: rowData => {
        return (
          <div
            style={{ fontSize }}>
            {rowData.descripcion}
          </div>
        );
      }
    },
    {
      title: 'Clase Terp.',
      field: 'presentacion',
      render: rowData => {
        let laboratorioLabel = rowData.codigoClaseTerapeutica;
        if (rowData.claseTerapeutica) {
          const {codigo, descripcion} = rowData.claseTerapeutica;
          laboratorioLabel = `${codigo} / ${descripcion}`;
        }
        return (
          <div
            style={{ fontSize }}>
            {laboratorioLabel}
          </div>
        );
      }
    },
    {
      title: 'Laboratorio',
      field: 'laboratorio',
      render: rowData => {
        let laboratorioLabel = '';
        if (rowData.laboratorio) {
          const {corporacion1, corporacion2} = rowData.laboratorio;
          laboratorioLabel = `${corporacion1} / ${corporacion2}`;
        }
        return (
          <div
            style={{ fontSize }}>
            {laboratorioLabel}
          </div>
        );
      }
    },
    /*{
      title: 'Unidad de Negocio',
      field: 'linea',
      render: rowData => {
        let laboratorioLabel = '';
        if (rowData.laboratorio) {
          const {corporacion1, corporacion2} = rowData.laboratorio;
          laboratorioLabel = `${corporacion1} / ${corporacion2}`;
        }

        return (
          <div
            style={{ fontSize }}>
            { rowData.linea ? rowData.linea.nombre : '-'}
          </div>
        );
      }
    }*/
    // {
    //   title: 'Molécula',
    //   field: 'molecula',
    //   render: rowData => {
    //     return (
    //       <div
    //         style={{ fontSize }}>
    //         {rowData.molecula}
    //       </div>
    //     );
    //   }
    // }
  ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ProductosConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
