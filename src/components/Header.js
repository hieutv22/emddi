import React, {Component} from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
      }
    
    componentDidMount() {
        const {map, maps} = this.props;
        const google = window.google;
        var options = {
            //types: ["geocode"],
            componentRestrictions: {country: "vn"}
           };
        this.autocomplete = new google.maps.places.Autocomplete(
          this.autocompleteInput.current
          , options
        );
        // Set the data fields to return when the user selects a place.
        this.autocomplete.setFields(
            ['address_components', 'geometry', 'icon', 'name']);
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
        
      }
    
      handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          //this.props.onPlaceChanged(place.geometry.location);
          console.log(place.geometry.location);
      }
    render(){
        const {placeholder} = this.props
        return (
                <input type="search" className="form-control" id="autocomplete" ref={this.autocompleteInput}
                    placeholder={placeholder}/>
          );
    }
}
