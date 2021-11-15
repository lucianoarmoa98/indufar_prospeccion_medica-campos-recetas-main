import React from 'react';
import { Button, Icon, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

function EdicionHeader(props) {

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Typography
                        className="normal-case flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/recetas"
                        color="inherit">
                        <Icon className="text-20">arrow_back</Icon>
                        <span className="mx-4">Recetas</span>
                    </Typography>
                </FuseAnimate>
                <div className="flex items-center max-w-full">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <img
                            className="w-32 sm:w-48 rounded"
                            src="assets/images/maquinas/build.png"
                            alt='' />
                    </FuseAnimate>
                    <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="text-16 sm:text-20 truncate">
                                Receta
              </Typography>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="caption">Detalle</Typography>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div>
                    <Button
                        type="submit"
                        className="whitespace-no-wrap normal-case"
                        variant="contained"
                        color="secondary"
                        disabled={props.isSubmiting}
                        onClick={() => props.guardarReceta(props.medico, props.recetaCompleta, props.camposVacios, props.tam, props.seleccionados, props.fechaPrescripcion)}>
                        {props.formCrear ? 'CREAR' : 'GUARDAR'}
                    </Button>


                    {!props.formCrear &&
                        <Button
                            style={{ marginLeft: 20}}
                            onClick={() => props.desactivarReceta(props.idReceta, props.history)}
                            variant="contained">
                            ELIMINAR
                        </Button>}
                </div>
            </FuseAnimate>
        </div>
    );
}

export default EdicionHeader;
