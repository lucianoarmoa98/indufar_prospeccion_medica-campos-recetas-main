import { Button, Paper, Typography } from '@material-ui/core';
import FieldsSection from '../../../components/Form/FieldSection';
import * as PropTypes from 'prop-types';
import React from 'react';
import { opcionesDeMetodoMedicion } from '../negociaciones/NegociacionesConfig';
import Collapse from '@material-ui/core/Collapse';

function MetodoMedicion(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [labelButton, setLabelButton] = React.useState('Más');
    const handleExpandClick = () => {
        setExpanded(!expanded);
        setLabelButton(expanded ? 'Más' : 'Menos');
    };

    const { formEditChangeInput, formEdit, clearAsyncError } = props;
    const formOpcionesMetodo = opcionesDeMetodoMedicion(formEditChangeInput, formEdit);
    const { values: { metodoMedicion: { metodo } } } = formEdit;
    const detalle = metodo ?
        <>
            <span>Metodo: {metodo}</span>
        </> :
        'Sin dato';
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-4 pt-4"
                style={{ minHeight: 52 }}>
                <div>
                    <Typography className="text-16 px-12">Metodo Medición</Typography>
                    {
                        !expanded && detalle &&
                        <Typography
                            variant="body2"
                            className='px-12'
                            color="textSecondary"
                            gutterBottom>
                            {detalle}
                        </Typography>
                    }
                </div>
                <div style={{
                    alignSelf: 'start',
                    display: 'flex',
                    flexDirection: 'row-reverse'
                }}>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={handleExpandClick}
                        style={{ marginRight: 16, marginTop: 8 }}>
                        {labelButton}
                    </Button>
                </div>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div style={{ margin: 16 }}>
                    <FieldsSection
                        fieldsGroup={formOpcionesMetodo}
                        clearAsyncError={clearAsyncError} />
                </div>
            </Collapse>
        </Paper>
    );
}

MetodoMedicion.propTypes = {
    formEditChangeInput: PropTypes.any,
    formEdit: PropTypes.any,
    clearAsyncError: PropTypes.any
};

export default MetodoMedicion;
