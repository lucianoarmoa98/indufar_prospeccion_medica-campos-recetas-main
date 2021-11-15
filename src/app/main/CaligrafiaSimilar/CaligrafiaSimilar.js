// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Material UI.
import MaterialTable, { MTableToolbar } from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import { FusePageSimple } from '@fuse';
import { configuracionDeTabla, END_POINT_CALIGRAFIA_SIMILAR } from './CaligrafiaSimilarConfig';
import { construirParametrosDePaginacion, languageConfig, URL_BASE } from '../UIUtils';
import { Paper, Button, Typography, TextField, Modal, Snackbar, CircularProgress } from '@material-ui/core';
import * as Actions from '../receta/store/actions';
import { Alert, Autocomplete } from '@material-ui/lab';

class CaligrafiaSimilar extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.seleccionarMedicoA = this.seleccionarMedicoA.bind(this);
        this.seleccionarMedicoB = this.seleccionarMedicoB.bind(this);
        this.seleccionarVisitador = this.seleccionarVisitador.bind(this);
        this.changeMedicoA = this.changeMedicoA.bind(this);
        this.changeMedicoB = this.changeMedicoB.bind(this);
        this.changeMedicoVisitador = this.changeMedicoVisitador.bind(this);
        this.guardarDatosCaligrafia = this.guardarDatosCaligrafia.bind(this);
        this.handleCloseToas = this.handleCloseToas.bind(this);
        this.exportarCaligrafia = this.exportarCaligrafia.bind(this);

        this.state = {
            openAlert: true,
            open: false,
            medicoA: {},
            medicoB: {},
            visitador: {},
            mensaje: '',
            severity: '',
            openToas: false,
            display: 'none'
        };
    }

    seleccionarMedicoA = (medico) => {
        this.setState({ medicoA: medico });
    }

    seleccionarMedicoB = (medico) => {
        this.setState({ medicoB: medico });
    }

    seleccionarVisitador = (visitador) => {
        this.setState({ visitador });
    }

    changeMedicoA = (e) => {
        if (e !== null) {
            this.props.getMedicos(e.target.value);
        }
    }

    changeMedicoB = (e) => {
        if (e !== null) {
            this.props.getMedicos(e.target.value);
        }
    }

    changeMedicoVisitador = (e) => {
        if (e !== null) {
            this.props.getVisitador(e.target.value);
        }
    }


    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOpen() {
        this.setState({
            open: true
        });
    };

    handleCloseToas(event, reason) {
        if (reason === "clickaway") {
            return;
        }

        this.setState({
            openToas: false
        });
    };

    exportarCaligrafia() {
        let enviar = true

        if (enviar) {
            this.setState({ openToas: true });
            this.setState({ severity: 'success' });
            this.setState({ display: 'block' });
            this.setState({ mensaje: 'Descargando...' });
            let url = `${URL_BASE}/caligrafias-similar/reporte`;

            setTimeout(() => window.open(url, '_blank'), 2000);
            setTimeout(() => this.setState({ display: 'none' }), 2000);
            setTimeout(() => this.setState({ mensaje: 'Descarga completa...' }), 2000);
        } else {
            console.log("error al descargar...")
        }
        //setTimeout(() => pdfExportComponent.current.save(), 1000);
    }


    guardarDatosCaligrafia() {


        let enviar = this.state.medicoB ? !this.state.medicoB.nombreMedico : '' ? !true : !false;
        let enviar2 = this.state.medicoA ? !this.state.medicoA.nombreMedico : '' ? !true : !false;
        let enviar3 = this.state.visitador ? !this.state.visitador : '' ? !true : !false;

        let body = {};

        if (enviar || enviar2 || enviar3) {
            console.log("esta vacio...");
            this.setState({ mensaje: 'Seleccione una opcion...' });
            this.setState({ openToas: true });
            this.setState({ severity: 'error' });

        } else {



            body.nombreMedicoA = this.state.medicoA ? this.state.medicoA.nombreMedico : '';
            body.matriculaMedicoA = this.state.medicoA ? this.state.medicoA.matricula : '';
            body.nombreMedicoB = this.state.medicoB ? this.state.medicoB.nombreMedico : '';
            body.matriculaMedicoB = this.state.medicoB ? this.state.medicoB.matricula : '';
            body.visitador = {};
            body.visitador.legajo = this.state.visitador ? this.state.visitador.legajoVisitador : '';
            this.props.formSubmitCaligrafia(body);
            this.setState({ openToas: true });
            this.setState({ severity: 'success' });
            this.setState({ mensaje: 'Se guardo correctamente...' });
            this.handleClose();
            this.setState({ medicoA: '' });
            this.setState({ medicoB: '' });
            this.setState({ visitador: '' });
        }
    }

    handleClose() {
        this.setState({
            open: false
        });
        this.setState({ medicoA: '' });
        this.setState({ medicoB: '' });
        this.setState({ visitador: '' });
    };

    render() {


        const { listChangePage, listChangeQuantityPerPage, setSearchValue, receta: { list }, history } = this.props;


        //const { caligrafiaSimilar: { list }, listChangePage, listChangeQuantityPerPage, setSearchValue, history } = this.props;

        const {
            //history,
            match: { params: { idReceta } }, receta
        } = this.props;

        const body = (
            <div style={{ marginLeft: '20%', marginTop: 30 }}>
                <Paper style={{ height: '300px', overflow: 'scroll', overflowX: 'hidden', position: 'absolute', width: 900 }}>
                    <div style={{ marginLeft: '2%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 25 }}>
                            <Button
                                style={{ background: 'red' }}
                                variant="contained"
                                size="small"
                                onClick={this.handleClose}
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
                            {<div>
                                <Autocomplete
                                    id="combo-box-demo"
                                    focus={true}
                                    //value={this.state.medicoA}
                                    selectOnFocus={true}
                                    onChange={(option, value) => this.seleccionarMedicoA(value)}
                                    onInputChange={this.changeMedicoA}
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
                            </div>}

                            {<div style={{ marginLeft: '2%' }}>
                                <div>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={this.state.medicoB}
                                        selectOnFocus={true}
                                        onChange={(option, value) => this.seleccionarMedicoB(value)}
                                        onInputChange={this.changeMedicoB}
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
                            </div>}
                            <div style={{ marginLeft: '2%' }}>
                                <div>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        //value={visitador}
                                        selectOnFocus={true}
                                        onChange={(option, value) => this.seleccionarVisitador(value)}
                                        onInputChange={this.changeMedicoVisitador}
                                        getOptionSelected={(option, value) => option.legajoVisitador === value.legajoVisitador}
                                        options={receta ? receta.medicos : []}
                                        getOptionLabel={(option) => option.visitador ? option.visitador + ` (${option.legajoVisitador})` : ''}
                                        renderInput={(params) => <TextField
                                            {...params}
                                            inputRef={(input) => {
                                                //thisinputRefMedico = input;
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
                                onClick={() => this.guardarDatosCaligrafia()}
                            >
                                <span style={{ color: 'white' }}>Guardar</span>
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        );


        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <div style={{ textAlign: 'center' }}>
                            <Modal
                                className="modalQr"
                                open={this.state.open}
                                //onClose={handleCloseCliente}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {body ? body : '-'}
                            </Modal>
                        </div>
                        <MaterialTable
                            title={`${configuracionDeTabla.titulo}`}
                            columns={configuracionDeTabla.columnas}
                            data={query => (
                                new Promise(resolve => {
                                    let url = construirParametrosDePaginacion(query, END_POINT_CALIGRAFIA_SIMILAR);
                                    fetch(url)
                                        .then(response => response.json())
                                        .then(result => {
                                            if (!this._isMounted) {
                                                return;
                                            }
                                            if (setSearchValue) {
                                                setSearchValue(query.search);
                                            }
                                            resolve({
                                                data: result.data,
                                                page: result.paginaActual,
                                                totalCount: result.totalRegistros
                                            });
                                            listChangePage(result.paginaActual);
                                        });
                                })
                            )}

                            actions={[
                                {
                                    icon: 'add',
                                    tooltip: 'Agregar Creacion',
                                    isFreeAction: true,
                                    onClick: () => {
                                    }
                                }
                            ]}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />,
                                Action: () => (
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Button
                                                onClick={this.exportarCaligrafia}
                                                color="secondary"
                                                variant="contained"
                                                size="small"
                                            >
                                                Exportar
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={this.handleOpen}
                                                color="primary"
                                                variant="contained"
                                                style={{
                                                    textTransform: 'none',
                                                    marginLeft: 16,
                                                    marginRight: 8
                                                }}
                                                size="small">
                                                Agregar Reporte
                                            </Button>
                                        </div>
                                    </div>
                                ),
                            }}
                            onChangePage={listChangePage}
                            onChangeRowsPerPage={listChangeQuantityPerPage}
                            localization={languageConfig}
                            options={{
                                pageSize: list.pageSize,
                                pageSizeOptions: list.pageSizeOptions,
                                initialPage: list.page,
                                searchText: list.searchText,
                                padding: 'dense',
                                debounceInterval: 900
                            }}
                        //onRowClick={(event, rowData) => history.push(`/recetas/${rowData.id}`)} 
                        />
                        <Snackbar open={this.state.openToas} autoHideDuration={2000} onClose={this.handleCloseToas}>
                            <Alert onClose={this.handleCloseToas} severity={this.state.severity} elevation={6} variant="filled" {...this.props}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ display: this.state.display }}>
                                        <CircularProgress size={20} />
                                    </div>

                                    <div>
                                        {this.state.mensaje}
                                    </div>
                                </div>
                            </Alert>
                        </Snackbar>
                    </div>
                } />
        );
    }
}

function mapStateToProps({ receta }) {

    return {
        receta
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            listChangePage: Actions.listChangePage,
            listChangeQuantityPerPage: Actions.listChangeQuantityPerPage,
            setSearchValue: Actions.setSearchValue,
            getMedicos: Actions.getMedicos,
            getVisitador: Actions.getVisitador,
            formSubmitCaligrafia: Actions.formSubmitCaligrafia
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CaligrafiaSimilar);
