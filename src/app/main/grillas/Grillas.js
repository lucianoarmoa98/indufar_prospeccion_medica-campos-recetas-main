// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as grillasActions from './store/actions';
// Material UI.
import MaterialTable, { MTableToolbar } from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import { FusePageSimple } from '@fuse';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { configuracionDeTabla, END_POINT_GRILLAS } from './GrillasConfig';
import { construirParametrosDePaginacion, languageConfig } from '../UIUtils';
import { Button, Icon, Paper, TextField } from "@material-ui/core";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
//import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';


class Grillas extends React.Component {

    _isMounted = false;

    //tablaRefProducto = 'refTablaProducto';

    // tableRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            disabledButton: true,
            grillaSeleccionada: undefined,
            descuento: ''
        };

        this.tableRef = React.createRef();
        this.handleClose = this.handleClose.bind(this);
        this.sincronizar = this.sincronizar.bind(this);
    }

    componentDidUpdate(prevProps) {

        const { grillas: { sincronizacion, cantidadPorSincronizar, descuento } } = this.props;

        if (!_.isEmpty(sincronizacion)) {

            if (!sincronizacion.error) {
                this.tableRef.current.onQueryChange();
                toast.success("Sincronización realizada.");
            } else {
                toast.error("ERROR al sincronizar las Unidades de Negocio");
            }

            this.props.resetSincronizacion();

        }

        if (!_.isEmpty(cantidadPorSincronizar)) {
            if (!cantidadPorSincronizar.error) {

                if (cantidadPorSincronizar.data > 0) {
                    toast('Hay ' + cantidadPorSincronizar.data + ' Unidades de Negocios para sincronizar con SAP.', {
                        icon: <Icon color="action" className="text-20">info</Icon>,
                        duration: 6000,
                        style: {
                            borderRadius: '10px',
                            background: '#2962ff',
                            color: '#fff',
                        },
                    });
                    this.props.setCantidadPorSincronizar();
                }
            }
        }

        if (!_.isEmpty(descuento)) {
            if (!descuento.error) {

                this.tableRef.current.onQueryChange();

            }

            this.props.resetDescuento();
        }


    }


    componentDidMount() {
        this._isMounted = true;
        this.props.getCantidadPorSincronizar();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    handleClose() {
        this.setState({ showModal: false });
    }

    sincronizar = () => {
        this.props.sincronizar();
    }


    actualizarDescuento = () => {

        this.props.actualizarDescuento(this.state.grillaSeleccionada.id, this.state.descuento);

        this.setState({ showModal: false });
    }

    render() {

        const { grillas: { list }, listChangePage, listChangeQuantityPerPage, setSearchValue, history } = this.props;

        return (

            <div>

                <div >
                    <Toaster position="bottom-right" />
                </div>

                <FusePageSimple
                    content={

                        <div>
                            <div className="p-24" >

                                <Modal show={this.state.showModal} onHide={this.handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Agregue el descuento para la Grilla {this.state.grillaSeleccionada ? this.state.grillaSeleccionada.nombre : ''}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>


                                        <label>Porcentaje de descuento</label>
                                        <br></br>
                                        <TextField
                                            id="input-descuento"
                                            type="number"
                                            value={this.state.descuento ? this.state.descuento : ''}
                                            onChange={event => { this.setState({ descuento: event.target.value }) }}
                                        />


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleClose}>
                                            Cancelar
                                    </Button>
                                        <Button
                                            onClick={this.actualizarDescuento}>
                                            Guardar
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                                <MaterialTable
                                    title={`${configuracionDeTabla.titulo}`}
                                    columns={configuracionDeTabla.columnas}
                                    tableRef={this.tableRef}
                                    data={query => (
                                        new Promise(resolve => {
                                            let url = construirParametrosDePaginacion(query, END_POINT_GRILLAS);
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
                                            icon: AddCircleIcon,
                                            tooltip: 'Agregar Descuento',
                                            isFreeAction: false,
                                            onClick: (event, rowData) => {
                                                this.setState({ grillaSeleccionada: rowData });
                                                this.setState({ descuento: rowData.descuento })
                                                this.setState({ showModal: true });
                                            }
                                        }
                                    ]}
                                    components={{
                                        Container: props => <Paper {...props} elevation={0} />,
                                        Toolbar: props => (
                                            <div>
                                                <MTableToolbar {...props} />
                                                <Button
                                                    onClick={this.sincronizar}
                                                    component="span"
                                                    size='small'
                                                    variant="contained"
                                                    disableElevation
                                                    style={{
                                                        marginLeft: 1100,
                                                        marginRight: 16,
                                                        marginBottom: 10,
                                                    }}
                                                    color='primary'>
                                                    Sincronizar
                                                </Button>
        
                                                
                                            </div>
                                        ),
                                        /*Action: (props) => (
                                            <div>
                                                <MTableToolbar {...props} />
                                            <Button
                                                onClick={this.sincronizar}
                                                color="primary"
                                                variant="contained"
                                                style={{
                                                    textTransform: 'none',
                                                    marginLeft: 16,
                                                    marginRight: 8
                                                }}
                                                size="small">
                                                Sincronizar
                                            </Button>
                                            </div>
                                        )*/
                                    }
                                }
                                    onChangePage={listChangePage}
                                    onChangeRowsPerPage={listChangeQuantityPerPage}
                                    localization={languageConfig}
                                    options={{
                                        actionsColumnIndex: -1,
                                        pageSize: list.pageSize,
                                        pageSizeOptions: list.pageSizeOptions,
                                        initialPage: list.page,
                                        searchText: list.searchText,
                                        padding: 'dense',
                                        debounceInterval: 900
                                    }} />
                            </div>

                        </div>
                    } />

            </div>
        );
    }
}

function mapStateToProps({ grillas }) {
    return { grillas };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            resetDescuento: grillasActions.resetDescuento,
            actualizarDescuento: grillasActions.actualizarDescuento,
            setCantidadPorSincronizar: grillasActions.setCantidadPorSincronizar,
            getCantidadPorSincronizar: grillasActions.getCantidadPorSincronizar,
            resetSincronizacion: grillasActions.resetSincronizacion,
            sincronizar: grillasActions.sincronizar,
            listChangePage: grillasActions.listChangePage,
            listChangeQuantityPerPage: grillasActions.listChangeQuantityPerPage,
            setSearchValue: grillasActions.setSearchValue
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grillas);
