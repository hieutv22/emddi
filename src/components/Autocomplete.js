import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import firebase from './../config/fbConfig';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  }
  static defaultProps = {
    suggestions: []
  }
  constructor(props) {
    super(props)
    this.unsubscribe = null;
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: {},
      suggestPlace: {},
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ''
    }
    this.ref = firebase.firestore().collection('places');
    //this.getSuggessPlace = this.getSuggessPlace.bind(this);
  }

  connectGoogleAPISugest(userInput){
   
  }

  getSuggessPlace(userInput){
      //const {myLocation} = this.props; 
      const google = window.google;
      var myLatLng = new google.maps.LatLng({lat: 21.026463, lng: 105.855659});
      var request = {
        input : userInput,
        location : myLatLng,
        radius : 500,
        componentRestrictions: {country: "vn"}
      }

      var service = new google.maps.places.AutocompleteService();
      service.getQueryPredictions(request, this.callback);
  }

  callback = (predictions, status) => {
    const google = window.google;
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }

    this.setState({
      filteredSuggestions: predictions,
    })
  }
  onCollectionPlace(userInput){
    // this.ref.get().then((querySnapshot)=>{
    //   const filteredSuggestions = [];
    //     querySnapshot.forEach((doc) => {
    //             const place = doc.data();
    //             const key = place.Key;
    //             if(key.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
    //               filteredSuggestions.push(place);
    //             }
    //             //console.log("Connected");
    //         });
    //         console.log(filteredSuggestions);
    //         this.setState({
    //           suggestPlace : filteredSuggestions
    //         })
    //   })
    // })
    this.ref.where('Key', '==', userInput).get().then((querySnapshot)=>{
        const suggestPlace = [];
          querySnapshot.forEach((doc) => {
                  const place = doc.data();
                  const key = place.Key;
                  if(key.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
                    suggestPlace.push(place);
                  }
              });
              this.setState({
                suggestPlace : suggestPlace
              })
        })
  }

  onChange = e => {
    const userInput = e.currentTarget.value
    if(userInput){
      this.getSuggessPlace(userInput); 
      this.onCollectionPlace(userInput);
    }
    // Filter our suggestions that don't contain the user's input
    // const filteredSuggestions = suggestions.filter(
    //   suggestion =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // )
    //console.log(suggestions)
    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: e.currentTarget.value
    }); 
  }
  onClick(e, index){
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    var address = '' ;
    if(index>4){
      address = this.state.suggestPlace[index-5].description;
    }else{
      address = this.state.filteredSuggestions[index].description;
    }
    geocoder.geocode({ 'address': address}, (results, status)=>{
      if (status == 'OK') {
        this.props.onPlaceChanged(results[0].geometry.location);
      }
    })
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      suggestPlace: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    })
  }
  
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      })
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 })
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  render() {
    const {className, placeholder} = this.props;
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        suggestPlace,
        showSuggestions,
        userInput
      }
    } = this

    let suggestionsListComponent
    if (showSuggestions && userInput) {
      var predictions = [];
      if(filteredSuggestions.length){
        {filteredSuggestions.map((suggestion)=>{
          predictions.push(suggestion.description);
        })}
      }
      if(suggestPlace.length){
        {suggestPlace.map((suggestion)=>{
          predictions.push(suggestion.description);
        })}
      }
      //console.log(predictions)
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className={className}>
            {predictions.map((suggestion, index) => {
              let className

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active'
              }

              return (
                <li className={className} key={suggestion} onClick={(e) => this.onClick(e, index)}>
                  {suggestion}
                </li>
              )
            })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        )
      }
    }

    return (
      <Fragment >
        <input 
          className="inputSearch"
          type="search"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    )
  }
}

export default Autocomplete
