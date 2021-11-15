import React from 'react';
import {Icon, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

function NegociacionHeader(props) {
  return (
    <div
      className="flex flex-1 w-full items-center justify-between"
      style={{
        padding: '0px 32px'
      }}>
      <div className="flex flex-col items-start max-w-full">
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/medicos"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Médicos</span>
          </Typography>
        </FuseAnimate>
        <div className="flex items-center max-w-full">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <img
              className="w-32 sm:w-48 rounded"
              src="assets/images/medicos/medicos.png"
              alt=''/>
          </FuseAnimate>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="text-16 sm:text-20 truncate">
                {props.medico.nombre ? props.medico.nombre : ''}
              </Typography>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="caption">
                {props.medico.matricula ? props.medico.matricula : ''} - {props.medico.especialidad ? props.medico.especialidad : ''}
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NegociacionHeader;
