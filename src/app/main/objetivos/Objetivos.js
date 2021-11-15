import { FusePageSimple } from '@fuse';
import React from 'react';
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
import {
  URL_BASE,
  languageConfig,
  construirParametrosDePaginacion
} from '../UIUtils';

import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../objetivos/store/actions';

function Objetivos(props) {
  const tableRef = React.createRef();
  const { history, objetivos: { list }, setSearchValue, listChangePage } = props;
  return (
    < FusePageSimple
      content={
        < div
          className="p-24" >
          < MaterialTable
            title="Lista de Objetivos"
            tableRef={tableRef}
            columns={
              [
                {
                  title: 'Matrícula',
                  field: 'matricula'
                },
                {
                  title: 'Médico',
                  field: 'nombre'
                },
                {
                  title: 'Código Médico Región',
                  field: 'codigoMedicoRegion'
                },
                {
                  title: 'Objetivo',
                  field: 'objetivo'
                },
                {
                  title: 'Año',
                  field: 'anho'
                }
              ]
            }
            data={query => new Promise((resolve) => {
              let url = `${URL_BASE}/objetivos-apm`;
              url = construirParametrosDePaginacion(query, url);
              fetch(url)
                .then(response => response.json())
                .then(result => {
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
            }
            actions={
              [
                {
                  icon: 'refresh',
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () => tableRef.current && tableRef.current.onQueryChange()
                }
              ]
            }
            onRowClick={(event, rowData) =>
              history.push(`/objetivos-apm/medico-region/${rowData.codigoMedicoRegion}`)
            }
            components={
              {
                Container: props =>
                  <
                    Paper
                    {...
                    props
                    }
                    elevation={0}
                  />,
                Action: () => (

                  < Button
                    variant="contained"
                    onClick={() =>
                      history.push('/objetivos-apm/medico-region/crear')
                    }
                    color="primary"
                    style={
                      {
                        textTransform: 'none',
                        marginLeft
                          :
                          16,
                        marginRight
                          :
                          8
                      }
                    }
                    size="small"
                    startIcon={< AddIcon />
                    }>
                    Agregar
                    Objetivo
                    < /Button>
  )
  }
}
  options = {
                      {
                        pageSize: list.pageSize,
                        pageSizeOptions
                          :
                          list.pageSizeOptions,
                        initialPage
                          :
                          list.page,
                        searchText
                          :
                          list.searchText
                        //...TABLE_DATA_CONFIG.defaultOptions
                      }
                    }
  //localization={TABLE_DATA_CONFIG.languageConfig}
  />
                    < /div>
}
  />
)
  ;
}

function mapStateToProps({objetivos}) {
  return {objetivos};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
                    {
                      listChangePage: Actions.listChangePage,
      listChangeQuantityPerPage: Actions.listChangeQuantityPerPage,
      setSearchValue: Actions.setSearchValue
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Objetivos));
