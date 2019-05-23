import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Map from './components/Map';
import Autocomplete from './components/Autocomplete'


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      startPlace: null,
      endPlace: null
    }
  }
  showStartPlace(place) {
    const startPlace = JSON.stringify(place, null, 2)
    this.setState({ startPlace : place });
  }

  showEndPlace(place) {
    this.setState({ endPlace : place });
  }
  render() {
    return (
      <div>
        <div><Map startPlace={this.state.startPlace}
                  endPlace={this.state.endPlace}/></div>
        
        <header>
                <div className="form-group">
                <Autocomplete className="suggestions1" placeholder="Bạn đang ở đâu" onPlaceChanged={this.showStartPlace.bind(this)}/>
                <Autocomplete className="suggestions2" placeholder="Nơi bạn cần đến" onPlaceChanged={this.showEndPlace.bind(this)}/>
                </div>
        </header>
        
        {/* <div className='autocomplete'><Autocomplete onPlaceChanged={this.showStartPlace.bind(this)}/></div> */}
        <div><Footer/></div>
        
      </div>
    );
  }
}

export default App;
