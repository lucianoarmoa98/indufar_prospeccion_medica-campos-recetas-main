// React y Redux.
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as negociacionesActions from './store/actions';
// Material UI.
import MaterialTable, { MTableToolbar } from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import { FusePageSimple } from '@fuse';
import { configuracionDeTabla } from './NegociacionesConfig';
import {
    construirParametrosDePaginacion,
    END_POINT_NEGOCIACIONES,
    languageConfig,
    DESDE,
    HASTA
} from '../UIUtils';
import { withRouter } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import UsuarioContext from '../../UsuarioContext';

import { KeyboardDatePicker } from '@material-ui/pickers';
import negociaciones from './store/reducers';

/*
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';*/


class Negociaciones extends React.Component {

    static contextType = UsuarioContext;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.changeDate = this.changeDate.bind(this);
        this.openFilters = this.openFilters.bind(this);
        this.exportar = this.exportar.bind(this);
        this.agregarFiltros = this.agregarFiltros.bind(this);

        this.state = {
            openFilter: false,
            tituloBotonFiltro: 'MOSTAR',
            valueDesde: undefined,
            valueHasta: undefined
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const { usuario } = this.context;
        const { roles, legajo } = usuario || {};
        const { negociaciones: { list: { filters: { valueEstados, analistas, valueAnalista } } } } = this.props;
        if (roles && roles.includes("ANALISTA") && valueAnalista === '') {
            this.props.setAnalista(legajo);
        }
        this.props.getOpcionesDeAnalistas();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { negociaciones: { list: { filters: { valueEstados, analistas, valueAnalista, valueDesde, valueHasta } } } } = this.props;
        const { negociaciones: { list: { filters: { valueEstados: preVvalueEstados, valueAnalista: prevValueAnalista, valueDesde: prevValueDesde, valueHasta: prevValueHasta } } } } = prevProps;
        if (valueEstados !== preVvalueEstados || valueAnalista !== prevValueAnalista || valueDesde !== prevValueDesde || valueHasta !== prevValueHasta) {
            this.tableRef.current && this.tableRef.current.onQueryChange({ page: 0 });
        }
    }

    changeDate(value, campo) {
        value._d.setHours(0);
        value._d.setMinutes(0);
        value._d.setSeconds(0);
        value._d.setMilliseconds(0);
        let fechaActual = value._d.toISOString();

        if (campo === DESDE) {
            this.props.changeFilterValueDesde(fechaActual);
        } else if (campo === HASTA) {
            this.props.changeFilterValueHasta(fechaActual);
        }

    };

    openFilters() {
        let openFilter;
        let tituloBotonFiltro;
        if (this.state.openFilter) {
            openFilter = false;
            tituloBotonFiltro = 'MOSTRAR'
        } else {
            openFilter = true;
            tituloBotonFiltro = 'OCULTAR'
        }
        this.setState({
            openFilter,
            tituloBotonFiltro
        });
    };

    exportar() {

        const {
            negociaciones: { list },
        } = this.props;

        let url = `${END_POINT_NEGOCIACIONES}/reporte`;

        url = this.agregarFiltros(url, list.filters, list.searchText, list.orderBy, list.orderDirection);
        const win = window.open(url, '_blank');

    };

    agregarDivisorQuery(url) {

        if (url.includes('?')) {
            url += '&';
        } else {
            url += '?';
        }

        return url;

    }

    agregarFiltros(url, filtros, searchText, orderBy, orderDirection) {

        let props = this.props;

        if (searchText !== undefined && !url.includes('busqueda')) {
            url = this.agregarDivisorQuery(url);
            url += `busqueda=${searchText}`;
        }

        if (orderBy && orderDirection) {
            url = this.agregarDivisorQuery(url);
            url += '&ordenadoPor=' + orderBy + ';' + orderDirection;
        }

        if (filtros !== undefined) {


            if (filtros.valueEstados !== 'TODOS') {

                url = this.agregarDivisorQuery(url);

                url += `estado=${filtros.valueEstados}`;
            }
            if (filtros.valueAnalista !== 'TODOS') {
                url = this.agregarDivisorQuery(url);
                url += `legajoAnalista=${filtros.valueAnalista}`;
            }

            if (filtros.valueHasta !== undefined && filtros.valueDesde != undefined) {

                url = this.agregarDivisorQuery(url);
                url += `hasta=${filtros.valueHasta}&desde=${filtros.valueDesde}`;

            }

        }


        return url;

    }

