import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    addProducto,
    addProductoAnteriores,
    changeDiaDeTrabajo,
    changeExclusivoProducto,
    eliminar,
    formEditChangeAporteEconomicoInput,
    formEditChangeComentario,
    formEditChangeInput,
    formEditChangePedidoDeBecaInput,
    formEditChangePedidoDeTermoInput,
    formEditChangePeriodoInput,
    formEditChangeMetodoMedicionInput,
    formEditResetValues,
    formEditSubmit,
    getData,
    removeProducto,
    removeProductoAnteriores,
    resetDatos
} from '../negociaciones/store/actions';
import Footer from '../../../components/Form/Footer';
import { FusePageSimple } from '@fuse';
import { Button, Grid } from '@material-ui/core';
import Productos from './Productos';
import FuseAnimate from '../../../@fuse/components/FuseAnimate/FuseAnimate';
import _ from '@lodash';
import {
    END_POINT_NEGOCIACIONES,
    END_POINT_PRODUCTOS_DE_PROSPECTO
} from '../UIUtils';
import Aprobacion from './Aprobacion';
import Economico from './Economico';
import Beca from './Beca';
import Termo from './Termo';
import MetodoMedicion from './MetodoMedicion';
import Comentarios from './Comentarios';
import Medico from './Medico';
import { green, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import UsuarioContext from '../../UsuarioContext';

class Edicion extends React.Component {

    static contextType = UsuarioContext;
    _isMounted = false;
    mostrarButton = true;

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const { usuario } = this.context;
        const { roles, legajo } = usuario || {};
        this.props.getData(this.props.match.params.id);
        if (roles && (roles.includes("JEFE") || roles.includes("SUPERVISOR") || roles.includes("GERENTE") || roles.includes("DIRECTIVO"))) {
            this.mostrarButton = false;
        }
    }

    componentWillUnmount() {
        this.props.formEditResetValues();
        this.props.resetDatos();
    }

    onSubmit() {
        this.validateFields();
        this.props.formEditSubmit(this.props.history, this.props.match.params.id);
    }

    validateFields() {
        const {
            formEdit
        } = this.props;
        let errors = {};
        _.each(formEdit.values, (value, key) => {
            if (formEdit.requiredValues[key] && _.isEmpty(value)) {
                errors = {
                    ...errors,
                    [key]: 'Campo obligatorio'
                };
            }
        });
    }

    render() {
        const {
            props: {
                error,
                formEdit,
                clearAsyncError,
                handleSubmit,
                formEditChangeInput,
                addProducto,
                removeProducto,
                addProductoAnteriores,
                removeProductoAnteriores,
                changeExclusivoProducto,
                formEditChangeComentario,
                history,
                changeDiaDeTrabajo,
                eliminar,
                formEditChangeAporteEconomicoInput,
                formEditChangePedidoDeBecaInput,
                formEditChangePedidoDeTermoInput,
                formEditChangeMetodoMedicionInput,
                match: {
                    params: {
                        id: idNegociacion
                    }
                }
            },
            onSubmit
        } = this;
        const { isSubmiting, success, error: errorForm, values: { id, itemsNegociacion, itemsAnteriores } } = this.props.formEdit;
        return (
            <FusePageSimple
                content={
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex pl-24 pr-24 pt-12'>
                            <div style={{ minWidth: 600 }}>
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <div>

                                        {(this.mostrarButton) &&

                                            <Button

                                                type="submit"
                                                className="whitespace-no-wrap normal-case"
                                                variant="contained"
                                                size='small'
                                                startIcon={<SaveIcon />}
                                                disableElevation
                                                style={{ backgroundColor: green['500'], color: 'white' }}>
                                                Guardar Cambios
                                            </Button>
                                        }

                                        <Button
                                            className="whitespace-no-wrap normal-case"
                                            variant="contained"
                                            component="span"
                                            size='small'
                                            color="primary"
                                            startIcon={<DownloadIcon />}
                                            onClick={() => {
                                                const url = `${END_POINT_NEGOCIACIONES}/${id}/xls`;
                                                const win = window.open(url, '_blank');
                                                win.focus();
                                            }}
                                            disableElevation
                                            style={{ marginLeft: 16 }}>
                                            Descargar Memo
                                        </Button>
                                        <Button
                                            className="whitespace-no-wrap normal-case"
                                            size='small'
                                            variant="contained"
                                            component="span"
                                            color='secondary'
                                            startIcon={<DownloadIcon />}
                                            disableElevation
                                            style={{ marginLeft: 16 }}
                                            onClick={() => {
                                                const url = `${END_POINT_PRODUCTOS_DE_PROSPECTO}/negociacion/${id}/xls`;
                                                const win = window.open(url, '_blank');
                                                win.focus();
                                            }}>
                                            Descargar Prospección
                                        </Button>
                                    </div>
                                </FuseAnimate>
                            </div>
                            <div style={{ width: '100%', marginLeft: 16, marginRight: 16 }}>
                                <Footer
                                    submitting={isSubmiting}
                                    error={error || errorForm}
                                    success={success} />
                            </div>
                            <div>
                                {(this.mostrarButton) &&
                                    <Button
                                        className="whitespace-no-wrap normal-case"
                                        variant="contained"
                                        component="span"
                                        size='small'
                                        onClick={() => eliminar(idNegociacion, history)}
                                        startIcon={<DeleteIcon />}
                                        disableElevation
                                        style={{
                                            backgroundColor: red['500'],
                                            color: 'white',
                                            marginRight: 8
                                        }}>
                                        Eliminar
                                    </Button>
                                }
                            </div>
                        </div>
                        <div className="pl-24 pr-24 pt-12 pb-12">
                            <Grid container spacing={2} className='column-form'
                                style={{ marginRight: 16, width: '40%' }}>
                                <Grid item xs={12}>
                                    <Aprobacion
                                        formEditChangeInput={formEditChangeInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Comentarios
                                        formEditChangeComentario={formEditChangeComentario}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError}
                                        disabled={!this.mostrarButton} />
                                </Grid>
                                <Grid item xs={12}>
                                    <MetodoMedicion
                                        formEditChangeInput={formEditChangeMetodoMedicionInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Economico
                                        formEditChangeInput={formEditChangeAporteEconomicoInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Beca
                                        formEditChangeInput={formEditChangePedidoDeBecaInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Termo
                                        formEditChangeInput={formEditChangePedidoDeTermoInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} className='column-form'
                                style={{ width: '60%' }}>
                                <Grid item xs={12}>
                                    <Medico
                                        changeDiaDeTrabajo={changeDiaDeTrabajo}
                                        formEditChangeInput={formEditChangeInput}
                                        formEdit={formEdit}
                                        clearAsyncError={clearAsyncError}
                                        history={history} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Productos
                                        titulo='Productos NEGOCIADOS'
                                        items={itemsNegociacion}
                                        addProducto={addProducto}
                                        removeProducto={removeProducto}
                                        changeExclusivoProducto={changeExclusivoProducto}
                                        mostrarTipoDeNegociacion={true}
                                        formEdit={formEdit} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Productos
                                        titulo='Productos Anteriores'
                                        items={itemsAnteriores}
                                        addProducto={addProductoAnteriores}
                                        removeProducto={removeProductoAnteriores}
                                        changeExclusivoProducto={() => {
                                        }}
                                        mostrarTipoDeNegociacion={false}
                                        formEdit={formEdit} />
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                } />
        );
    }
}

const mapStateToProps = (state) => {
    const { formEdit } = state.negociaciones;
    return { formEdit };
};

const NegociacionConnected = connect(
    mapStateToProps,
    {
        getData,
        formEditChangeInput,
        formEditSubmit,
        formEditResetValues,
        resetDatos,
        addProducto,
        removeProducto,
        changeExclusivoProducto,
        formEditChangeComentario,
        changeDiaDeTrabajo,
        eliminar,
        formEditChangeAporteEconomicoInput,
        formEditChangePedidoDeBecaInput,
        formEditChangePedidoDeTermoInput,
        formEditChangeMetodoMedicionInput,
        addProductoAnteriores,
        removeProductoAnteriores
    }
)(withRouter(Edicion));

export default reduxForm({
    form: 'formEditNegociacion'
})(NegociacionConnected);
