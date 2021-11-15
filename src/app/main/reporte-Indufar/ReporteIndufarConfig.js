import React from 'react';
import moment from 'moment';
import ReporteIndufar from './ReporteIndufar';
import { URL_BASE } from '../UIUtils';

export const END_POINT_PRODUCTOS = URL_BASE + '/reportes-indufar';


export const ReporteIndufarConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/reportes-indufar',
            component: ReporteIndufar
        }
    ]
};

const fontSize = 12;
export const configuracionDeTablaReporte = {
    titulo: 'Lista de reportes',
    columnas: [
        {
            title: 'Médico A',
            field: 'medicoA',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.nombreMedicoA ? rowData.nombreMedicoA : '-' }
                    </div>
                );
            }
        },
        {
            title: 'Médico B',
            field: 'medicoB',
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
            title: 'Visitador',
            field: 'visitador',
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
            title: 'Unidad de negocios',
            field: 'unidadNegocios',
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
        }
    ]
};
