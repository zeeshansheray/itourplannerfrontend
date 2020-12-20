import React from 'react';
import ModalMap from './ModalMap';
import axios from 'axios';
import pagenotfound from '../images/image-not-found.jpg';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Hotel } from '@material-ui/icons';
function RenderHotels({
  hotels,
  clickHandler,
  hideModal,
  activeModal,
  HotelPhone,
  HotelWebsite,
}) {
  if (hotels !== null) {
    return (
      <div className="containerhotel" style={{ marginLeft: '100px' }}>
        <div className="columnshotel">
          {hotels.map((hotel) => {
            return (
              <div id="entry" key={hotel.place_id}>
                <img
                  src={
                    hotel.photos == undefined
                      ? pagenotfound
                      : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss`
                  }
                  alt={hotel.name}
                  className="img-fluid img-thumbnail"
                  style={{ width: '350px', height: '200px' }}
                />
                <div id="name_btn">
                  <Button
                    className="viewButton"
                    color="primary"
                    onClick={() => clickHandler(hotel.place_id)}
                  >
                    <span id="hname">{hotel.name}</span>
                  </Button>
                </div>
                <Modal
                  isOpen={activeModal === hotel.place_id}
                  toggle={hideModal}
                >
                  <ModalHeader>
                    <b style={{ color: 'black', fontSize: '23px' }}>Details:</b>
                  </ModalHeader>
                  <ModalBody>
                    <b style={{ color: '#001529' }}>Hotel Name:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue', textTransform: 'capitalize' }}>
                      {hotel.name}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Vicinity:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue' }}>
                      {hotel.vicinity === undefined || ''
                        ? 'Not available'
                        : hotel.vicinity}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Rating:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue' }}>
                      {hotel.rating === undefined || ''
                        ? 'Ratings not available'
                        : hotel.rating}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Phone #:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue' }}>
                      {HotelPhone === undefined || ''
                        ? 'Phone Number not available'
                        : HotelPhone}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>
                      Booking Website:&nbsp;&nbsp;
                    </b>
                    <a
                      href={HotelWebsite}
                      target="_Blank"
                      style={{ color: 'blue' }}
                    >
                      {HotelWebsite === undefined || ''
                        ? 'Website not available'
                        : 'Visit Website'}
                    </a>
                    <br />
                    <b style={{ color: '#001529' }}>Location:</b>
                    <br />
                    <div id="map">
                      <ModalMap
                        Lat={hotel.geometry.location.lat}
                        Lng={hotel.geometry.location.lng}
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
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={{ textAlign: 'center', color: '#00000080' }}>
          "Sorry Cannot Find Any Hotels"
        </h3>
      </div>
    );
  }
}

const hotels = (props) => {
  if (props.Hotels !== null) {
    return (
      <div>
        <RenderHotels
          hotels={props.Hotels}
          activeModal={props.activeModal}
          hideModal={props.hideModal}
          clickHandler={props.clickHandler}
          HotelPhone={props.hotelPhone}
          HotelWebsite={props.hotelWebsite}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default hotels;
