// React y Redux.
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as medicosActions from './store/actions';
// Material UI.
import MaterialTable, {MTableToolbar} from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import {FusePageSimple} from '@fuse';
import {configuracionDeTabla} from './MedicosConfig';
import {
  END_POINT_MEDICOS,
  languageConfig,
  construirParametrosDePaginacion
} from '../UIUtils';
import {withRouter} from 'react-router-dom';
import {Paper} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import UsuarioContext from '../../UsuarioContext';

class Medicos extends React.Component {

  static contextType = UsuarioContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
    const {usuario}  = this.context;
    const {roles, legajo} = usuario || {};
    if (roles && roles.includes("VISITADOR")) {
      this.props.setVisitador(legajo);
    } else {
      this.props.setVisitador('');
    }
    this.props.negociacionesResetListParameters();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {medicos: {list: {filters: {valueCategorias}}}} = this.props;
    const {medicos: {list: {filters: {valueCategorias: prevValueCategorias}}}} = prevProps;
    if (valueCategorias !== prevValueCategorias) {
      this.tableRef.current && this.tableRef.current.onQueryChange();
    }
  }

  render() {
    const {
      medicos: {list},
      listChangePage,
      listChangeQuantityPerPage,
      setSearchValue,
      history,
      changeFilterValue
    } = this.props;
    return (
      <FusePageSimple
        content={
          <div className="p-24">
            <MaterialTable
              title={`Lista de ${configuracionDeTabla.titulo}`}
              columns={configuracionDeTabla.columnas}
              tableRef={this.tableRef}
              data={query => new Promise(resolve => {
                let url = construirParametrosDePaginacion(query, END_POINT_MEDICOS);
                if (list.filters.valueCategorias) {
                  url += `&categoria=${list.filters.valueCategorias}`;
                }
                if (list.filters.legajoVisitador) {
                  url += `&legajoVisitador=${list.filters.legajoVisitador}`
                }
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
              })}
              components={{
                Container: props => <Paper {...props} elevation={0}/>,
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{
                      display: 'flex',
                      height: 56,
                      marginLeft: 24
                    }}>
                      <FormControl>
                        <InputLabel id='label'>Categoría</InputLabel>
                        <Select
                          id='select-input'
                          labelId='label'
                          value={list.filters.valueCategorias}
                          onChange={e => changeFilterValue(e.target.value)}>
                          {
                            list.filters.categorias.map(e =>
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
                debounceInterval: 1000
              }}
              onRowClick={(event, rowData) =>
                history.push(`/medicos/${rowData.codigoMedicoRegion}`)
              }/>
          </div>
        }/>
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
      listChangePage: medicosActions.listChangePage,
      listChangeQuantityPerPage: medicosActions.listChangeQuantityPerPage,
      setSearchValue: medicosActions.setSearchValue,
      negociacionesResetListParameters: medicosActions.negociacionesResetListParameters,
      changeFilterValue: medicosActions.changeFilterListValue,
      setVisitador: medicosActions.setVisitador,
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Medicos));
