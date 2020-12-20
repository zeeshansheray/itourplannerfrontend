import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
const viewmap = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

render(<Map />, document.getElementById('root'));
export default viewmap;
