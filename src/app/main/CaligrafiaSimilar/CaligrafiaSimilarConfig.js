
import React from 'react';
import { URL_BASE } from '../UIUtils';
import moment from 'moment';
import CaligrafiaSimilar from './CaligrafiaSimilar';

export const END_POINT_CALIGRAFIA_SIMILAR= URL_BASE + '/caligrafias-similar';

export const CaligrafiaSimilarConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/caligrafia-similar',
            component: CaligrafiaSimilar
        }
    ]
};

const fontSize = 12;
export const configuracionDeTabla = {
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
                        {rowData.nombreMedicoB ? rowData.nombreMedicoB : '-'}
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
                        {rowData.visitador ? rowData.visitador.nombre : '-'}
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