    render() {
        const {
            negociaciones: { list },
            listChangePage,
            listChangeQuantityPerPage,
            setSearchValue,
            changeFilterValue,
            changeFilterValueAnalista,
            history
        } = this.props;

        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <MaterialTable
                            title={`Lista de ${configuracionDeTabla.titulo}`}
                            columns={configuracionDeTabla.columnas}
                            tableRef={this.tableRef}
                            data={query => (
                                new Promise(resolve => {
                                    let url = construirParametrosDePaginacion(query, END_POINT_NEGOCIACIONES);

                                    if(query.orderBy && query.orderDirection){
                                        this.props.negociaciones.list.orderBy = query.orderBy.field;
                                        this.props.negociaciones.list.orderDirection = query.orderDirection;
                                    }

                                    url = this.agregarFiltros(url, list.filters, undefined, undefined, undefined);


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
                            components={{
                                Container: props => <Paper {...props} elevation={0} />,
                                Toolbar: props => (
                                    <div>
                                        <MTableToolbar {...props} />

                                        <Button
                                            onClick={this.openFilters}
                                            component="span"
                                            size='small'
                                            variant="contained"
                                            disableElevation
                                            style={{
                                                alignSelf: 'center',
                                                marginRight: 16,
                                                float: 'right',
                                                marginBottom: 10
                                            }}
                                            color='secondary'
                                        >
                                            {this.state.tituloBotonFiltro + ' FILTROS'}
                                        </Button>

                                        <Button
                                            onClick={this.exportar}
                                            component="span"
                                            size='small'
                                            variant="contained"
                                            disableElevation
                                            style={{
                                                alignSelf: 'center',
                                                marginRight: 16,
                                                marginBottom: 10,
                                                float: 'right'
                                            }}
                                            color='primary'
                                        >
                                            Exportar Excel
                                        </Button>

                                        { this.state.openFilter && <div style={{
                                            marginLeft: 60,
                                            padding: 1

                                        }}>
                                            <InputLabel id='label'>Filtros</InputLabel>
                                            <FormControl >
                                                <div style={{ display: 'inline' }}>
                                                    <label style={{ marginRight: 35 }}> <strong>Estado: </strong></label>
                                                    <Select
                                                        id='select-input'
                                                        labelId='label'
                                                        value={list.filters.valueEstados}
                                                        onChange={e => changeFilterValue(e.target.value)}>
                                                        {
                                                            list.filters.estados.map(e =>
                                                                <MenuItem
                                                                    key={e.value}
                                                                    value={e.value}>
                                                                    {e.label}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </div>
                                            </FormControl>

                                            <br></br>

                                            <FormControl >
                                                <div style={{ display: 'inline' }}>
                                                    <label style={{ marginRight: 30 }}> <strong>Analista:</strong></label>
                                                    <Select
                                                        id='select-input'
                                                        labelId='label'
                                                        value={list.filters.valueAnalista}
                                                        onChange={e => {
                                                            changeFilterValueAnalista(e.target.value)
                                                        }}>
                                                        {
                                                            list.filters.analistas.map(e =>
                                                                <MenuItem
                                                                    key={e.legajo}
                                                                    value={e.legajo}>
                                                                    {e.nombre}
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </div>
                                            </FormControl>

                                            <br></br>
                                            <br></br>

                                            <FormControl>
                                                <div style={{ display: 'inline' }}>
                                                    <label style={{ marginRight: 45 }}> <strong>Desde:</strong></label>

                                                    <KeyboardDatePicker
                                                        id={"fecha"}
                                                        value={list.filters.valueDesde ? list.filters.valueDesde : null}
                                                        format="DD/MM/YYYY"
                                                        onChange={value => this.changeDate(value, DESDE)}
                                                    />


                                                </div>
                                            </FormControl>

                                            <br></br>
                                            <br></br>

                                            <FormControl>
                                                <div style={{ display: 'inline' }}>
                                                    <label style={{ marginRight: 45 }}> <strong>Hasta: </strong></label>

                                                    <KeyboardDatePicker
                                                        id={"fecha"}
                                                        value={list.filters.valueHasta ? list.filters.valueHasta : null}
                                                        format="DD/MM/YYYY"
                                                        onChange={value => this.changeDate(value, HASTA)}
                                                    />

                                                </div>
                                            </FormControl>
                                        </div>}
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    </div>
                                )
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
                                actionsColumnIndex: -1,
                                debounceInterval: 900
                            }}
                            onRowClick={(event, rowData) =>
                                history.push(`/negociaciones/${rowData.id}`)
                            }
                            actions={[
                                {
                                    icon: 'refresh',
                                    tooltip: 'Actualizar',
                                    isFreeAction: true,
                                    onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange()
                                }
                            ]} />
                    </ div>
                } />
        );
    }
}

function mapStateToProps({ negociaciones }) {
    return { negociaciones };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            listChangePage: negociacionesActions.listChangePage,
            listChangeQuantityPerPage: negociacionesActions.listChangeQuantityPerPage,
            setSearchValue: negociacionesActions.setSearchValue,
            changeFilterValue: negociacionesActions.changeFilterValue,
            changeFilterValueAnalista: negociacionesActions.changeFilterValueAnalista,
            changeFilterValueDesde: negociacionesActions.changeFilterValueDesde,
            changeFilterValueHasta: negociacionesActions.changeFilterValueHasta,
            exportarNegociaciones: negociacionesActions.exportarNegociaciones,
            getOpcionesDeAnalistas: negociacionesActions.getOpcionesDeAnalistas,
            setAnalista: negociacionesActions.setAnalista
        },
        dispatch
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Negociaciones));
