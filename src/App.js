import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import request from 'request'; 

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      result: '',
      bandInput: '',
      venues: null
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position)
          this.setState({position: position.coords})
        });
      }  
  }

  componentDidUpdate() {
    console.log('this component has been updated');
  }

  isBandHere() {
    if (!this.state.bandInput) {
      this.setState({ result: 'band is not here' });
    }
    else {
      let url = `http://localhost:3001?artist=${this.state.bandInput}`; 
      request(url, (error, response, body) => {
        console.log(body);
        let venues = JSON.parse(body)
        if(venues.length > 0)
          this.setState({ venues: venues, result: `Looking for ${this.state.bandInput}`})
        else
          this.setState({venues: null, result: `${this.state.bandInput} is not touring`})
    })
  }
  }

  renderMap() {
    if (this.state.venues) {

      return <TourMap venues={this.state.venues} position={this.state.position} />
    }
    return null;
  }

  render() {
    return (
      <div>
        <input onChange={(e) => { this.setState({ bandInput: e.target.value }) }}></input>Band Name
        <hr />
        <button onClick={() => { this.isBandHere() }}>Check</button>

        <div>{this.state.result}</div>
        <hr />
        <div>
          {this.renderMap()}
        </div>
      </div>
    );
  }
}

function TourMap(props) {
   let position
  if(props.position)
    position = [props.position.latitude, props.position.longitude]
  else
    position = [props.venues[0].venue.latitude, props.venues[0].venue.longitude];

  function renderMarkers() {
    return props.venues.map((performance, idx) => {
      let position = [performance.venue.latitude, performance.venue.longitude]
      return (
        <Marker key={idx} position={position}>
          <Popup>
            <span>{performance.title}<br/>{performance.formatted_datetime}<br/>Ticket Status: {performance.ticket_status}</span>
          </Popup>
        </Marker>
      );

    })
  }

    return (
      <Map center={position} zoom={5}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderMarkers()}
      </Map>
    );
  
}

export default App;