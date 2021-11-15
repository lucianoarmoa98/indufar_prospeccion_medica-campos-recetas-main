import React, { Component } from 'react';
import { config } from './DashboardConfig';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import _ from '@lodash';
import moment from 'moment';

const MapMultipleMarkersComponent = withScriptjs(withGoogleMap((props) => {
  let position = {
    lat: -25.3352483,
    lng: -57.318751
  };
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={position}>
      {
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={80}>
          {
            _.map(props.markers, (e, index) => {
              return (
                <Marker
                  key={index}
                  position={{
                    lat: e.latitud,
                    lng: e.longitud
                  }}
                  onClick={() => {
                    props.openInfo(e);
                  }}>
                  {
                    e.isOpenInfo && <InfoWindow onCloseClick={() => props.closeInfo(e)}>
                      <div>
                        <div>{e.nombre} {e.apellido} {e.legajo ? `(${e.legajo})` : ''}</div>
                        <br/>
                        <div>Última vez: {moment(e.fechaActualizacion).format('DD/MM/YY - hh:mm a')}</div>
                      </div>
                    </InfoWindow>
                  }
                </Marker>
              );
            })
          }
        </MarkerClusterer>
      }
    </GoogleMap>
  );
}));

class MapComponentVisitadores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visitadores: []
    };
    this.openInfo = this.openInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.visitadores && JSON.stringify(this.props.visitadores) !== JSON.stringify(prevProps.visitadores)) {
      this.setState({
        visitadores: [...this.props.visitadores.map(e => ({ ...e, isOpenInfo: true }))]
      });
    }
  }

  openInfo(visitador) {
    let visitadores = this.state.visitadores;
    const index = visitadores.findIndex(e => e.email === visitador.email);
    if (index === -1) {
      return;
    }
    const leftSide = visitadores.slice(0, index);
    const rightSide = visitadores.slice(index + 1, visitadores.length);
    this.setState({
      visitadores: [
        ...leftSide,
        {
          ...visitador,
          isOpenInfo: true
        },
        ...rightSide
      ]
    });
  }

  closeInfo(visitador) {
    let visitadores = this.state.visitadores;
    const index = visitadores.findIndex(e => e.email === visitador.email);
    if (index === -1) {
      return;
    }
    const leftSide = visitadores.slice(0, index);
    const rightSide = visitadores.slice(index + 1, visitadores.length);
    this.setState({
      visitadores: [
        ...leftSide,
        {
          ...visitador,
          isOpenInfo: false
        },
        ...rightSide
      ]
    });
  }

  render() {
    return (
      <div>
        <MapMultipleMarkersComponent
          googleMapURL={config.googleMapURL}
          loadingElement={
            <div
              style={{
                height: '400px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#eee'
              }}>
              <span style={{alignSelf: 'center'}}>Cargando...</span>
            </div>
          }
          containerElement={
            <div
              style={{
                height: '400px',
                width: '100%'
              }}/>
          }
          mapElement={
            <div
              style={{
                height: '100%',
                width: '100%'
              }}/>
          }
          markers={this.state.visitadores}
          openInfo={this.openInfo}
          closeInfo={this.closeInfo}/>
      </div>
    );
  }
}

export default MapComponentVisitadores;
