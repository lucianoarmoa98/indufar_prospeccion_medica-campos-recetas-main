import React, { useState } from 'react'
import { Button, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core';
import * as Actions from '../receta/store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import MaterialTable, { MTableToolbar } from 'material-table-hotfix-initial-page-remote-data'
import { configuracionDeTablaReporte } from './ReporteIndufarConfig'
import Modal from '@material-ui/core/Modal';
import { Alert, Autocomplete } from '@material-ui/lab';
import { construirParametrosDePaginacion, URL_BASE } from '../UIUtils';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 950,
        marginLeft: '18%',
        marginTop: 80,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #D3D3D3',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ReporteIndufar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openToas, setOpenToas] = React.useState(false);
    const [medicoA, setMedicoA] = React.useState({});
    const [medicoB, setMedicoB] = React.useState({});
    const [visitador, setVisitador] = React.useState({});
    const [guardar, setGuadar] = React.useState({});
    const [severity, setSeverity] = useState('');
    const [mensaje, setMensaje] = useState('');

    const guardarDatosCaligrafia = () => {


        let enviar = medicoB ? !medicoB.nombreMedico : '' ? true : false;

        let body = {};

        if (enviar) {
            console.log("esta vacio...")
            setOpenToas(true);
            setSeverity('error');
            setMensaje('Falta seleccionar una opcion...');

        } else {

            //body.nombreMedicoA = medicoA ? medicoA.nombreMedico: '';
            //body.matriculaMedicoA = medicoA ? medicoA.matricula: '';
            //body.nombreMedicoB = medicoB ? medicoB.nombreMedico: '';
            //body.matriculaMedicoB = medicoB ? medicoB.matricula: '';
            //body.visitador = {};
            //body.visitador.legajo = visitador.legajoVisitador ? visitador.legajoVisitador: '';
            //props.formSubmitCaligrafia(body);
            setOpenToas(true);
            setSeverity('success');
            setMensaje('Se guardo correctamente...');
            handleClose();
            setMedicoB({ medicoB: '' });
            setMedicoA({ medicoA: '' });
            setVisitador({ visitador: '' });

        }
    }

    const handleCloseToas = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenToas(false);
    };

    const changeVisitador = (visitador) => {
        setVisitador(visitador);
    }

    const seleccionarMedicoA = (medico) => {
        setMedicoA(medico);
    }

    const seleccionarMedicoB = (medico) => {
        setMedicoB(medico);
    }

    const changeMedicoA = (e) => {
        if (e !== null) {
            props.getMedicos(e.target.value);
        }
    }

    const changeMedicoB = (e) => {
        if (e !== null) {
            props.getMedicos(e.target.value);
        }
    }

    const changeMedicoVisitador = (e) => {
        if (e !== null) {
            props.getVisitador(e.target.value);
        }
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        history,
        match: { params: { idReceta } }, receta
    } = props;





    const body = (
        <div className={classes.paper}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button
                    style={{ background: 'red' }}
                    variant="contained"
                    size="small"
                    onClick={handleClose}
                >
                    <span style={{ color: 'white' }}>Cerrar</span>
                </Button>
            </div>

            <div>
                <Typography>
                    <h3><b>Seleccionar Médico</b></h3>
                </Typography>
            </div>

            <div style={{ display: 'flex' }}>
                <div>
                    <Autocomplete
                        id="combo-box-demo"
                        focus={true}
                        value={medicoA}
                        selectOnFocus={true}
                        onChange={(option, value) => seleccionarMedicoA(value)}
                        onInputChange={changeMedicoA}
                        getOptionSelected={(option, value) => option.matricula === value.matricula}
                        options={receta ? receta.medicos : []}
                        getOptionLabel={(option) => option.nombreMedico ? option.nombreMedico + ` (${option.matricula})` : ''}
                        renderInput={(params) => <TextField
                            {...params}
                            inputRef={(input) => {
                                //inputRefMedico = input;
                            }}
                            style={{ width: 300 }} label="MédicoA" />}
                    />
                </div>
                <div style={{ marginLeft: '2%' }}>
                    <div>
                        <Autocomplete
                            id="combo-box-demo"
                            value={medicoB}
                            selectOnFocus={true}
                            onChange={(option, value) => seleccionarMedicoB(value)}
                            onInputChange={changeMedicoB}
                            getOptionSelected={(option, value) => option.matricula === value.matricula}
                            options={receta ? receta.medicos : []}
                            getOptionLabel={(option) => option.nombreMedico ? option.nombreMedico + ` (${option.matricula})` : ''}
                            renderInput={(params) => <TextField
                                {...params}
                                inputRef={(input) => {
                                    //inputRefMedico = input;
                                }}
                                style={{ width: 300 }} label="MédicoB" />}
                        />
                    </div>
                </div>
                <div style={{ marginLeft: '2%' }}>
                    <div>
                        <Autocomplete
                            id="combo-box-demo"
                            value={visitador}
                            selectOnFocus={true}
                            onChange={(option, value) => changeVisitador(value)}
                            onInputChange={changeMedicoVisitador}
                            getOptionSelected={(option, value) => option.legajoVisitador === value.legajoVisitador}
                            options={receta ? receta.medicos : []}
                            getOptionLabel={(option) => option.visitador ? option.visitador + ` (${option.legajoVisitador})` : ''}
                            renderInput={(params) => <TextField
                                {...params}
                                inputRef={(input) => {
                                    //inputRefMedico = input;
                                }}
                                style={{ width: 200 }} label="Visitador" />}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 45 }}>
                <Button
                    variant="contained"
                    size="small"
                    color='primary'
                    onClick={guardarDatosCaligrafia}
                >
                    <span style={{ color: 'white' }}>Guardar</span>
                </Button>
            </div>
        </div>
    );

    const tableRef = React.createRef();


    return (
        <div>
            <div style={{ padding: '2%', maxWidth: 1300 }}>
                <div style={{ textAlign: 'center' }}>
                    <Modal
                        className="modalQr"
                        open={open}
                        //onClose={handleCloseCliente}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body ? body : '-'}
                    </Modal>
                </div>
                <MaterialTable
                    title={configuracionDeTablaReporte.titulo}
                    columns={configuracionDeTablaReporte.columnas}
                    tableRef={tableRef}
                    //data={query => (
                        //new Promise(resolve => {
                            //let url = (query, URL_BASE + '/caligrafias-similar');
                            //fetch(url)
                            //.then(response => response.json())

                            //axios.get(url)
                                //.then(result => {
                                   // const { data, paginaActual, totalRegistros } = result.data.data;
       
                                   // resolve({
                                    //    data: data,
                                    //    page: paginaActual,
                                    //    totalCount: totalRegistros
                                   // });
                                //});
                        //})
                    //)}
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <div style={{ marginLeft: '62%', marginTop: -45 }}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        onClick={handleOpen}
                                    >
                                        Agregar Reporte
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
            <Snackbar open={openToas} autoHideDuration={2000} onClose={handleCloseToas}>
                <Alert onClose={handleCloseToas} severity={severity} elevation={6} variant="filled" {...props}>
                    {mensaje}
                </Alert>
            </Snackbar>
        </div>
    )
};


function mapStateToProps({receta}) {
    return {receta};
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getMedicos: Actions.getMedicos,
            getVisitador: Actions.getVisitador,
            formSubmitCaligrafia: Actions.formSubmitCaligrafia,
            listChangePage: Actions.listChangePage,
            listChangeQuantityPerPage: Actions.listChangeQuantityPerPage,
            setSearchValue: Actions.setSearchValue
        },
        dispatch
    );
}

export default reduxForm({
    form: 'formReceta'
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReporteIndufar)));