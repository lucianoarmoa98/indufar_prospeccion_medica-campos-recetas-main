// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productosIndufarActions from './store/actions';
// Material UI.
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FusePageSimple } from '@fuse';
import { configuracionDeTabla, END_POINT_PRODUCTOS } from './ProductosIndufarConfig';
import { construirParametrosDePaginacion, languageConfig } from '../UIUtils';
import { Button, Icon, Paper } from "@material-ui/core";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
//import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';


class ProductosIndufar extends React.Component {

    _isMounted = false;

    idToast = '';

    //tablaRefProducto = 'refTablaProducto';

    // tableRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            disabledButton: true
        };

        this.tableRef = React.createRef();
        this.handleClose = this.handleClose.bind(this);
        this.sincronizar = this.sincronizar.bind(this);
    }

    componentDidUpdate(prevProps) {

        const { productosIndufar: { sincronizacion, cantidadPorSincronizar } } = this.props;

        if (!_.isEmpty(sincronizacion)) {

            if (!sincronizacion.error) {
                this.tableRef.current.onQueryChange();
                toast.success("Sincronización realizada.");
            }

            this.props.resetSincronizacion();
            toast.dismiss(this.idToast);
        }

        if (!_.isEmpty(cantidadPorSincronizar)) {
            if (!cantidadPorSincronizar.error) {

                if (cantidadPorSincronizar.data > 0) {
                    toast('Hay ' + cantidadPorSincronizar.data + ' Productos nuevos para sincronizar con SAP.', {
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

    changeLinea = (e) => {
        if (e !== null && e.target.value !== undefined) {
            this.props.getLineas(e.target.value);
            //this.seleccionarMedico
        }
    }

    sincronizar = () => {
        this.idToast = toast.loading("Sincronizando los Productos...", {duration: 100000});
        this.props.sincronizar();
    }

    lineasList = (items) => (

        <FormControl component="fieldset">
            <FormLabel component="legend">Unidad de Negocios</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={this.state.idLinea} onChange={this.changeLineaRadio}>
                {items.map((item) => {
                    return (

                        <FormControlLabel key={item.id} value={item.id.toString()} control={<Radio />} label={item.nombre} />

                    );
                })}
            </RadioGroup>

        </FormControl>

    );





    render() {

        const { productosIndufar: { list }, listChangePage, listChangeQuantityPerPage, setSearchValue, history } = this.props;


        const linea = this.state.linea;

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
                                        <Modal.Title>Agregue la Unidad de Negocio para el Producto...</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        {/*
                                            this.lineasList(lineas ? lineas : [])
                                        */
                                        }

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleClose}>
                                            Cancelar
                                    </Button>
                                        <Button
                                            disabled={this.state.disabledButton}
                                            onClick={() => this.asignarLinea(this.state.productoSeleccionado, this.state.idLinea)}>
                                            OK
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                                <MaterialTable
                                    title={`${configuracionDeTabla.titulo}`}
                                    columns={configuracionDeTabla.columnas}
                                    tableRef={this.tableRef}
                                    data={query => (
                                        new Promise(resolve => {
                                            let url = construirParametrosDePaginacion(query, END_POINT_PRODUCTOS);
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
                                            tooltip: '',
                                            isFreeAction: true,
                                            onClick: () => {
                                            }
                                        }
                                    ]}
                                    components={{
                                        Container: props => <Paper {...props} elevation={0} />,
                                        Action: () => (
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
                                        ),
                                    }}
                                    onChangePage={listChangePage}
                                    onChangeRowsPerPage={listChangeQuantityPerPage}
                                    localization={languageConfig}
                                    options={{
                                        // actionsColumnIndex: -1,
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

function mapStateToProps({ productosIndufar }) {
    return { productosIndufar };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            setCantidadPorSincronizar: productosIndufarActions.setCantidadPorSincronizar,
            getCantidadPorSincronizar: productosIndufarActions.getCantidadPorSincronizar,
            resetSincronizacion: productosIndufarActions.resetSincronizacion,
            sincronizar: productosIndufarActions.sincronizar,
            listChangePage: productosIndufarActions.listChangePage,
            listChangeQuantityPerPage: productosIndufarActions.listChangeQuantityPerPage,
            setSearchValue: productosIndufarActions.setSearchValue
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductosIndufar);
