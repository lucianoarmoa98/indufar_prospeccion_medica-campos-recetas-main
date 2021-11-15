// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productosActions from './store/actions';
// Material UI.
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FusePageSimple } from '@fuse';
import { configuracionDeTabla, END_POINT_PRODUCTOS } from './ProductosConfig';
import { construirParametrosDePaginacion, languageConfig } from '../UIUtils';
import { Paper } from '@material-ui/core';
import { Button } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import TextField from '@material-ui/core/TextField';
import productos from './store/reducers';
//import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';


class Productos extends React.Component {

    _isMounted = false;

    //tablaRefProducto = 'refTablaProducto';

    tableRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            linea: {},
            idLinea: undefined,
            idProducto: undefined,
            productoSeleccionado: undefined,
            disabledButton: true
        };

        this.handleClose = this.handleClose.bind(this);
        this.changeLinea = this.changeLinea.bind(this);
    }
    componentDidMount() {
        this.props.getLineas('');
        this._isMounted = true;
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

    seleccionarLinea = (linea) => {

        this.setState({ linea });
    }

    /*asignarLinea = (producto, idLinea) => {

        if (producto.laboratorio.corporacion2 === 'INDUFAR CO.') {
            this.props.asignarLinea(producto.codigo, idLinea);

            this.tableRef.current.onQueryChange();

        } else {
            toast.error("ERROR, el Producto no pertenece a Indufar.");
        }

        this.setState({ showModal: false });
        this.setState({ disabledButton: true });
        this.setState({idLinea: undefined});
    }*/

    changeLineaRadio = (event) => {


        this.setState({ disabledButton: false });
        this.setState({ idLinea: event.target.value });
        //this.setState({ disabledButton: true });
    }

    /*lineasList = (items) => (

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

    );*/



    render() {
        const { productos: { list, lineas }, listChangePage, listChangeQuantityPerPage, setSearchValue } = this.props;


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

                                        {

                                            //this.lineasList(lineas ? lineas : [])

                                            /*<Autocomplete
                                                id="combo-box-demo"
                                                focus={true}
                                                value={linea}
                                                selectOnFocus={true}
                                                onChange={(option, value) => this.seleccionarLinea(value)}
                                                onInputChange={this.changeLinea}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                //options={receta ? receta.medicos : []}
                                                options={lineas ? lineas : []}
                                                getOptionLabel={(option) => option.nombre ? option.nombre : ''}
                                                style={{ width: '90%', marginTop: 10 }}

                                                renderInput={(params) => <TextField
                                                    {...params}
                                                    inputRef={(input) => {
                                                        this.inputRefMedico = input;
                                                    }}
                                                    style={{ width: '90%' }} label="Buscar por Nombre" variant="outlined" />}
                                            />*/
                                        }

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleClose}>
                                            Cancelar
                                    </Button>
                                        <Button 
                                            disabled = {this.state.disabledButton}
                                            onClick={() => this.asignarLinea(this.state.productoSeleccionado, this.state.idLinea)}>
                                            OK
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                                <MaterialTable
                                    title={`Lista de ${configuracionDeTabla.titulo}`}
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
                                    /*actions={[
                                        rowData => ({
                                            icon: 'add',
                                            position: 'row',
                                            disabled: '',
                                            tooltip: 'Agregar Unidad de Negocio',
                                            onClick: (event, rowData) => {
                                                //this.setState({ idProducto: rowData.codigo});

                                                let laboratorio = rowData.laboratorio ? rowData.laboratorio.corporacion2 : {};

                                                if (laboratorio === 'INDUFAR CO.') {
                                                    this.setState({ productoSeleccionado: rowData });
                                                    this.setState({ showModal: true });
                                                } else {
                                                    toast.error("ERROR, el Producto no pertenece a Indufar.");
                                                }
                                            }
                                            //disabled: rowData.laboratorio.corporacion2 === 'INDUFAR CO.'
                                        })
                                    ]}*/
                                    components={{
                                        Container: props => <Paper {...props} elevation={0} />
                                    }}
                                    onChangePage={listChangePage}
                                    onChangeRowsPerPage={listChangeQuantityPerPage}
                                    localization={languageConfig}
                                    options={{
                                        //actionsColumnIndex: -1,
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

function mapStateToProps({ productos }) {
    return {
        productos
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {
            asignarLinea: productosActions.asignarLinea,
            getLineas: productosActions.getLineas,
            listChangePage: productosActions.listChangePage,
            listChangeQuantityPerPage: productosActions.listChangeQuantityPerPage,
            setSearchValue: productosActions.setSearchValue
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
