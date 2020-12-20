/*global google*/
import React, { Component} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '../componentcss/map.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      directions: null,
      oriLat: null,
      oriLng: null,
      desLat: null,
      desLng: null,
      distance: null,
      time: null,
    };
    this.clickme = this.clickme.bind(this);
  }

  componentDidMount() {
    var inputori = document.getElementById('ori');
    var options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
    var inputdes = document.getElementById('des');
    var autocomplete = new google.maps.places.Autocomplete(inputdes, options);
  }

  clickme = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: document.getElementById('ori').value,
        destination: document.getElementById('des').value,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("result:" + JSON.stringify(result)) ;
          this.setState({
            directions: result,
            oriLng: result.routes[0].legs[0].start_location.lng,
            desLng: result.routes[0].legs[0].end_location.lng,
            oriLat: result.routes[0].legs[0].start_location.lat,
            desLat: result.routes[0].legs[0].end_location.lat,
            distance: result.routes[0].legs[0].distance.text,
            time: result.routes[0].legs[0].duration.text,
          });
          console.log("directions " + this.state.directions);
          document.getElementById('routedetails').style.visibility = 'visible';
        } else {
          toast.error('Enter correct origin and destination.');
        }
      }
    );
  };

  handleChange = (e) => {
    this.setState({
      origin: document.getElementById('ori').value,
      destination: document.getElementById('des').value,
    });
  };
  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        id="mapfix"
        defaultCenter={{ lat: 28.3949, lng: 84.124 }}
        defaultZoom={6}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div id="mapcanvas" style={{ position: 'relative' }}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <GoogleMapExample
          containerElement={
            <div
              id="viewmap"
              style={{ height: `880px`, width: '1800px', position: 'relative' }}
            />
          }
          mapElement={<div id="mapitself" style={{ height: `100%` }} />}
        />
        <form id="mapinputbox"  onSubmit={this.props.getDistance}>
          <input
            id="ori"
            type="text"
            name="origin"
            placeholder="Origin?"
            required="required"
            autoComplete="true"
            autoCorrect="true"
            onSubmit={(e) => this.setState({ origin: e.target.value })}
          />
          <input
            id="des"
            type="text"
            name="destination"
            placeholder="Destination? "
            autoComplete="true"
            autoCorrect="true"
            required="required"
            onSubmit={(e) => this.setState({ destination: e.target.value })}
          />
          <select
            id="routeType"
            onSubmit={(e) => this.setState({ routeType: e.target.value })}
          >
            <option value="fastest">Fastest</option>
            <option value="shortest">Shortest</option>
          </select>

          <button id="search" type="submit" onClick={this.clickme}>
            <SearchOutlined style={{verticalAlign: '1px'}} />
            &nbsp;Search
          </button>
        </form>

        <div id="routedetails" style={{ visibility: 'hidden' }}>
          <ul>
            <li>{this.state.distance ? <h2>Route Details are: </h2> : ''}</li>
            <li>
              {this.state.distance ? (
                <span id="names">
                  Distance:{' '}
                  <span style={{ color: 'blue' }}>{this.state.distance} </span>{' '}
                </span>
              ) : (
                ''
              )}
            </li>
            <li>
              {' '}
              {this.state.time ? (
                <span id="names">
                  Duration:{' '}
                  <span style={{ color: 'blue' }}>{this.state.time}</span>
                </span>
              ) : (
                ''
              )}
            </li>
            <li>
              {this.props.fuelUsed ? (
                <span id="names">
                  Fuel Approx (Liters):{' '}
                  <span style={{ color: 'red' }}>
                    {this.props.fuelUsed.toFixed(2)}L
                  </span>
                </span>
              ) : (
                ''
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Map;
