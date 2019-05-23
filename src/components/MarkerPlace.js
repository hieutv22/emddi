import React, {Component} from 'react';
import Direction from './Direction';

const google=window.google;
const iconStartMarker = {
    url: "start_marker.png",
    scaledSize: new google.maps.Size(35, 35)
  };

const iconEndMarker = {
    url: "end_marker.png",
    scaledSize: new google.maps.Size(35, 35)
 };

export default class MarkerPlace extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            isNewStart: false,
            isNewEnd: false,
            startMarker: null,
            endMarker: null
        }
        this.startMarker = null;
        this.endMarker = null;
    }

    fitBounds (map, maps, startPlace, endPlace) {
        var bounds = new maps.LatLngBounds()
        if(startPlace) bounds.extend(new maps.LatLng(startPlace.lat, startPlace.lng));
        if(endPlace) bounds.extend(new maps.LatLng(endPlace.lat, endPlace.lng));
        map.fitBounds(bounds)
    }

    renderMarker(){

        const {startPlace, endPlace, map, maps} = this.props;
       
        if(startPlace){
            let marker = new maps.Marker({
                map: map,
                anchorPoint: new maps.Point(0, -29)
            });
            console.log(startPlace)
            // marker.setVisible(false);
            // map.setCenter(startPlace);
            // map.setZoom(17);
            marker.setPosition(startPlace);
            window.marker = marker;
            // marker.setVisible(true);

            // this.setState({
            //     startMarker: marker
            // })
        }

        if(endPlace){
            let end_marker = new maps.Marker({
                map: map,
                anchorPoint: new maps.Point(0, -29)
            });
            end_marker.setPosition(endPlace);
            // this.setState({
            //     endMarker: end_marker
            // })
        }

        // if(startPlace && endPlace){
        //     this.fitBounds(map, maps, startPlace, endPlace)
        // }

    }

    render(){
        const {startPlace, endPlace, map, maps} = this.props;
        var bounds = new maps.LatLngBounds()
        // Xoa marker tren ban do
        this.startMarker && this.startMarker.setMap(null);
        this.endMarker && this.endMarker.setMap(null);
        

        if(startPlace){
            this.startMarker = new maps.Marker({
                map: map,
                anchorPoint: new maps.Point(0, -29),
                position: startPlace,
                icon: iconStartMarker
            });
            bounds.extend(startPlace);
            map.setZoom(17);
            map.setCenter(startPlace);
        }

        if(endPlace){
            this.endMarker = new maps.Marker({
                map: map,
                anchorPoint: new maps.Point(0, -29),
                position: endPlace,
                icon : iconEndMarker
            });
            bounds.extend(endPlace);
        }
        if(startPlace && endPlace) {
            map.fitBounds(bounds);

            return <Direction startPlace={startPlace}
            endPlace={endPlace}
            map= {map}
            maps= {maps}/>
        }
       
        return <></>;
    }

}

