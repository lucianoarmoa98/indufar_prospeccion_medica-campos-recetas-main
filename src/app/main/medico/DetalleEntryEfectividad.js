import React from 'react';
import {
  Paper,
  Typography
} from '@material-ui/core';
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
import {
  languageConfig,
  separadorDeMiles
} from '../UIUtils';

const fontSize = 12;
const headerStyle = {fontSize, paddingLeft: 4, paddingRight: 4, textAlign: 'center'};
const cellStyle = {fontSize, paddingLeft: 4, paddingRight: 4, textAlign: 'center'};

class DetalleEntryEfectividad extends React.Component {

  render() {
    const {efectividad} = this.props;
    return (
      <MaterialTable
        title={
          <div>
            <div className="flex items-center justify-between pt-4">
              <Typography className="text-16">Efectividad</Typography>
            </div>
          </div>
        }
        columns={[
          {
            title: ' ',
            field: 'metrica',
            render: rowData => (
              <div style={{fontSize, marginLeft: 16}}>
                {rowData.metrica}
              </div>
            ),
            headerStyle: {...headerStyle, textAlign: 'left'},
            cellStyle: {...cellStyle, textAlign: 'left'}
          }, {
            title: 'Inicial',
            field: 'inicial',
            render: rowData => (
              <div style={{fontSize}}>
                {
                  rowData.noUsarSeparadorDeMiles ?
                  rowData.inicial :
                    (rowData.inicial !== 0 ? separadorDeMiles(rowData.inicial) : '0')
                }
              </div>
            ),
            headerStyle,
            cellStyle
          }, {
            title: 'Actual',
            field: 'actual',
            render: rowData => (
              <div style={{fontSize}}>
                {
                  rowData.noUsarSeparadorDeMiles ?
                    rowData.actual :
                    (rowData.actual !== 0 ? separadorDeMiles(rowData.actual) : '0')
                }
              </div>
            ),
            headerStyle,
            cellStyle
          }, {
            title: 'Variación',
            field: 'variacion',
            render: rowData => (
              <div style={{fontSize}}>
                {
                  rowData.noUsarSeparadorDeMiles ?
                    rowData.variacion :
                    (rowData.variacion !== 0 ? separadorDeMiles(rowData.variacion) : '0')
                }
              </div>
            ),
            headerStyle,
            cellStyle
          }
        ]}
        tableRef={this.tableRef}
        style={{paddingBottom: 8}}
        data={efectividad}
        localization={languageConfig}
        options={{paging: false, search: false, padding: 'dense', doubleHorizontalScroll: false}}
        components={{
          Container: props => <Paper {...props} elevation={0}/>
        }}/>
    );
  }
}

export default DetalleEntryEfectividad;
