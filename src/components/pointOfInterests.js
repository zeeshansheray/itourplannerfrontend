/*global google*/
import React from 'react';
import pagenotfound from '../images/image-not-found.jpg';
import ModalMap from './ModalMap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function RenderPOIs({ pois, clickHandler, hideModal, activeModal }) {
  if (pois !== null) {
    return (
      <div className="containerpoi" style={{ marginLeft: '100px' }}>
        <div className="columnspoi">
          {pois.map((poi) => {
            if (poi.name !== undefined) {
              return (
                <div id="entry" key={poi.location_id}>
                  <img
                    src={
                      poi.photo === undefined
                        ? pagenotfound
                        : poi.photo.images.large.url
                    }
                    alt={poi.name}
                    className="img-fluid img-thumbnail"
                    style={{ width: '350px', height: '200px' }}
                  />
                  <Button
                    className="viewButton"
                    color="primary"
                    onClick={() => clickHandler(poi.location_id)}
                    style={{ backgroundColor: 'none' }}
                  >
                    <span id="hname">{poi.name}</span>
                  </Button>
                  <Modal
                    isOpen={activeModal === poi.location_id}
                    toggle={hideModal}
                  >
                    <ModalHeader>
                      <b style={{ color: 'black', fontSize: '23px' }}>
                        Details:
                      </b>
                    </ModalHeader>
                    <ModalBody>
                      <b style={{ color: 'black' }}>POI Name:&nbsp;&nbsp;</b>
                      <b style={{ color: 'blue' }}>{poi.name}</b>
                      <br />
                      <b style={{ color: 'black' }}>Price:&nbsp;&nbsp;</b>
                      <b style={{ color: 'blue' }}>
                        {poi.price === undefined || ''
                          ? 'Prices not available'
                          : poi.price}
                      </b>
                      <br />
                      <b style={{ color: 'black' }}>Description:&nbsp;&nbsp;</b>
                      <b style={{ color: 'red' }}>
                        {poi.description === '' || undefined
                          ? 'No description available'
                          : poi.description}
                      </b>
                      <br />
                      <b style={{ color: 'black' }}>Rating:&nbsp;&nbsp;</b>{' '}
                      <b style={{ color: 'blue' }}>
                        {poi.rating === undefined || ''
                          ? 'Ratings not available'
                          : poi.rating}
                      </b>
                      <br />
                      <b style={{ color: 'black' }}>Location:&nbsp;&nbsp;</b>
                      <br />
                      <div id="map">
                        <ModalMap
                          Lat={parseFloat(poi.latitude)}
                          Lng={parseFloat(poi.longitude)}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={hideModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const PointOfInterests = (props) => {
  if (props.POIs !== null) {
    return (
      <div>
        <RenderPOIs
          pois={props.POIs}
          activeModal={props.activeModal}
          hideModal={props.hideModal}
          clickHandler={props.clickHandler}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PointOfInterests;
