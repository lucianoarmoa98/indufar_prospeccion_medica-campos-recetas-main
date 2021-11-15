import React from 'react';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
//import FieldsSection from '../form/FieldSection';
//import { obtenerConfguracionDeFormReceta } from '../../FormConfig';
import _ from 'lodash';
import { FusePageSimple } from '@fuse';
import Header from './Header';
//import Footer from '../form/Footer';
import TextField from '@material-ui/core/TextField';
import { Button, Icon, IconButton, Paper, Tooltip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Footer from '../../../components/Form/Footer';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Typography } from '@material-ui/core';
import { matchSorter } from 'match-sorter';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import toast, { Toaster } from 'react-hot-toast';


class Receta extends React.Component {

    //nputRefMedico
    inputRefTam = '';
    inputRefMedico = '';
    inputRefProducto = '';
    document = document;
    _isMounted = false;
    actionKey = false;
    actionKeyControl = false;


    //_clearInputProducto = false;

    constructor(props) {
        super(props);

        this.state = {
            tam: {},
            formCrear: undefined,
            medico: {},
            producto: {},
            seleccionados: [],
            cantidad: 1,
            selectedDate: new Date(),
            recetaCompleta: 'SI',
            recetaDuplicada: 'NO',
            recetaEscrito: 'SI',
            recetaSobreEscrita: 'NO',
            recetaCaligrafia: 'NO',
            clearProducto: '',
            productoAutoFocus: false,
            expandir: false,
            labelTitulo: 'Más',
            numeracionReceta: '',
            //actionKey: false,
            //actionKeyControl: false,
            options: [],
            inputValue: '',
            inputRefMedico: '',
            open: true,
            camposVacios: {
                fecha: true,
                nombre: true,
                sello: true,
                firma: true,
                todos: true
            }
        };
        this.changeCantidad = this.changeCantidad.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.changeRecetaCompleta = this.changeRecetaCompleta.bind(this);
        this.changeCamposVacios = this.changeCamposVacios.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
        this.setFormReceta = this.setFormReceta.bind(this);
        this.changeRecetaDuplicada = this.changeRecetaDuplicada.bind(this);
        this.changeRecetaEscrito = this.changeRecetaEscrito.bind(this);
        this.changeRecetaCaligrafia = this.changeRecetaCaligrafia.bind(this);
        this.changeExpandirDetalles = this.changeExpandirDetalles.bind(this);
        this.changeNumeracionReceta = this.changeNumeracionReceta.bind(this);
        this.changeRecetaSobreEscrita = this.changeRecetaSobreEscrita.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.receta.productos !== this.props.receta.productos) {
            this.setState({ options: nextProps.receta.productos });
        }

