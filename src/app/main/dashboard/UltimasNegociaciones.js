import {Paper, Typography} from '@material-ui/core';
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
import moment from 'moment';
import {
  END_POINT_NEGOCIACIONES, getNombreYLegajoDeVisitador,
  getNombreYMatriculaDeMedico,
  languageConfig
} from '../UIUtils';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {blue, cyan} from '@material-ui/core/colors';

class UltimasNegociaciones extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {history} = this.props;
    const fontSize = 12;
    return (
      <MaterialTable
        title={
          <div>
            <div className="flex items-center justify-between pt-4">
              <Typography className="text-16">Últimas negociaciones</Typography>
              <a href='/negociaciones' target='_blank' style={{marginLeft: 8, color: blue['500']}}>(Ver todas)</a>
            </div>
          </div>
        }
        columns={[
          {
            title: 'Médico',
            field: 'medico',
            render: rowData => {
              let {nombre, metaDato} = getNombreYMatriculaDeMedico(rowData);
              return (
                <div style={{fontSize}}>
                  <p>
                    <span style={{color: blue['500']}}>{nombre} </span>
                    <span>(matr. {metaDato})</span>
                  </p>
                </div>
              );
            }
          }, {
            title: 'Visitador',
            field: 'legajoVisitador',
            render: rowData => {
              let {nombre, metaDato} = getNombreYLegajoDeVisitador(rowData);
              return (
                <div style={{fontSize}}>
                  <p>
                    <span style={{color: cyan['900']}}>{nombre} </span>
                    <span>(leg. {metaDato})</span>
                  </p>
                </div>
              );
            }
          }, {
            title: 'Fecha',
            field: 'fechaNegociacion',
            render: rowData => (
              <div style={{fontSize}}>
                {moment(rowData.fechaNegociacion).format('DD/MM - HH:mm')}
              </div>
            )
          }
        ]}
        tableRef={this.tableRef}
        style={{paddingBottom: 8}}
        data={() => new Promise(resolve => {
          const endPoint = `${END_POINT_NEGOCIACIONES}`;
          fetch(endPoint)
            .then(response => response.json())
            .then(result => {
              if (!this._isMounted) {
                return;
              }
              const {data} = result;
              resolve({
                data,
                page: 0,
                totalCount: data.length
              });
            });
        })}
        localization={languageConfig}
        options={{paging: false, search: false, padding: 'dense'}}
        components={{
          Container: props => <Paper {...props} elevation={0}/>
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Actualizar',
            isFreeAction: true,
            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange()
          }
        ]}
        onRowClick={(event, rowData) =>
          history.push(`/negociaciones/${rowData.id}`)
        }/>
    );
  }
}

export default withRouter(UltimasNegociaciones);
