import React, { Component } from 'react';
// import DistanceForm from '../components/distanceForm';
import Maps from '../components/Map';
import axios from 'axios';
import { withScriptjs } from 'react-google-maps';
const MapLoader = withScriptjs(Map);
const API_KEY = 'VvkNzPWbou9Hy991bTTmJNfcbLGzv9Rs';
export class findDistance extends Component {
  constructor() {
    super();
    this.state = {
      origin: undefined,
      destination: undefined,
      originLng: undefined,
      originLat: undefined,
      destLng: undefined,
      destLat: undefined,
      routeType: 'fastest',
      travelDistance: undefined,
      travelTime: undefined,
      fuelUsed: undefined,
      error: undefined,
    };
    this.getDistance = this.getDistance.bind(this);
  }
  getDistance = async (e) => {
    e.preventDefault();
    const origin = e.target.elements.origin.value;
    const destination = e.target.elements.destination.value;
    const routeType = e.target.elements.routeType.value;
    axios
      .get(
        `https://www.mapquestapi.com/directions/v2/route?key=${API_KEY}&from=${origin}&to=${destination}&outFormat=json&ambiguities=ignore&routeType=${routeType}&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
        { redirect: true }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            travelDistance: res.data.route.distance * 1.60934,
            travelTime: res.data.route.formattedTime,
            fuelUsed: res.data.route.fuelUsed * 3.78541,
          });
          if (
            res.data.route.locations[0].adminArea1 === 'PK' &&
            res.data.route.locations[1].adminArea1 === 'PK'
          ) {
            console.log('Fuel used in Liters' + this.state.fuelUsed);
          } else {
            this.setState({
              fuelUsed: null,
            });
            console.log('Cannot Fetch Fuel Data');
          }
        } else {
          console.log('Unable to fetch Data');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Maps getDistance={this.getDistance} fuelUsed={this.state.fuelUsed} />
      </div>
    );
  }
}

export default findDistance;
