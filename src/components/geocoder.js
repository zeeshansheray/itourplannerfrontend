/*global google*/
import React, { Component } from 'react';
import ModalMap from './ModalMap';
export class geocoder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lng: 0,
      Lat: 0,
    };
  }

  componentDidMount() {
    var geocoder = new google.maps.Geocoder();
    var address = this.props.address;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        console.log(results);
        try {
          this.setState({
            Lng: results[0].geometry.location.lng(),
            Lat: results[0].geometry.location.lat(),
          });
          console.log(
            this.state.Lat.toPrecision(7),
            this.state.Lng.toPrecision(7)
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <ModalMap Lat={parseFloat(this.state.Lat)} Lng={parseFloat(this.state.Lng)} />
        </div>
      </div>
    );
  }
}

export default geocoder;
