import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import {
  COTIZACION_DOLLAR,
  MONEDA,
  monedas,
  separadorDeMiles,
  termos
} from '../UIUtils';
import _ from '@lodash';

class ResumenDeMedicoYSusNegociaciones extends React.Component {

  render() {
    let aporteEconomico = 0;
    let cantidadDeTermos = 0;
    let cantidadDeBecas = 0;
    let montoDeBecas = 0;
    let montoDeTermos = 0;
    const {
      negociaciones,
      medico
    } = this.props;
    const _negociaciones = negociaciones ? negociaciones : [];
    _.forEach(_negociaciones, e => {
      if (_.isEmpty(e)) {
        return;
      }
      if (e.aporteEconomico && e.aporteEconomico.montoDeAporteEconomico) {
        const {montoDeAporteEconomico, monedaDeAporteEconomico} = e.aporteEconomico;
        let monto = montoDeAporteEconomico;
        if (monedaDeAporteEconomico === MONEDA.DOLLAR) {
          monto = monto * COTIZACION_DOLLAR;
        }
        aporteEconomico += monto;
      }
      if (e.pedidoDeTermo && e.pedidoDeTermo.termo) {
        cantidadDeTermos += 1;
        const termo = termos.find(t => t.name === e.pedidoDeTermo.termo);
        if (termo) {
          montoDeTermos += termo.costo;
        }
      }
      if (e.pedidoDeBeca && e.pedidoDeBeca.evento) {
        const {montoDeBeca, monedaDeBeca} = e.pedidoDeBeca;
        cantidadDeBecas += 1;
        let monto = 0;
        if (montoDeBeca) {
          monto = montoDeBeca;
          if (monedaDeBeca === MONEDA.DOLLAR) {
            monto = monto * COTIZACION_DOLLAR;
          }
        }
        montoDeBecas += monto;
      }
    });
    const total = aporteEconomico + montoDeBecas + montoDeTermos;
    const caracterGuaranies = monedas.find(m => m.value === MONEDA.GUARANIES);
    return (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-4 pt-4"
             style={{minHeight: 52}}>
          <Typography className="text-16 px-12">Total {total ? separadorDeMiles(total) : 0} ₲</Typography>
          <Typography className="text-12 px-12">(1 Dólar a {separadorDeMiles(COTIZACION_DOLLAR)} {caracterGuaranies.label})</Typography>
        </div>
        <List>
          <ListItem key={0}>
            <ListItemText
              primary='Aporte Económico'
              secondary={`${aporteEconomico ? separadorDeMiles(aporteEconomico) : 0} ${caracterGuaranies.label}`}/>
          </ListItem>
          <ListItem key={1}>
            <ListItemText
              primary='Becas'
              secondary={`${cantidadDeBecas} (cantidad) - Monto en becas: ${montoDeBecas ? separadorDeMiles(montoDeBecas) : 0} ${caracterGuaranies.label}`}/>
          </ListItem>
          <ListItem key={2}>
            <ListItemText
              primary='Termos'
              secondary={`${cantidadDeTermos} (cantidad) - Monto en termos: ${montoDeTermos ? separadorDeMiles(montoDeTermos) : 0} ${caracterGuaranies.label}`}/>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default ResumenDeMedicoYSusNegociaciones;
