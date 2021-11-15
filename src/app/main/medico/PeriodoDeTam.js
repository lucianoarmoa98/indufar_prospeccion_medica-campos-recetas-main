import React from 'react';

class PeriodoDeTam extends React.Component {

  constructor(props) {
    super(props);
    this.formatearPeriodo = this.formatearPeriodo.bind(this);
  }

  formatearPeriodo(tam) {
    const left = tam.substring(0, 4);
    const right = tam.substring(4, tam.length);
    return `${right} / ${left}`;
  }

  render() {
    const tam = this.props.entryMarket.tam ? this.formatearPeriodo(this.props.entryMarket.tam) : '...';
    return `Período: ${tam}`;
  }
}

export default PeriodoDeTam;
