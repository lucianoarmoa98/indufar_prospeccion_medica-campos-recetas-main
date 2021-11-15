import Grillas from './Grillas';
import React from 'react';
import { URL_BASE } from '../UIUtils';

export const END_POINT_GRILLAS = URL_BASE + '/grillas';

export const GrillasConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/grillas',
            component: Grillas
        }
    ]
};

const fontSize = 12;
export const configuracionDeTabla = {
    titulo: 'Grillas',
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
        },
        {
            title: 'Descuento',
            field: 'descuento',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.descuento ? rowData.descuento + ' %' : '-'}
                    </div>
                );
            }
        }
    ]
};
