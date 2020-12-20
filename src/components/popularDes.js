import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Geocoder from './geocoder';
import { Loading } from './LoadingComponent';
import '../componentcss/editnewdestination.css';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UncontrolledCarousel,
} from 'reactstrap';
class popularDes extends Component {
  constructor() {
    super();
    this.state = {
      activeModal: null,
      places: null,
      loading: true,
      error: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  clickHandler(id) {
    this.setState({ activeModal: id });
  }

  hideModal() {
    this.setState({ activeModal: null });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3000/users/viewTopPlaces`)
      .then((res) => {
        this.setState(
          {
            places: res.data,
            loading: false,
          },
          () => {
            if (this.state.places.length === 0) {
              this.setState({
                error: 'No Top Destination Available ',
              });
            } else if (this.state.places === null) {
              this.setState({
                error: 'Popular Desitinations Could not be found !',
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <RenderPlaces
          Places={this.state.places}
          isLoading={this.state.loading}
          error={this.state.error}
          activeModal={this.state.activeModal}
          hideModal={this.hideModal}
          clickHandler={this.clickHandler}
        />
      </div>
    );
  }
}
const RenderPlaces = ({
  Places,
  isLoading,
  error,
  activeModal,
  hideModal,
  clickHandler,
}) => {
  if (isLoading) {
    return <Loading />;
  } else if (error !== null) {
    return (
      <div>
        <div className="popular_destination_area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section_title text-center mb_70">
                  <h3 id="popheading">Popular Destinations of Pakistan</h3>
                </div>
                <h3 style={{ textAlign: 'center', color: '#00000080' }}>
                  {error}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="popular_destination_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" >
              <div className="section_title text-center mb_70">
                <h3 id="popularheading">Popular Destinations of Pakistan</h3>
              </div>
            </div>
          </div>
          <div className="row" style={{marginTop:'40px'}}>
            {Places.map((place) => {
              var items = [];
              for (var i = 0; i < place.image.length; i += 1) {
                items.push({
                  src: place.image[i],
                  altText: place.name,
                  caption: '',
                  key: i,
                });
              }
              return (
                <div key={place._id} className="col-lg-4 col-md-6" id="populardes" style={{width:'unset'}}>
                  <div className="single_destination" >
                    <div className="thumb">
                      <img src={place.image[0]} alt="" style={{ width: '350px', height: '250px' }}/>
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        {place.name}
                        <div id="viewbutton">
                        <Link className="viewLink"
                            onClick={() => clickHandler(place._id)}>
                       
                            View
                       
                        </Link> </div>
                      </p>
                    </div>
                    <Modal
                      isOpen={activeModal === place._id}
                      toggle={hideModal}
                    >
                      <ModalHeader>
                        <b style={{ color: 'black', fontSize: '23px' }}>
                          Details
                        </b>
                      </ModalHeader>
                      <ModalBody>
                        <b style={{ color: 'black' }}>
                          Place Name:&nbsp;&nbsp;
                        </b>
                        <b
                          style={{ color: '#E94B3CFF', textTransform: 'capitalize' }}
                        >
                          {place.name}
                        </b>
                        <br />
                        <div
                          style={{
                            height: '380px',
                            marginTop: '5px',
                          }}
                        >
                          <UncontrolledCarousel height='180px' style={{height:'180px', width:'231px'}} width='231px' items={items} />
                        </div>
                        <b style={{ color: 'black' }}>
                          Place Location:&nbsp;&nbsp;
                        </b>
                        <b style={{ color: '#E94B3CFF' }}>
                          {place.location === undefined || ''
                            ? 'Place Location not available'
                            : place.location}
                        </b>
                        <br />
                        <b style={{ color: 'black' }}>
                          Description:&nbsp;&nbsp;
                        </b>
                        <b style={{ color: '#E94B3CFF' }}>
                          {place.description === undefined || ''
                            ? 'Description not available'
                            : place.description}
                        </b>
                        <br />
                        <b style={{ color: 'black' }}>Location:</b>
                        <br />
                        <div id="map">
                          <Geocoder address={place.name} />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button id="cancel-btn" onClick={hideModal}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default popularDes;
