import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as negociacionActions from '../medicos/store/actions';
import MaterialTable, {MTableToolbar} from 'material-table-hotfix-initial-page-remote-data';
import {FusePageSimple} from '@fuse';
import {configuracionDeTablaNegociados as configuracionDeTabla} from '../medicos/MedicosConfig';
import {END_POINT_PRODUCTOS_DE_PROSPECTO, languageConfig} from '../UIUtils';
import {withRouter} from 'react-router-dom';
import {Grid, Paper, Typography} from '@material-ui/core';
import DetalleEntryMarket from './DetalleEntryMarket';
import Button from '@material-ui/core/Button';
import {blue, green, grey} from '@material-ui/core/colors';
import FormAgregarProductos from './FormAgregarProductos';
import ShopIcon from '@material-ui/icons/Shop';
import PeriodoDeTam from './PeriodoDeTam';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Submiting from '../../../components/Form/Submiting';
import DetalleEntryEfectividad from './DetalleEntryEfectividad';
import UsuarioContext from '../../UsuarioContext';

const classes = {
  toolbar: 'p-0',
  header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
};

class Prospeccion extends React.Component {

  static contextType = UsuarioContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.tableRef = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.recargarTabla = this.recargarTabla.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const {codigoMedicoRegion} = this.props.match.params;
    this.props.getData(codigoMedicoRegion);
    this.props.getCalculoEntryMarket(codigoMedicoRegion);
    this.props.getTamsDisponibles();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.resetDatosDeMedico();
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {medicos: {negociaciones: {filters: {valueTam}}}} = this.props;
    const {medicos: {negociaciones: {filters: {valueTam: prevalueTam}}}} = prevProps;
    if (valueTam !== prevalueTam) {
      this.tableRef.current && this.tableRef.current.onQueryChange();
    }
  }

  recargarTabla() {
    if (this.tableRef.current) {
      this.tableRef.current.onQueryChange();
      const {codigoMedicoRegion} = this.props.match.params;
      this.props.getData(codigoMedicoRegion);
      this.props.getCalculoEntryMarket(codigoMedicoRegion);
    }
  }

  render() {
    const {usuario}  = this.context;
    const {roles, legajo} = usuario || {};
    const {
      medicos: {formEdit: {values}, entryMarket, negociaciones},
      listChangePage,
      listChangeQuantityPerPage,
      setHistorico,
      changeFilterListTamEfectividad,
      match: {params: {codigoMedicoRegion}},
      history,
      calcularFectividad
    } = this.props;
    const endPoint = `${END_POINT_PRODUCTOS_DE_PROSPECTO}/medicos/${codigoMedicoRegion}/tam/${negociaciones.filters.valueTam}`;
    const titulo = `${values.nombre}`;
    let subtitulo = `Cod. Med/Reg:  ${codigoMedicoRegion} • Matrícula: ${values.matricula} - Esp: ${values.especialidad1}`;
    if (values.especialidad2) {
      subtitulo = subtitulo + ` - Esp (2): ${values.especialidad2}`;
    }
    const disabledLabelColor = '#00000042';
    return (
      <div>
        <FusePageSimple
          classes={classes}
          content={
            <div style={{margin: 16}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Paper className="w-full rounded-8 shadow-none border-1">
                    <div
                      className="flex items-center justify-between px-16 h-64 border-b-1">
                      <Typography className="text-16">
                        Entry Market - <PeriodoDeTam
                        entryMarket={entryMarket}/>
                      </Typography>
                    </div>
                    <DetalleEntryMarket entryMarket={entryMarket}/>
                  </Paper>
                  <br/>
                  <DetalleEntryEfectividad efectividad={negociaciones.efectividad}/>
                </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    !negociaciones.filters.valueTam ?
                      <Submiting
                        text='Obteniendo prospección...'
                        style={{margin: 16}}/> :
                      <MaterialTable
                        title={
                          <div>
                            <Typography className="text-16" noWrap={true}>
                              {titulo}
                            </Typography>
                            <Typography className="text-14">
                              {subtitulo} • <span style={{color: blue['500']}}>Categoría: {values.categoria ? values.categoria : '...'}</span>
                            </Typography>
                          </div>
                        }
                        columns={configuracionDeTabla.columnas}
                        tableRef={this.tableRef}
                        style={{paddingBottom: 8}}
                        data={() => new Promise(resolve => {
                          fetch(endPoint)
                            .then(response => response.json())
                            .then(result => {
                              if (!this._isMounted) {
                                return;
                              }
                              calcularFectividad(result);
                              resolve({
                                data: result,
                                page: 0,
                                totalCount: result.length
                              });
                            });
                        })}
                        onChangePage={listChangePage}
                        onChangeRowsPerPage={listChangeQuantityPerPage}
                        localization={languageConfig}
                        options={{
                          pageSize: negociaciones.pageSize,
                          pageSizeOptions: negociaciones.pageSizeOptions,
                          initialPage: negociaciones.page,
                          searchText: negociaciones.searchText,
                          debounceInterval: 950,
                          search: false,
                          actionsColumnIndex: -1,
                          padding: 'dense',
                          paging: false
                        }}
                        components={{
                          Container: props => <Paper {...props} elevation={0}/>,
                          Toolbar: props => (
                            <div>
                              <MTableToolbar {...props} />
                              <div style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'row-reverse',
                                height: 56
                              }}>
                                {
                                  (roles.includes("ANALISTA") || roles.includes("GERENTE") || roles.includes('JEFE')
                                    || roles.includes('SUPERVISOR') || roles.includes('DIRECTIVO')) &&
                                  <Button
                                    size='small'
                                    color='primary'
                                    component="span"
                                    variant="contained"
                                    endIcon={<ShopIcon/>}
                                    disableElevation
                                    style={{
                                      alignSelf: 'flex-end',
                                      marginRight: 16,
                                      backgroundColor: values.negociacionVigente ? green['600'] : grey['300'],
                                      color: values.negociacionVigente ? 'white' : disabledLabelColor
                                    }}
                                    disabled={!values.negociacionVigente}
                                    onClick={() => history.push(`/medicos/${codigoMedicoRegion}/negociaciones-de-medico`)}>
                                    Negociaciones
                                  </Button>
                                }
                                {/*<Button*/}
                                {/*  size='small'*/}
                                {/*  variant="contained"*/}
                                {/*  component="span"*/}
                                {/*  startIcon={<AddIcon/>}*/}
                                {/*  disableElevation*/}
                                {/*  style={{*/}
                                {/*    alignSelf: 'flex-end',*/}
                                {/*    marginRight: 16,*/}
                                {/*    backgroundColor: pink['500'],*/}
                                {/*    color: 'white'*/}
                                {/*  }}*/}
                                {/*  onClick={this.handleOpen}>*/}
                                {/*  Agregar producto*/}
                                {/*</Button>*/}
                                <div style={{
                                  alignSelf: 'flex-end',
                                  marginRight: 16
                                }}>
                                  <FormControl
                                    style={{marginLeft: 24, width: 150}}>
                                    <InputLabel id='label'>TAM a
                                      comparar</InputLabel>
                                    <Select
                                      id='select-input'
                                      labelId='label'
                                      value={negociaciones.filters.valueTam}
                                      onChange={e => changeFilterListTamEfectividad(e.target.value)}>
                                      {
                                        negociaciones.filters.tams.map(e =>
                                          <MenuItem
                                            key={e.value}
                                            value={e.value}>
                                            {e.label}
                                          </MenuItem>
                                        )
                                      }
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                          )
                        }}
                        actions={[
                          {
                            icon: 'refresh',
                            tooltip: 'Actualizar',
                            isFreeAction: true,
                            onClick: () => this.recargarTabla()
                          }
                        ]}
                      />
                  }
                </Grid>
              </Grid>
              <FormAgregarProductos
                open={this.state.open}
                handleClose={this.handleClose}
                recargarTabla={this.recargarTabla}/>
            </div>
          }/>
      </div>
    );
  }
}

function mapStateToProps({medicos}) {
  return {
    medicos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      listChangePage: negociacionActions.negociacionesListChangePage,
      listChangeQuantityPerPage: negociacionActions.negociacionesListChangeQuantityPerPage,
      setSearchValue: negociacionActions.negociacionesSetSearchValue,
      getData: negociacionActions.getData,
      resetDatosDeMedico: negociacionActions.resetDatosDeMedico,
      setHistorico: negociacionActions.setHistorico,
      getCalculoEntryMarket: negociacionActions.getCalculoEntryMarket,
      changeFilterValue: negociacionActions.changeFilterValue,
      changeFilterListTamEfectividad: negociacionActions.changeFilterListTamEfectividad,
      getTamsDisponibles: negociacionActions.getTamsDisponibles,
      calcularFectividad: negociacionActions.calcularFectividad
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Prospeccion));
