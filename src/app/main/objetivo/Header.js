import React from 'react';
import {Button, Icon, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

function EdicionHeader(props) {
  return (
    < div
  className = "flex flex-1 w-full items-center justify-between" >
    < div
  className = "flex flex-col items-start max-w-full" >
    < FuseAnimate
  animation = "transition.slideRightIn"
  delay = {300} >
    < Typography
  className = "normal-case flex items-center sm:mb-12"
  component = {Link}
  role = "button"
  to = "/objetivos"
  color = "inherit" >
    < Icon
  className = "text-20" > arrow_back < /Icon>
    < span
  className = "mx-4" > Objetivos < /span>
    < /Typography>
    < /FuseAnimate>
    < div
  className = "flex items-center max-w-full" >
    < FuseAnimate
  animation = "transition.expandIn"
  delay = {300} >
    < img
  className = "w-32 sm:w-48 rounded"
  src = "assets/images/objetivos/build.png"
  alt = '' / >
    < /FuseAnimate>
    < div
  className = "flex flex-col min-w-0 mx-8 sm:mc-16" >
    < FuseAnimate
  animation = "transition.slideLeftIn"
  delay = {300} >
    < Typography
  className = "text-16 sm:text-20 truncate" >
    Objetivo
    < /Typography>
    < /FuseAnimate>
    < FuseAnimate
  animation = "transition.slideLeftIn"
  delay = {300} >
    < Typography
  variant = "caption" > Detalle < /Typography>
    < /FuseAnimate>
    < /div>
    < /div>
    < /div>
    < FuseAnimate
  animation = "transition.slideRightIn"
  delay = {300} >
    < Button
  type = "submit"
  className = "whitespace-no-wrap normal-case"
  variant = "contained"
  color = "secondary"
  disabled = {props.isSubmiting} >
    Guardar
    < /Button>
    < /FuseAnimate>
    < /div>
)
  ;
}

export default EdicionHeader;
