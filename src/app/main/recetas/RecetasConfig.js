import Recetas from './Recetas';
import React from 'react';
import { URL_BASE } from '../UIUtils';
import moment from 'moment';

export const END_POINT_RECETAS = URL_BASE + '/recetas';

export const RecetasConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/recetas',
            component: Recetas
        }
    ]
};

const fontSize = 12;
export const configuracionDeTabla = {
    titulo: 'Recetas',
    columnas: [
        {
            title: 'Numeración',
            field: 'numeracion',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.numeracion ? rowData.numeracion : '-'}
                    </div>
                );
            }
        },
        {
            title: 'Médico',
            field: 'nombreMedico',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.nombreMedico}
                    </div>
                );
            }
        },
        {
            title: 'Matricula',
            field: 'matriculaMedico',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.matriculaMedico}
                    </div>
                );
            }
        },
        {
            title: 'Fecha Creación',
            field: 'fechaAlta',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {moment(rowData.fechaAlta).format('DD/MM/YY - HH:mm:ss')} hs.
                    </div>
                );
            }
        },
        {
            title: 'Fecha Prescripción',
            field: 'fechaPrescripcion',
            render: rowData => {
                return (
                    <div
                        style={{ fontSize }}>
                        {rowData.fechaPrescripcion ? moment(rowData.fechaPrescripcion).format('DD/MM/YY') : "-"}
                    </div>
                );
            }
        },
    ]
};

