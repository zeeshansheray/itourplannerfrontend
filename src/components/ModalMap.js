/*global google*/
import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const ModalMap = (props) => {
  const GoogleMapExample = withGoogleMap(({ Lat, Lng }) => (
    <GoogleMap defaultCenter={{ lat: Lat, lng: Lng }} defaultZoom={10}>
      <Marker position={{ lat: Lat, lng: Lng }}></Marker>
    </GoogleMap>
  ));
  return (
    <div>
      <GoogleMapExample
        Lat={props.Lat}
        Lng={props.Lng}
        containerElement={<div style={{ height: `250px`, width: `460px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default ModalMap;
