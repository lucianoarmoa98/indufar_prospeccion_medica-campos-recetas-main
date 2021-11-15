// React y Redux.
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recetasActions from './store/actions';
// Material UI.
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
// Otros.
import { FusePageSimple } from '@fuse';
import { configuracionDeTabla, END_POINT_RECETAS } from './RecetasConfig';
import { construirParametrosDePaginacion, languageConfig } from '../UIUtils';
import { Paper, Button } from '@material-ui/core';

class Recetas extends React.Component {

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { recetas: { list }, listChangePage, listChangeQuantityPerPage, setSearchValue, history } = this.props;
        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <MaterialTable
                            title={`Lista de ${configuracionDeTabla.titulo}`}
                            columns={configuracionDeTabla.columnas}
                            data={query => (
                                new Promise(resolve => {
                                    let url = construirParametrosDePaginacion(query, END_POINT_RECETAS);
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
                                    tooltip: 'Agregar Creacion',
                                    isFreeAction: true,
                                    onClick: () => {
                                    }
                                }
                            ]}
                            components={{
                                Container: props => <Paper {...props} elevation={0} />,
                                Action: () => (
                                    <Button
                                        onClick={() => history.push('recetas/crear')}
                                        color="primary"
                                        variant="contained"
                                        style={{
                                            textTransform: 'none',
                                            marginLeft: 16,
                                            marginRight: 8
                                        }}
                                        size="small">
                                        Agregar Receta
                                    </Button>
                                ),
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
                                debounceInterval: 900
                            }}
                            onRowClick={(event, rowData) => history.push(`/recetas/${rowData.id}`)} />
                    </div>
                } />
        );
    }
}

function mapStateToProps({ recetas }) {
    return {
        recetas
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            listChangePage: recetasActions.listChangePage,
            listChangeQuantityPerPage: recetasActions.listChangeQuantityPerPage,
            setSearchValue: recetasActions.setSearchValue
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Recetas);
