import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Header from './Header';
import SearchBox from './SearchBox';
import MarkerPlace from './MarkerPlace';

class Map extends Component {
    constructor (props) {
        super(props)
        //this.searchbar = React.createRef();
        // this.state = {
        //   mapsLoaded: false,
        //   map: null,
        //   maps: null,
        // }
    }
    onMapLoaded (map, maps) {
        this.fitBounds(map, maps)
        //map.controls[maps.ControlPosition.TOP_LEFT].push(this.searchbox.current);
        // this.setState({
        //   //...this.state,
        //   mapsLoaded: true,
        //   map: map,
        //   maps: maps
        // })
        this.mapsLoaded = true;
        this.map = map;
        this.maps = maps;
    }

    fitBounds (map, maps) {
        var bounds = new maps.LatLngBounds()
        for (let marker of this.props.markers) {
          bounds.extend(
            new maps.LatLng(marker.lat, marker.lng)
          )
        }
        map.fitBounds(bounds)
    }

    showMarker(){
      const {startPlace, endPlace} = this.props;
      if(endPlace || startPlace){
        return  <MarkerPlace startPlace={startPlace}
        endPlace={endPlace}
        map= {this.state.map}
        maps= {this.state.maps}/>
      }
    }
    afterMapLoadChanges () {
        
        return (
          <div style={{display: 'none'}}>
            {/* {this.showMarker()} */}
          </div>
        )
    }
    render () {
      const {startPlace, endPlace} = this.props;
      // const {map, maps} = this.state;

        return (
          <>
          <GoogleMapReact
            className="mapp"
            bootstrapURLKeys={{key: 'AIzaSyDc2L7RMA_qzBVxIMKD1z6-FfMdOs32Vmc',
                              libraries: ['places', 'drawing']}}
            style={{height: '100%', width: '100%', position: 'fixed'}}
            options={{ disableDefaultUI: true}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}>
            
          </GoogleMapReact>
          {this.mapsLoaded && (<MarkerPlace startPlace={startPlace}
              endPlace={endPlace}
              map={this.map}
            maps={this.maps} />)}
          </>
        )
      }
}

Map.defaultProps = {
    markers: [
        {lat: 21.026463, lng: 105.855659},
        {lat: 21.026463, lng: 105.855659},
        {lat: 21.032294, lng: 105.839528},
        {lat: 21.0335833, lng: 105.8390984},
        {lat: 21.0430283, lng: 105.835951},
        {lat: 21.0481377, lng: 105.835951},
        {lat: 21.033662, lng: 105.836638},
        {lat: 21.030366, lng: 105.836084},
        {lat: 21.024697, lng: 105.845832},
        {lat: 21.028894, lng: 105.849503},
        {lat: 21.023120, lng: 105.851203},
        {lat: 21.024153, lng: 105.857194}        
    ],
    center: [47.367347, 8.5500025],
    zoom: 5
  }

export default Map