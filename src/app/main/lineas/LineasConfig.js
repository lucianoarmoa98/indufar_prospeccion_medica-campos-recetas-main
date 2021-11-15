import Lineas from './Lineas';
import React from 'react';
import { URL_BASE } from '../UIUtils';

export const END_POINT_LINEAS = URL_BASE + '/lineas';

export const LineasConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/lineas',
            component: Lineas
        }
    ]
};

const fontSize = 12;
export const configuracionDeTabla = {
    titulo: 'Unidades de Negocio',
    columnas: [
        {
            title: 'Código Sap',
            field: 'codigoSap',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.codigoSap ? rowData.codigoSap : '-' }
                    </div>
                );
            }
        },
        {
            title: 'Nombre',
            field: 'nombre',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.nombre}
                    </div>
                );
            }
        }
    ]
};
