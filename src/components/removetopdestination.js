import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import '../componentcss/addnewdestinations.css';
import Geocoder from './geocoder';
import { Loading } from './LoadingComponent';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UncontrolledCarousel,
} from 'reactstrap';
import '../componentcss/viewtopDestination.css';
export default class removetopdestination extends Component {
  constructor() {
    super();
    this.state = {
      activeModal: null,
      confirmActive: null,
      places: null,
      loading: true,
      error: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
  }
  clickHandler(id) {
    this.setState({ activeModal: id });
  }

  hideModal() {
    this.setState({ activeModal: null });
  }

  confirmDelete(id) {
    this.setState({ confirmActive: id });
  }

  hideConfirm() {
    this.setState({ confirmActive: null });
  }

  deletePlace(placeid) {
    axios
      .delete(`http://localhost:3000/admin/deleteTopPlace/` + placeid)
      .then((response) => {
        var check = window.confirm('Are you sure, you want to delete Place');
        if (check) {
          if (response.data != null) {
            this.setState({
              places: this.state.places.filter(
                (place) => place._id !== placeid
              ),
            });
          }
        }
      });
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/admin/viewTopPlaces`)
      .then((res) => {
        this.setState({
          places: res.data,
          loading: false,
        });
        if (this.state.places.length === 0) {
          this.setState({
            error: 'No Top Destination Available ',
          });
        } else if (this.state.places === null) {
          this.setState({
            error: 'Popular Desitinations Could not be found !',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="removedestination">
        <div className="login-form" id="removedestinationForm">
          <h2 id="editheading">
            Remove Destination
          </h2>
        </div>
        <div>
          <RenderPlaces
            Places={this.state.places}
            isLoading={this.state.loading}
            error={this.state.error}
            confirmActive={this.state.confirmActive}
            activeModal={this.state.activeModal}
            hideModal={this.hideModal}
            clickHandler={this.clickHandler}
            deletePlace={this.deletePlace}
            confirmDelete={this.confirmDelete}
            hideConfirm={this.hideConfirm}
          />
        </div>
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
  deletePlace,
  confirmDelete,
  hideConfirm,
  confirmActive,
}) => {
  if (isLoading) {
    return <Loading />;
  } else if (error !== null) {
    return (
      <div className="popular_destination_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb_70">
                <h3>Popular Destinations of Pakistan</h3>
              </div>
              <h3 style={{ textAlign: 'center', color: '#00000080',marginTop:'-200px' }}>
                {error}
              </h3>
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
            <div className="col-lg-6">
            </div>
          </div>
          <div className="row" style={{marginTop:"-170px"}}>
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
                <div key={place._id} style ={{width: 'unset'}} className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src={place.image[0]} alt="" style={{ width: '350px', height: '200px' }}/>
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center" id="editplacename" >
                        {place.name}
                        <div id="viewbtns">
                        <BrowserRouter>
                          <Link  className="viewLink" style={{marginLeft:'55px'}}
                              onClick={() => clickHandler(place._id)}>                     
                              View         
                          </Link>
                          <Link className="viewLink" style={{backgroundColor:'red', fontSize:'10px', marginLeft:'5px'}}
                              onClick={() => confirmDelete(place._id)}>
                              Delete                        
                          </Link>
                        </BrowserRouter></div>
                      </p>
                    </div>
                    <Modal
                      isOpen={confirmActive === place._id}
                      toggle={hideConfirm}
                    >
                      <ModalHeader>
                        <b style={{ color: '#001529', fontSize: '20px' }}>
                          Delete place {place.name} ?
                        </b>
                        <hr />
                        <ModalBody>
                          <b style={{ color: '#E94B3CFF' }}>Are you sure, You want to delete this place?</b>
                        </ModalBody>
                      </ModalHeader>
                      <ModalFooter>
                        <div id="removefooter">
                        <Button id="footercancel" onClick={hideConfirm}>
                          Cancel
                        </Button>
                        <Button
                         id="footersubmit"
                          onClick={() => {
                            deletePlace(place._id);
                          }}
                        >
                          Delete
                        </Button>
                        </div>
                      </ModalFooter>
                    </Modal>
                    <Modal
                      isOpen={activeModal === place._id}
                      toggle={hideModal}
                    >
                      <ModalHeader>
                        <b style={{ color: 'black', fontSize: '23px' }}>
                          Popular Destination
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
                          <UncontrolledCarousel items={items} />
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
                        <Button id="sbmt-btn" style={{float:'right'}} onClick={hideModal}>
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
