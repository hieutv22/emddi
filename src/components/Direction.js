import React, {Component} from 'react';

export default class Direction extends Component{
    constructor(props){
        super(props)

        this.routePolyline = null;
    }
    render(){
        const {startPlace, endPlace, map, maps} = this.props;

        this.routePolyline && this.routePolyline.setMap(null);

        var directionsService = new maps.DirectionsService;
        var directionsDisplay = new maps.DirectionsRenderer;
        //directionsDisplay.setMap(map);

        directionsService.route({
            origin: startPlace,
            destination: endPlace,
            travelMode: 'DRIVING'
          }, (response, status) => {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              //console.log(response.routes[0].overview_path, 'Ruta')
              this.routePolyline = new maps.Polyline({
                path: response.routes[0].overview_path
              });
              this.routePolyline.setMap(map);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
        });

        return <></>; 
    }
}