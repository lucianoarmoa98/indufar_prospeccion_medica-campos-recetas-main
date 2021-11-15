import React from 'react';
import {FusePageSimple} from '@fuse';
import {Grid, Paper, Typography} from '@material-ui/core';
import MedicoInfo from './MedicoInfo';
import {bindActionCreators} from 'redux';
import * as negociacionActions from '../medicos/store/actions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Submiting from '../../../components/Form/Submiting';
import MaterialTable from 'material-table-hotfix-initial-page-remote-data';
import {configuracionDeTablaNegociados as configuracionDeTabla} from '../medicos/MedicosConfig';
import {
  END_POINT_NEGOCIACIONES,
  languageConfig
} from '../UIUtils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GreenRadio from '../negociacion/GreenRadio';
import YellowRadio from '../negociacion/YellowRadio';
import ResumenDeMedicoYSusNegociaciones
  from './ResumenDeMedicoYSusNegociaciones';
import {amber, green} from '@material-ui/core/colors';

const classes = {
  toolbar: 'p-0',
  header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
};

class NegociacionesDeMedico extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.recargarTabla = this.recargarTabla.bind(this);
    this.state = {
      negociaciones: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const {codigoMedicoRegion} = this.props.match.params;
    this.props.getData(codigoMedicoRegion);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  recargarTabla() {
    if (this.tableRef.current) {
      this.tableRef.current.onQueryChange();
      const {codigoMedicoRegion} = this.props.match.params;
      this.props.getData(codigoMedicoRegion);
    }
  }

  render() {
    const {
      medicos: {formEdit: {values}},
      match: {params: {codigoMedicoRegion}},
      history
    } = this.props;
    const {negociaciones} = this.state;
    const endPoint = `${END_POINT_NEGOCIACIONES}/medicos/${codigoMedicoRegion}`;
    return (
      <div>
        <FusePageSimple
          classes={classes}
          content={
            <div style={{margin: 16}}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <MedicoInfo medico={values}/>
                  <br/>
                  <ResumenDeMedicoYSusNegociaciones
                    medico={values}
                    negociaciones={negociaciones}/>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <MaterialTable
                    title={
                      <div>
                        <Typography className="text-16" noWrap={true}>
                          Negociaciones
                        </Typography>
                      </div>
                    }
                    columns={configuracionDeTabla.columnasDeNegociacionesEnPerfilDeMedico}
                    tableRef={this.tableRef}
                    style={{paddingBottom: 8}}
                    data={() => new Promise(resolve => {
                      fetch(endPoint)
                        .then(response => response.json())
                        .then(result => {
                          if (!this._isMounted) {
                            return;
                          }
                          const {data} = result;
                          this.setState({
                            negociaciones: data
                          });
                          resolve({
                            data: data,
                            page: 0,
                            totalCount: data.length
                          });
                        });
                    })}
                    localization={languageConfig}
                    options={{
                      search: false,
                      actionsColumnIndex: -1,
                      paging: false
                    }}
                    components={{
                      Container: props => <Paper {...props} elevation={0}/>
                    }}
                    actions={[
                      {
                        icon: 'refresh',
                        tooltip: 'Actualizar',
                        isFreeAction: true,
                        onClick: () => this.recargarTabla()
                      }
                    ]}
                    detailPanel={rowData => {
                      const {itemsNegociacion} = rowData;
                      return (
                        <div
                          style={{
                            width: '100%',
                            height: '100%'
                          }}>
                          <div>
                            <List style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              padding: 0
                            }}>
                              {
                                itemsNegociacion.map((item, index) =>
                                  <ListItem
                                    key={index}
                                    style={{
                                      paddingLeft: 0,
                                      backgroundColor: index % 2 === 0 ? '#efefef' : '#FFFFFF',
                                      width: 200
                                    }}>
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      margin: 8
                                    }}>
                                      <Typography className="text-13">{item.producto.descripcion}</Typography>
                                      <Typography className="text-12" style={{
                                        color: item.esExclusivo ? green['500'] : amber['600']
                                      }}>
                                        {
                                          item.esExclusivo ?
                                            'Es exclusivo' :
                                            'Compartido'
                                        }
                                      </Typography>
                                    </div>
                                  </ListItem>
                                )
                              }
                            </List>
                          </div>
                        </div>
                      );
                    }}
                    onRowClick={(event, rowData) =>
                      history.push(`/negociaciones/${rowData.id}`)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          }/>
      </div>
    );
  }
}

function mapStateToProps({medicos}) {
  return {
    medicos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getData: negociacionActions.getData
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NegociacionesDeMedico));
