// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usuariosActions from 'app/main/usuarios/store/actions';
// Material UI.
import MaterialTable, { MTableToolbar } from 'material-table-hotfix-initial-page-remote-data';
import { Button, Paper } from '@material-ui/core';
// Otros.
import {FusePageSimple} from '@fuse';
import { configuracionDeTabla, END_POINT_USUARIOS } from './UsuariosConfig';
import { languageConfig } from '../UIUtils';
import { withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import UsuarioContext from '../../UsuarioContext';

class Usuarios extends React.Component {

  static contextType = UsuarioContext;
  permisoRol = true;

  esAnalista = false;

  _isMounted = false;

  roles = [];

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    const {
      usuarios: {
        list
      }
    } = props;
    this.state = {
      showActivos: list.showActivos
    };
    this.buildParams = this.buildParams.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const {usuario}  = this.context;
    const {roles, legajo} = usuario || {};
    this.roles = roles;
    //this.permisoRol es false si roles tiene jefe, supervisor, gerente, directivo
    if (roles && (roles.includes("JEFE") || roles.includes("SUPERVISOR") || roles.includes("GERENTE") || roles.includes("DIRECTIVO"))) {
      this.permisoRol = false;

    }
    if (roles.includes("ANALISTA")) {
      this.esAnalista = true;

    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      usuarios: { list },
      listChangePage,
      listChangeQuantityPerPage,
      setSearchValue,
      listToggleActivos,
      history
    } = this.props;
    const {
      showActivos
    } = this.state;
    const { buildParams } = this;
    return (
      <FusePageSimple
        content={
          <div className="p-24">
            <MaterialTable
              tableRef={this.tableRef}
              title={`Lista de ${configuracionDeTabla.titulo}`}
              columns={configuracionDeTabla.columnas}
              data={query => (
                new Promise(resolve => {
                  const params = buildParams(query, showActivos);
                  axios.get(END_POINT_USUARIOS, { params })
                    .then(result => {
                      if (!this._isMounted) {
                        return;
                      }
                      const { data, paginaActual, totalRegistros } = result.data;
                      if (setSearchValue) {
                        setSearchValue(query.search);
                      }
                      resolve({
                        data: data,
                        page: paginaActual - 1,
                        totalCount: totalRegistros
                      });
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
                Container: props => <Paper {...props} elevation={0}/>,
                Action:  () => (
                  <Button
                    disabled={!this.permisoRol || this.esAnalista}
                    onClick={() => history.push('/crear-usuario')}
                    color="primary"
                    variant="contained"
                    style={{
                      textTransform: 'none',
                      marginLeft: 16,
                      marginRight: 8
                    }}
                    size="small">
                    Agregar Usuario
                  </Button>
                ),
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      height: 32,
                      paddingRight: 8
                    }}>
                      <div
                        style={{ alignSelf: 'center', margin: 8 }}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={showActivos}
                                onChange={() => {
                                  this.setState((prevState) => {
                                    return {
                                      showActivos: !prevState.showActivos
                                    };
                                  }, () => this.tableRef.current.onQueryChange());
                                  listToggleActivos();
                                }}/>
                            }
                            label="Activos"/>
                        </FormGroup>
                      </div>
                    </div>
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
                debounceInterval: 1500
              }}
              onRowClick={(event, rowData) =>
                {

                  //this.permisoRol es false si roles tiene jefe, supervisor, gerente, directivo
                  if(!this.permisoRol){

                    return ;
                  }else if((( rowData.roles.includes("T.I.") || rowData.roles.includes("JEFE") || rowData.roles.includes("ANALISTA") ||
                    rowData.roles.includes("SUPERVISOR") || rowData.roles.includes("GERENTE") || rowData.roles.includes("DIRECTIVO") )&& this.esAnalista)){
            
                    return;
                  } else {

                    history.push(`/usuarios/${rowData.uid}`)
                  }
                }
              }/>
          </div>
        }/>
    );
  }

  buildParams(query, showActivos) {
    const params = {
      porPagina: query.pageSize,
      paginaActual: query.page + 1
    };
    if (query.search) {
      params.busqueda = query.search;
    }
    if (query.orderBy) {
      params.orderBy = `${query.orderBy.field};${query.orderDirection}`;
    }
    params.activo = showActivos;
    return params;
  }
}

function mapStateToProps({ usuarios }) {
  return {
    usuarios
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      listChangePage: usuariosActions.listChangePage,
      listChangeQuantityPerPage: usuariosActions.listChangeQuantityPerPage,
      setSearchValue: usuariosActions.setSearchValue,
      listToggleActivos: usuariosActions.listToggleActivos
    },
    dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Usuarios));
