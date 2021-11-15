// React y Redux.
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registrosActions from './store/actions';
// Material UI.
import MaterialTable, {MTableToolbar} from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import {FusePageSimple} from '@fuse';
import {configuracionDeTabla} from './RegistrosConfig';
import {
  construirParametrosDePaginacion,
  END_POINT_REGISTROS,
  languageConfig
} from '../UIUtils';
import {withRouter} from 'react-router-dom';
import {Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BackupIcon from '@material-ui/icons/Backup';

import Footer from '../../../components/Form/Footer';

class Registros extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.tableRef = React.createRef();
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChangeHandler(event) {
    this.props.formEditSubmit(event.target.files[0]);
  }

  render() {
    const {
      registros: {list, formEdit},
      listChangePage,
      listChangeQuantityPerPage,
      setSearchValue
    } = this.props;
    const {isSubmiting, success, error} = formEdit;
    return (
      <FusePageSimple
        content={
          <div className="p-24">
            <MaterialTable
              title={configuracionDeTabla.titulo}
              columns={configuracionDeTabla.columnas}
              tableRef={this.tableRef}
              data={query => (
                new Promise(resolve => {
                  let url = construirParametrosDePaginacion(query, END_POINT_REGISTROS);
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
                    });
                })
              )}
              components={{
                Container: props => <Paper {...props} elevation={0}/>,
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    {/*<div style={{*/}
                    {/*  display: 'flex',*/}
                    {/*  flexDirection: 'row-reverse',*/}
                    {/*  height: 56*/}
                    {/*}}>*/}
                    {/*  <input*/}
                    {/*    id="contained-button-file"*/}
                    {/*    type="file"*/}
                    {/*    multiple*/}
                    {/*    name="file"*/}
                    {/*    onChange={this.onChangeHandler}*/}
                    {/*    style={{display: 'none'}}/>*/}
                    {/*  <label htmlFor="contained-button-file">*/}
                    {/*    <Button*/}
                    {/*      component="span"*/}
                    {/*      size='small'*/}
                    {/*      variant="contained"*/}
                    {/*      disableElevation*/}
                    {/*      style={{*/}
                    {/*        alignSelf: 'center',*/}
                    {/*        marginRight: 16*/}
                    {/*      }}*/}
                    {/*      color='secondary'*/}
                    {/*      startIcon={<BackupIcon />}>*/}
                    {/*      Importar Excel*/}
                    {/*    </Button>*/}
                    {/*  </label>*/}
                    {/*  <div style={{width: 400, marginLeft: 16, marginRight: 16}}>*/}
                    {/*    <Footer*/}
                    {/*      submitting={isSubmiting}*/}
                    {/*      error={error}*/}
                    {/*      success={success}/>*/}
                    {/* </div>*/}
                    {/*</div>*/}
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
              }}/>
          </div>
        }/>
    );
  }
}

function mapStateToProps({registros}) {
  return {registros};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      listChangePage: registrosActions.listChangePage,
      listChangeQuantityPerPage: registrosActions.listChangeQuantityPerPage,
      setSearchValue: registrosActions.setSearchValue,
      changeFilterValue: registrosActions.changeFilterValue,
      formEditSubmit: registrosActions.formEditSubmit
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registros));
