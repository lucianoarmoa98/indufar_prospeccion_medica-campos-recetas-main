import ProductosIndufar from './ProductosIndufar';
import React from 'react';
import { URL_BASE } from '../UIUtils';
import moment from 'moment';

export const END_POINT_PRODUCTOS = URL_BASE + '/producto-indufar';

export const ProductosIndufarConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/productos-indufar',
            component: ProductosIndufar
        }
    ]
};

const fontSize = 12;
export const configuracionDeTabla = {
    titulo: 'Productos de Indufar',
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
                        {rowData.nombre ? rowData.nombre : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Precio Publico',
            field: 'precioPublico',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.precioPublico ? rowData.precioPublico : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Fecha de Creación',
            field: 'fechaCreacion',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {moment(rowData.fechaCreacion).format('DD/MM/YY - HH:mm:ss')}
                    </div>
                );
            }
        },
        {
            title: 'Unidad de Negocio',
            field: 'linea',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.linea ? rowData.linea.nombre : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Grilla',
            field: 'grilla',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.grilla ? rowData.grilla.nombre : '-'}
                    </div>
                );
            }
        }
    ]
};