        return true;

    }

    componentDidUpdate(prevProps) {
        const {
            match: { params: { idReceta } }, receta
        } = this.props;



        /*if(this._clearInputProducto){
            //this.setState({inputValue: ''});
            //this.setState({ clearProducto: Math.random() });
            this._clearInputProducto = false;
        }*/


        if (this.props.receta.formEdit !== prevProps.receta.formEdit) {

            this.setState({ tam: receta.tams ? receta.tams[0] : undefined });

            if (idReceta !== 'crear') {
                this.setFormReceta();
            }
        }

    }

    resetCampos() {

        let camposVacios = {};
        camposVacios.fecha = true;
        camposVacios.nombre = true;
        camposVacios.sello = true;
        camposVacios.firma = true;
        camposVacios.todos = true;
        this.setState({ camposVacios });
        this.setState({ recetaCompleta: 'SI' });
        this.setState({ inputValue: '' });
        this.setState({ cantidad: 1 });
        this.setState({ seleccionados: [] });
        this.setState({ clearProducto: Math.random() });
    }


    componentDidMount() {

        let fecha = new Date();
        let year = fecha.getFullYear().toString();

        this.props.getTams(year);


        let idReceta = this.props.match.params.idReceta;

        if (idReceta !== 'crear') {

            this.setState({ formCrear: false });
            // getDatos de la receta
            this.props.getReceta(idReceta);

        } else {
            this.setState({ formCrear: true });
            let input = this.inputRefTam ? this.inputRefTam.focus() : ''; //this.inputRefMedico ? this.inputRefMedico.focus() : '';

        }

        this._isMounted = true;
    }

    setFormReceta() {

        let recetaDetalles = this.props.receta.formEdit;

        let seleccionados = recetaDetalles.map((element) => {

            element.producto.cantidad = element.cantidad;

            return element.producto;
        })

        this.setState({ seleccionados });


        let receta = recetaDetalles[0] ? recetaDetalles[0].receta : undefined;

        let medico = {};
        let tam = {};

        let camposVacios = {};

        let recetaCompleta;
        if (receta !== undefined) {
            medico.matricula = receta.matriculaMedico;
            medico.nombreMedico = receta.nombreMedico;
            medico.localidad = receta.localidadMedico;
            medico.especialidad = receta.especialidadMedico;
            tam.tam = receta.tam;

            const { tieneFechaPrescripcion, tieneFirma, tieneNombre, tieneSello } = receta;

            camposVacios.fecha = tieneFechaPrescripcion ? tieneFechaPrescripcion : false;
            camposVacios.nombre = tieneNombre ? tieneNombre : false;
            camposVacios.sello = tieneSello ? tieneSello : false;
            camposVacios.firma = tieneFirma ? tieneFirma : false;

            if (tieneFechaPrescripcion && tieneFirma && tieneNombre && tieneSello) {
                // esta completo
                recetaCompleta = 'SI';
                camposVacios.todos = true;
            } else {
                // No esta completo
                // ver campos que no tiene
                recetaCompleta = 'NO';
                camposVacios.todos = false;
            }

            this.setState({ camposVacios });
            this.setState({ recetaCompleta });
            this.setState({ medico });
            this.setState({ tam });
            this.setState({ selectedDate: receta.fechaPrescripcion });
            this.setState({ recetaDuplicada: receta.duplicado ? 'SI' : 'NO' });
            this.setState({ recetaEscrito: receta.formatoEscrito ? 'SI' : 'NO' });
            this.setState({ recetaCaligrafia: receta.caligrafiaSimilar ? 'SI' : 'NO' });
            this.setState({ numeracionReceta: receta.numeracion });
            console.log("setReceta...");
            console.log(receta);
            this.setState({ recetaSobreEscrita: receta.sobreEscrita ? 'SI' : 'NO' });
            //this.setState({recetaSobreEscrita: receta.sobre})
        } else {

        }

    }

    changeExpandirDetalles = () => {
        
        this.setState({ labelTitulo: this.state.expandir ? 'Más' : 'Menos' })
        this.setState({ expandir: !this.state.expandir });
    }

    changeProducto = (e) => {
        this.props.getProductos(e.target.value);

    }

    changeMedico = (e) => {
        if (e !== null) {
            this.props.getMedicos(e.target.value);
            //this.seleccionarMedico
            console.log("medicos...");
            console.log(this.props.getMedicos(e.target.value));
        }
    }

    changeTam = (e) => {
        let year = new Date().getFullYear().toString();
        this.props.getTams(e ? e.target.value : year);
        if (e !== null) {
            //this.setState({ tam: e.target.value });
        }
    }


    seleccionarProducto = (producto) => {
        this.setState({ producto });
    }

    seleccionarMedico = (medico) => {

        this.setState({ medico });
    }

    seleccionarTam = (tam) => {
        this.setState({ tam });
    }

    clearInputProducto = () => {
        this.setState({ inputValue: '' })
    }

    eliminarProducto(codigoProducto) {

        let productos = this.state.seleccionados;

        productos = productos.filter(element => element.codigo !== codigoProducto);

        this.setState({ seleccionados: productos });

    }

    guardarReceta = (medico, recetaCompleta, camposVacios, tam, productosSeleccionados, fechaPrescripcion, recetaDuplicada, recetaEscrito, caligrafiaSimilar, numeracionReceta) => {

        let body = {};

        let enviar = true;

        if (_.isEmpty(medico)) {
            toast.error("ERROR, debe seleccionar un Médico.");
            enviar = false;
        } else {
            body.medico = {
                matricula: medico.matricula,
                nombre: medico.nombreMedico,
                especialidad: medico.especialidad,
                localidad: medico.localidad
            };

            //body.registroId = 7626;

        }

        body.recetaCompleta = recetaCompleta;
        body.recetaDuplicada = recetaDuplicada;
        body.recetaEscrito = recetaEscrito;
        body.caligrafiaSimilar = caligrafiaSimilar;
        body.numeracion = numeracionReceta;
        body.sobreEscrita = this.state.recetaSobreEscrita;

        if (recetaCompleta == 'NO') {
            if (camposVacios.fecha && camposVacios.nombre && camposVacios.sello && camposVacios.firma) {
                toast.error("ERROR, debe seleccionar los campos Vacios de la Receta.");
                enviar = false;
            } else {
                body.camposVacios = camposVacios;
            }
        }

        if (_.isEmpty(tam)) {
            toast.error("ERROR, debe seleccionar un TAM.");
            enviar = false;
        } else {
            body.tam = tam.tam;
        }

        // TO DO FALTA RELACIONAR LOS PRODUCTOS CON LOS VISITADORES
        if (_.isEmpty(productosSeleccionados)) {
            toast.error("ERROR, debe agregar algun Producto.");
            enviar = false;
        } else {

            body.detalle = [
                {
                    cantidad: 0,
                    legajoVisitador: '0000',
                    nombreVisitador: 'JUAN',
                    producto: {
                        codigo: '0'
                    }
                }
            ];

            body.productos = productosSeleccionados;
        }

        body.fechaPrescripcion = fechaPrescripcion;

        if (enviar) {
            //toast.loading("Enviando Receta...");

            if (this.state.formCrear) {
                this.props.formSubmit(body);

                this.resetCampos();

                let input = this.inputRefProducto ? this.inputRefProducto : '';

            } else {
                const {
                    match: { params: { idReceta } }
                } = this.props;
                this.props.editarReceta(idReceta, body);
            }


        }
        this.setState({ inputValue: "" });
    }

    desactivarReceta = (idReceta, history) => {

        this.props.desactivarReceta(idReceta, history);

    }

    agregarProducto(producto) {
        //let producto = this.state.producto;
        let cantidad = this.state.cantidad;

        if (producto == null || producto === undefined || producto.codigo === undefined) {
            toast.error("ERROR debe seleccionar un Producto.");
            return;
        }
        if (cantidad === undefined || cantidad === '') {
            toast.error("ERROR debe seleccionar la cantidad para el Producto.");
            return;
        }

        let esRepetido = this.esProductoRepetido(producto);

        if (esRepetido) {
            toast.error("ERROR el Producto ya se encuentra en la Receta.");
        } else {
            producto.cantidad = cantidad;
            let newSeleccionados = this.state.seleccionados;
            newSeleccionados.push(producto);
            this.setState({ seleccionados: newSeleccionados });
            toast.success("Producto agregado.");
        }

        this.setState({ producto: {} });

        this.setState({ productoAutoFocus: true });


        this.clearInputProducto();

        if (false) {
            // TO DO AGREGAR FOCUS EN EL INPUT DE PRODUCTO

            let inputProducto = document.getElementById("input-producto");


            //inputRefProducto.focus();

        }

    }

    changeCantidad(e) {

        this.setState({ cantidad: e.target.value });
    }

    handleDateChange(date) {

        this.setState({ selectedDate: date });
    }

    changeRecetaCompleta(event) {

        this.setState({ recetaCompleta: event.target.value });

        if (event.target.value === 'SI') {
            this.setState({
                camposVacios: {
                    fecha: true,
                    nombre: true,
                    sello: true,
                    firma: true,
                    todos: true,
                }
            });

        }

    }

    //----------------------------------------------evento de numeracion

    changeNumeracionReceta(event) {
        this.setState({ numeracionReceta: event.target.value });
    }

    //-----------------------------------------------radio de medicos reportes

    changeRecetaDuplicada(event) {

        this.setState({ recetaDuplicada: event.target.value });

    }

    changeRecetaEscrito(event) {

        this.setState({ recetaEscrito: event.target.value });

    }

    changeRecetaSobreEscrita(event) {
        this.setState({ recetaSobreEscrita: event.target.value });
    }

    changeRecetaCaligrafia(event) {

        this.setState({ recetaCaligrafia: event.target.value });

    }

    changeCamposVacios(event) {

        if (event.target.name === 'todos') {
            this.setState({
                camposVacios: {
                    fecha: !event.target.checked,
                    nombre: !event.target.checked,
                    sello: !event.target.checked,
                    firma: !event.target.checked,
                    todos: !event.target.checked
                }
            });
        } else {
            this.setState({ camposVacios: { ...this.state.camposVacios, [event.target.name]: !event.target.checked, todos: true } });
        }

    }

    esProductoRepetido(producto) {

        let esRepetido = false;

        this.state.seleccionados.filter(element => {

            if (element.codigo === producto.codigo) {
                esRepetido = true;
            }

        });

        return esRepetido;
    }


    tablaProductos(seleccionados) {

        let inputValue = this.state.producto ? this.state.producto.descripcion : '';

        const filterOptions = createFilterOptions({
            matchFrom: 'any',
            stringify: option => option.descripcion,
            stringify: option => option.descripcion
        });

        const filterOptions2 = (options, { inputValue }) => {
            return matchSorter(options, inputValue, { keys: ['descripcion'] });
        };

        return (<TableContainer style={{ marginTop: 25, marginBottom: 100 }} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nro</TableCell>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="center">Producto</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell align="center">{'-'}</TableCell>
                        <TableCell align="center" >
                            <TextField id="outlined-basic" variant="outlined" value={this.state.cantidad} onChange={this.changeCantidad} />
                        </TableCell>
                        <TableCell align="center">
                            <Autocomplete
                                //open={true}
                                onChange={(option, value) => {
                                    //this.setState({ inputValue: "" });
                                    this.seleccionarProducto(value);
                                    this.agregarProducto(value);
                                    this.setState({ cantidad: 1 });
                                    //window.location.hash = '#tabla-productos';

                                }}
                                filterOptions={(options, { inputValue }) => {
                                    return matchSorter(options, inputValue, { keys: ['descripcion'] });
                                }}
                                //onInputChange={this.changeProducto}
                                getOptionSelected={(option, value) => option.codigo === value.codigo}
                                options={this.props.receta ? this.props.receta.productos : []}
                                //options={ this.state.options ? this.state.options : [{}]}
                                getOptionLabel={(option) => option.descripcion}
                                style={{ width: '100%', marginTop: 10 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id='input-producto'
                                        key="input-producto"
                                        label="Buscar por Nombre"
                                        style={{ width: '100%' }}
                                        value={this.state.inputValue}
                                        variant="outlined"
                                        inputRef={input => {
                                            this.inputRefProducto = input;
                                        }}
                                        onChange={event => {
                                            const { value } = event.target;

                                            this.setState({ inputValue: value });

                                            //obtenerProductos(value, setOpen, setLoading, setOptions);
                                            this.changeProducto(event);

                                        }}


                                    />)
                                }
                                inputValue={this.state.inputValue}
                            />
                        </TableCell>
                        <TableCell align="center">{'-'}</TableCell>
                    </TableRow>
                    {
                        seleccionados.slice(0).reverse().map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.cantidad ? row.cantidad : '-'}</TableCell>
                                    <TableCell align="center">{row.descripcion ? row.descripcion.trim() : '-'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="more"
                                            onClick={() => this.eliminarProducto(row.codigo)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>);
                        })}
                </TableBody>
            </Table>
        </TableContainer>);
    };


    render() {

        const {
            history,
            match: { params: { idReceta } }, receta
        } = this.props;

        const eventKeyPress = document.addEventListener('keypress', (event) => {

            const keyName = event.key;
            let e = {};
            e.target = {};
            //if (event.shiftKey && this.state.actionKey) {
            if (event.shiftKey && this.actionKey) {
                if (this.inputRefProducto) {
                    this.inputRefProducto.blur();
                }

                if (keyName === 'A') {
                    //this.agregarProducto();
                } else if (keyName === 'G') {

                    this.guardarReceta(this.state.medico, this.state.recetaCompleta, this.state.camposVacios, this.state.tam, this.state.seleccionados, this.state.selectedDate, this.state.recetaDuplicada, this.state.recetaEscrito, this.state.recetaCaligrafia, this.state.numeracionReceta)
                    //this.setState({ inputValue: "" });
                    //this.clearInputProducto();
                    //this.inputRefProducto.blur();
                } else if (keyName === 'S') {
                    //this._clearInputProducto = true;
                    e.target.value = 'SI';
                    this.changeRecetaCompleta(e);
                } else if (keyName === 'N') {
                    //this._clearInputProducto = true;
                    e.target.value = 'NO';
                    this.changeRecetaCompleta(e);
                } else if (keyName === 'P') {
                    this.setState({ recetaCompleta: 'NO' });
                    e.target.name = 'fecha';
                    e.target.checked = this.state.camposVacios.fecha;
                    this.changeCamposVacios(e);
                } else if (keyName === 'F') {
                    this.setState({ recetaCompleta: 'NO' });
                    e.target.name = 'firma';
                    e.target.checked = this.state.camposVacios.firma;
                    this.changeCamposVacios(e);
                } else if (keyName === 'O') {
                    this.setState({ recetaCompleta: 'NO' });
                    e.target.name = 'nombre';
                    e.target.checked = this.state.camposVacios.nombre;
                    this.changeCamposVacios(e);
                } else if (keyName === 'E') {
                    this.setState({ recetaCompleta: 'NO' });
                    e.target.name = 'sello';
                    e.target.checked = this.state.camposVacios.sello;
                    this.changeCamposVacios(e);
                } else if (keyName === 'T') {
                    this.setState({ recetaCompleta: 'NO' });
                    e.target.name = 'todos';
                    e.target.checked = this.state.camposVacios.todos;
                    this.changeCamposVacios(e);
                } else if (keyName === 'D') {
                    this.setState({ recetaEscrito: 'SI' });
                    e.target.value = 'NO';
                    this.changeRecetaEscrito(e);
                } else if (keyName === 'I') {
                    this.setState({ recetaEscrito: 'NO' });
                    e.target.value = 'SI';
                    this.changeRecetaEscrito(e);
                } else if (keyName === 'C') {
                    this.setState({ recetaDuplicada: 'NO' });
                    e.target.value = 'SI';
                    this.changeRecetaDuplicada(e);
                } else if (keyName === 'U') {
                    this.setState({ recetaDuplicada: 'SI' });
                    e.target.value = 'NO';
                    this.changeRecetaDuplicada(e);
                } else if (keyName === 'R') {
                    this.setState({ recetaCaligrafia: 'NO' });
                    e.target.value = 'SI';
                    this.changeRecetaCaligrafia(e);
                } else if (keyName === 'L') {
                    this.setState({ recetaCaligrafia: 'SI' });
                    e.target.value = 'NO';
                    this.changeRecetaCaligrafia(e);
                } else if (keyName === 'M') {
                    //this.setState({ recetaCaligrafia: 'SI' });
                    //e.target.value = 'NO';
                    this.changeExpandirDetalles(e);
                } else if (keyName === 'R') {

                    this.inputRefProducto.focus();
                    //this.document.getElementById("input-producto").reset();
                    //this.setState({ inputValue: '' });
                }
                //this._clearInputProducto = true;
                //this.setState({ actionKey: false });
                this.actionKey = false;
                //} else if (event.ctrlKey && this.state.actionKeyControl) {
            } else if (event.ctrlKey && this.actionKeyControl) {

                //if (keyName === '') { // control + a
                //    this.guardarReceta(this.state.medico, this.state.recetaCompleta, this.state.camposVacios, this.state.tam, this.state.seleccionados, this.state.selectedDate);
                if (keyName === '') { // control + q
                    if (this.inputRefProducto) {
                        this.inputRefProducto.focus();
                    }
                } else if (keyName === '') { // control + b
                    //this.guardarReceta(this.state.medico, this.state.recetaCompleta, this.state.camposVacios, this.state.tam, this.state.seleccionados, this.state.selectedDate, this.state.recetaDuplicada, this.state.recetaEscrito, this.state.recetaCaligrafia, this.state.numeracionReceta);
                }


                //this.setState({ actionKeyControl: false });
                this.actionKeyControl = false;
            }
            //this.inputRefProducto.focus();
            event.stopPropagation();
        }, false);

        const eventKeyDown = document.addEventListener('keydown', (event) => {
            //action =true;

            const keyName = event.key;

            //this.clearInputProducto();
            //if (event.shiftKey && !this.state.actionKey) {
            if (event.shiftKey && !this.actionKey) {
                //this.setState({ actionKey: true });
                if (this.inputRefProducto) {
                    console.log("info...");
                    this.actionKey = true;
                    this.inputRefProducto.focus();
                }

                //this.setState({ inputValue: "" });
                //this.clearInputProducto();


                //} else if (event.ctrlKey && !this.state.actionKeyControl){
            } else if (event.ctrlKey && !this.actionKeyControl) {
                //this.setState({ actionKeyControl: true });
                this.actionKeyControl = true;
            }
            event.stopPropagation();
        }, false);

        const seleccionados = this.state.seleccionados;

        const { fecha, nombre, sello, firma, todos } = this.state.camposVacios;

        const medico = Object.entries(this.state.medico ? this.state.medico : {}).length !== 0 ? this.state.medico : {}.nombreMedico = "";

        let tam = Object.entries(this.state.tam ? this.state.tam : {}).length !== 0 ? this.state.tam : {}.tam = "";


        let inputRefProducto;

        if (receta.mostrarToast) {

            let mensaje = receta.toast.mensaje;

            if (receta.toast.error) {
                toast.error(mensaje)
            } else {
                toast.success(mensaje);
            }

            this.props.mostrarToast(false);
        }


        //const filterOptions2 = (options, { inputValue }) => matchSorter(options, inputValue);

        return (

            <>
                <div>
                    {eventKeyPress}
                    {eventKeyDown}

                    <div >
                        <Toaster position="bottom-right" />
                    </div>

                    <FusePageSimple
                        content={
                            <div className="p-24" style={{ margin: 25, flexGrow: 1, backgroundColor: '#ffffff' }}>

                                <Grid container spacing={12} justify="space-around" alignItems="stretch">

                                    <Grid item xs={5}>
                                        <div style={{ marginTop: 10 }}>
                                            <label style={{ marginBottom: 0 }}><b>TAM:</b></label>
                                            <Autocomplete
                                                id="combo-box-demo"
                                                value={tam}
                                                onChange={(option, value) => this.seleccionarTam(value)}
                                                onInputChange={this.changeTam}
                                                getOptionSelected={(option, value) => option.tam === value.tam}
                                                options={receta ? receta.tams : []}
                                                getOptionLabel={(option) => option.tam}
                                                style={{ width: '50%', marginTop: 10 }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        style={{ width: '80%' }}
                                                        label="aaaamm"
                                                        variant="outlined"
                                                        inputRef={input => {
                                                            this.inputRefTam = input;
                                                        }}
                                                    />}
                                            />
                                        </div>
                                    </Grid>


                                    <Grid item xs={3}>
                                        <div style={{ marginTop: 10 }}>
                                            <label style={{ marginBottom: 0 }}><b>Médico:</b></label>
                                            <Autocomplete
                                                id="combo-box-demo"
                                                focus={true}
                                                value={medico}
                                                selectOnFocus={true}
                                                onChange={(option, value) => this.seleccionarMedico(value)}
                                                onInputChange={this.changeMedico}
                                                getOptionSelected={(option, value) => option.matricula === value.matricula}
                                                options={receta ? receta.medicos : []}
                                                getOptionLabel={(option) => option.nombreMedico ? option.nombreMedico + ` (${option.matricula})` : ''}
                                                style={{ width: '100%', marginTop: 10 }}

                                                renderInput={(params) => <TextField
                                                    {...params}
                                                    inputRef={(input) => {
                                                        this.inputRefMedico = input;
                                                    }}
                                                    style={{ width: '100%' }} label="Buscar por Nombre o Matricula" variant="outlined" />}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} >
                                        <div style={{ marginTop: 10, textAlign: 'right' }}>
                                            <Button
                                                tabindex="-1"
                                                type="submit"
                                                className="whitespace-no-wrap normal-case"
                                                variant="contained"
                                                color="secondary"
                                                //disabled={props.isSubmiting}
                                                onClick={() => this.guardarReceta(this.state.medico, this.state.recetaCompleta, this.state.camposVacios, this.state.tam, this.state.seleccionados, this.state.selectedDate, this.state.recetaDuplicada, this.state.recetaEscrito, this.state.recetaCaligrafia, this.state.numeracionReceta)}>
                                                {'GUARDAR'}
                                            </Button>

                                            {!this.state.formCrear &&
                                                <Button
                                                    style={{ marginLeft: 20 }}
                                                    onClick={() => this.desactivarReceta(idReceta, history)}
                                                    variant="contained">
                                                    ELIMINAR
                                                </Button>}
                                        </div>
                                    </Grid>

                                    <Grid tabindex="-1" item xs={2}>
                                        <div style={{ marginTop: 15 }}>
                                            <label style={{ marginBottom: 0 }}><b>La Receta está completa?</b></label>

                                            <div tabindex="-1" style={{ marginTop: 10 }}>
                                                <RadioGroup tabindex="-1" row aria-label="gender" name="gender1" value={this.state.recetaCompleta} onChange={this.changeRecetaCompleta}>
                                                    <FormControlLabel tabindex="-1" value='SI' control={<Radio tabindex="-1" />} label={<Typography><u>S</u>I</Typography>} />
                                                    <FormControlLabel tabindex="-1" value='NO' control={<Radio tabindex="-1" />} label={<Typography><u>N</u>O</Typography>} />
                                                </RadioGroup>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid item xs={3}>
                                        {this.state.recetaCompleta !== 'SI' &&
                                            <div style={{ marginTop: 15 }}>
                                                <label style={{ marginBottom: 0 }}><b>Campos vacios</b></label>
                                                <FormControl component="fieldset">
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            label={<Typography>N<u>o</u>mbre</Typography>}
                                                            control={<Checkbox checked={!nombre} onChange={this.changeCamposVacios} name="nombre" />}
                                                        />
                                                        <FormControlLabel
                                                            label={<Typography>Fecha <u>P</u>rescripción</Typography>}
                                                            control={<Checkbox checked={!fecha} onChange={this.changeCamposVacios} name="fecha" />}
                                                        />
                                                        <FormControlLabel
                                                            label={<Typography>S<u>e</u>llo</Typography>}
                                                            control={<Checkbox checked={!sello} onChange={this.changeCamposVacios} name="sello" />}
                                                        />
                                                        <FormControlLabel
                                                            label={<Typography><u>F</u>irma</Typography>}
                                                            control={<Checkbox checked={!firma} onChange={this.changeCamposVacios} name="firma" />}
                                                        />
                                                        <FormControlLabel
                                                            label={<Typography><u>T</u>odos</Typography>}
                                                            control={<Checkbox checked={!todos} onChange={this.changeCamposVacios} name="todos" />}
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </div>
                                        }
                                    </Grid>

                                    <Grid item xs={7}>
                                        <div style={{ marginTop: 15 }}>
                                            <label style={{ marginBottom: 0 }}><b>Fecha Prescripción:</b></label>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container >
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="normal"
                                                        id="date-picker-inline"
                                                        label="dd/MM/yyyy"
                                                        //keyboardIcon={false}
                                                        KeyboardButtonProps={{ disabled: true, style: { display: 'none' } }}
                                                        value={this.state.selectedDate}
                                                        onChange={this.handleDateChange}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>

                                        </div>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div style={{ marginTop: 15 }}>
                                            <label style={{ marginBottom: 0 }}><b>Numeración:</b></label><br></br>
                                            <div style={{ marginTop: 4 }}></div>
                                            <TextField id="outlined-basic"
                                                label="Numeración"
                                                variant="outlined"
                                                value={this.state.numeracionReceta}
                                                onChange={this.changeNumeracionReceta}
                                                type='number'
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div style={{ marginTop: 15, marginLeft: 500 }}>
                                            <Tooltip title="shift + m" aria-label="shift + m">
                                                <Button
                                                    tabindex="-1"
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={this.changeExpandirDetalles}
                                                >
                                                    {this.state.labelTitulo}
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Grid>



                                    {this.state.expandir &&
                                        <>
                                            <Grid tabindex="-1" item xs={5}>
                                                <div style={{ marginTop: 15 }}>
                                                    <label style={{ marginBottom: 0 }}><b>La Re<u>c</u>eta está d<u>u</u>plicada?</b></label>

                                                    <div tabindex="-1" style={{ marginTop: 10 }}>
                                                        <RadioGroup tabindex="-1" row aria-label="gender" name="gender2" value={this.state.recetaDuplicada} onChange={this.changeRecetaDuplicada}>
                                                            <FormControlLabel tabindex="-1" value='SI' control={<Radio tabindex="-1" />} label={<Typography>SI</Typography>} />
                                                            <FormControlLabel tabindex="-1" value='NO' control={<Radio tabindex="-1" />} label={<Typography>NO</Typography>} />
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </Grid>




                                            <Grid tabindex="-1" item xs={7}>
                                                <div style={{ marginTop: 15 }}>
                                                    <label style={{ marginBottom: 0 }}><b>Formato de receta</b></label>

                                                    <div tabindex="-1" style={{ marginTop: 2 }}>
                                                        <RadioGroup tabindex="-1" row aria-label="gender" name="gender1" value={this.state.recetaEscrito} onChange={this.changeRecetaEscrito}>
                                                            <FormControlLabel tabindex="-1" value='SI' control={<Radio tabindex="-1" />} label={<Typography>OR<u>Í</u>GINAL</Typography>} />
                                                            <FormControlLabel tabindex="-1" value='NO' control={<Radio tabindex="-1" />} label={<Typography><u>D</u>IGITAL</Typography>} />
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid tabindex="-1" item xs={5}>
                                                <div style={{ marginTop: 15 }}>
                                                    <label style={{ marginBottom: 0 }}><b>Calig<u>r</u>afía simi<u>l</u>ar?</b></label>

                                                    <div tabindex="-1" style={{ marginTop: 10 }}>
                                                        <RadioGroup tabindex="-1" row aria-label="gender" name="gender1" value={this.state.recetaCaligrafia} onChange={this.changeRecetaCaligrafia}>
                                                            <FormControlLabel tabindex="-1" value='SI' control={<Radio tabindex="-1" />} label={<Typography>SI</Typography>} />
                                                            <FormControlLabel tabindex="-1" value='NO' control={<Radio tabindex="-1" />} label={<Typography>NO</Typography>} />
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid tabindex="-1" item xs={7}>
                                                <div style={{ marginTop: 15 }}>
                                                    <label style={{ marginBottom: 0 }}><b>SobreEscrito a Boligrafo</b></label>

                                                    <div tabindex="-1" style={{ marginTop: 2 }}>
                                                        <RadioGroup tabindex="-1" row aria-label="gender" name="gender1" value={this.state.recetaSobreEscrita} onChange={this.changeRecetaSobreEscrita}>
                                                            <FormControlLabel tabindex="-1" value='SI' control={<Radio tabindex="-1" />} label={<Typography>SI</Typography>} />
                                                            <FormControlLabel tabindex="-1" value='NO' control={<Radio tabindex="-1" />} label={<Typography>NO</Typography>} />
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </Grid>

                                        </>
                                    }

                                    {false &&

                                        <Grid item xs={6}>
                                            <div style={{ marginTop: 10, display: 'inline-block' }}>
                                                <label style={{ marginTop: 16 }}><b>Cantidad:</b></label>
                                                <br></br>
                                                <TextField required id="standard-required" value={this.state.cantidad} onChange={this.changeCantidad} />
                                            </div>
                                        </Grid>
                                    }

                                    {false &&
                                        <Grid item xs={6}>
                                            <div style={{ marginTop: 10 }}>
                                                <label style={{ marginBottom: 20, marginTop: 100 }}><b>Producto:</b></label>

                                            </div>
                                        </Grid>
                                    }



                                </Grid>
                                <div id="tabla-productos">
                                    {true && this.tablaProductos(seleccionados)}
                                </div>
                            </div>
                        }
                    />
                </div>
            </>
        )
    }
};


function mapStateToProps({ receta }) {
    return { receta };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setMensaje: Actions.setMensaje,
            getMedicos: Actions.getMedicos,
            getProductos: Actions.getProductos,
            getTams: Actions.getTams,
            getReceta: Actions.getReceta,
            formSubmit: Actions.formSubmit,
            editarReceta: Actions.editarReceta,
            mostrarToast: Actions.setMostrarToast,
            desactivarReceta: Actions.desactivarReceta
        },
        dispatch
    );
}

export default reduxForm({
    form: 'formReceta'
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Receta)));
