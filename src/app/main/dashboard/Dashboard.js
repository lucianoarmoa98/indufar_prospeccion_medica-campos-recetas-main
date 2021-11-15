// React y Redux.
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dashboardActions from './store/actions';
// Otros.
import {FusePageSimple} from '@fuse';
import {withRouter} from 'react-router-dom';
import MapComponentVisitadores from './MapComponentVisitadores';
import {Grid, Icon, IconButton, Paper, Typography} from '@material-ui/core';
import UltimasNegociaciones from './UltimasNegociaciones';
import AnalistasConNegociaciones from './AnalistasConNegociaciones';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getDatosDeMapa();
    this.props.getNegociacionesPorAnalista();
  }

  render() {
    const {
      dashboard: {
        mapa: {visitadores},
        negociacionesPorAnalista
      },
      getDatosDeMapa,
      getNegociacionesPorAnalista
    } = this.props;
    return (
      <FusePageSimple
        content={
          <div className="p-24">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className="w-full rounded-8 shadow-none border-1">
                  <div className="flex items-center justify-between px-4 pt-4">
                    <Typography
                      className="text-16 px-12">Visitadores</Typography>
                    <IconButton aria-label="more" onClick={getDatosDeMapa}>
                      <Icon>refresh</Icon>
                    </IconButton>
                  </div>
                  <MapComponentVisitadores visitadores={visitadores}/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={7}>
                <UltimasNegociaciones />
              </Grid>
              <Grid item xs={12} sm={5}>
                <AnalistasConNegociaciones
                  negociacionesPorAnalista={negociacionesPorAnalista}
                  getNegociacionesPorAnalista={getNegociacionesPorAnalista}/>
              </Grid>
            </Grid>
          </div>
        }/>
    );
  }
}

function mapStateToProps({dashboard}) {
  return {
    dashboard
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDatosDeMapa: dashboardActions.getDatosDeMapa,
      getUltimasNegociaciones: dashboardActions.getUltimasNegociaciones,
      getNegociacionesPorAnalista: dashboardActions.getNegociacionesPorAnalista
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
