import {List, ListItem, ListItemText} from '@material-ui/core';
import {amber, yellow} from '@material-ui/core/colors';
import * as PropTypes from 'prop-types';
import React from 'react';

const DetalleEntryMarket = (props) => {
  const {
    objetivo,
    maximoPotencial,
    maximoPotencialPorcentaje,
    corp,
    corpPorcentaje,
    negociado,
    negociadoPorcentaje,
    brechaMaximoPotencial,
    brechaMaximoPotencialPorcentaje
  } = props.entryMarket;
  const brechaObjetivo = props.entryMarket.objetivo - props.entryMarket.corp;
  return (
    <List>
      <ListItem key={2} style={{background: amber['200']}}>
        <ListItemText
          primary={`Objetivo de ${props.entryMarket.anho}`}
          secondary={(
            <span>
              {objetivo} / <span>brecha: </span>{brechaObjetivo}
            </span>
          )}/>
      </ListItem>
      <ListItem key={0} style={{background: yellow['A200']}}>
        <ListItemText
          primary='Máximo Potencial'
          secondary={(
            <span>
              {maximoPotencial} ({maximoPotencialPorcentaje} %)
              / <span>brecha: </span>{brechaMaximoPotencial} ({brechaMaximoPotencialPorcentaje} %)
            </span>
          )}/>
      </ListItem>
      <ListItem key={4}>
        <ListItemText
          primary='Corp'
          secondary={`${corp} (${corpPorcentaje} %)`}/>
      </ListItem>
      <ListItem key={5}>
        <ListItemText
          primary='Negociados'
          secondary={`${negociado} (${negociadoPorcentaje} %)`}/>
      </ListItem>
      <ListItem key={6}>
        <ListItemText
          primary='TOTAL'
          secondary={`${(negociado + corp)} (${(negociadoPorcentaje + corpPorcentaje)} %)`}/>
      </ListItem>
    </List>
  );
};

DetalleEntryMarket.propTypes = {entryMarket: PropTypes.any};

export default DetalleEntryMarket;
