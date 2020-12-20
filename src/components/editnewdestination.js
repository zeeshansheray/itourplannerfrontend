/*global google*/
import React, { Component } from 'react';
import '../componentcss/editnewdestination.css';
import { Link, BrowserRouter } from 'react-router-dom';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
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
export default class editnewdestination extends Component {
  constructor() {
    super();
    this.state = {
      activeModal: null,
      confirmActive: null,
      places: null,
      loading: true,
      error: null,
      updateplace: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updatePlace = this.updatePlace.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
    this.updatePlacename = this.updatePlacename.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.updatePlaceLocation = this.updatePlaceLocation.bind(this);
    this.updatePlaceDetails = this.updatePlaceDetails.bind(this);
  }
  clickHandler(id) {
    this.setState({ activeModal: id });
  }

  hideModal() {
    this.setState({ activeModal: null });
  }

  confirmUpdate(id) {
    this.setState({ confirmActive: id });
  }

  hideConfirm() {
    this.setState({ confirmActive: null });
  }
  updatePlacename(value, index) {
    let places = [...this.state.places];
    places[index].name = value;
    this.setState({ places: places });
  }
  updatePlaceLocation(value, index) {
    let places = [...this.state.places];
    places[index].location = value;
    this.setState({ places: places });
  }
  updatePlaceDetails(value, index) {
    let places = [...this.state.places];
    places[index].description = value;
    this.setState({ places: places });
  }
  maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length > 6) {
      const msg = 'Only 6 images can be uploaded at a time';
      event.target.value = null; // discard selected file
      console.log(msg);
      return false;
    }
    return true;
  };
  checkMimeType = (event) => {
    let files = event.target.files;
    let err = []; // create empty array
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    for (var x = 0; x < files.length; x++) {
      if (types.every((type) => files[x].type !== type)) {
        err[x] = files[x].type + ' is not a supported format\n';
        // assign message to array
      }
    }
    for (var z = 0; z < err.length; z++) {
      // loop create toast massage
      event.target.value = null;
      toast.error(err[z]);
    }
    return true;
  };
  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    }
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = (event, index) => {
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkMimeType(event)
    ) {
      let places = [...this.state.places];
      places[index].image = event.target.files;
      this.setState({ places: places }, () =>
        console.log(this.state.places[index])
      );
    }
  };
  updatePlace(placeid, index) {
    var check = window.confirm('Are you sure, you want to update this Place');
    if (check) {
      let formData = new FormData();
      formData.append('name', this.state.places[index].name);
      formData.append('location', this.state.places[index].location);
      formData.append('description', this.state.places[index].description);
      for (var i = 0; i < this.state.places[index].image.length; i++) {
        formData.append('image', this.state.places[index].image[i]);
      }

      axios
        .put(
          `http://localhost:3000/admin/updateTopPlace/` + placeid,
          formData,
          {
            onUploadProgress: (ProgressEvent) => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              });
            },
          }
        )

        .then((res) => {
          console.log(res.data);
          toast.success('upload success');
          this.hideConfirm();
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
        })

        .catch((err) => {
          console.log(err);
          toast.error('upload fail');
        });
    }
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
      <div>
        <div className="removedestination">
          <div className="login-form" id="removedestinationForm">
            <h2 id="editheading">
              Edit Destinations
            </h2>
          </div>
          <RenderPlaces
            Places={this.state.places}
            isLoading={this.state.loading}
            error={this.state.error}
            confirmActive={this.state.confirmActive}
            activeModal={this.state.activeModal}
            hideModal={this.hideModal}
            clickHandler={this.clickHandler}
            updatePlace={this.updatePlace}
            confirmUpdate={this.confirmUpdate}
            hideConfirm={this.hideConfirm}
            updateplacename={this.updatePlacename}
            updateplacelocation={this.updatePlaceLocation}
            updateplacedescription={this.updatePlaceDetails}
            onChangeHandler={this.onChangeHandler}
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
  confirmActive,
  activeModal,
  hideModal,
  clickHandler,
  updatePlace,
  confirmUpdate,
  hideConfirm,
  updateplacename,
  updateplacelocation,
  updateplacedescription,
  onChangeHandler,
}) => {
  if (isLoading) {
    return <Loading />;
  } else if (error !== null) {
    return (
      <div className="popular_destination_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
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
        <div className="container" >
          <div className="row" style={{marginTop:"-170px"}}>
            {Places.map((place, index) => {
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
                <div key={place._id} className="col-lg-4 col-md-6" style ={{width: 'unset'}} >
                  <div className="single_destination">
                    <div className="thumb">
                      <img src={place.image[0]} alt="" style={{ width: '350px', height: '200px' }} />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center"  id="editplacename" >
                        {place.name}
                        <div id="viewbtns">
                        <BrowserRouter>	
                          <Link className="viewLink" style={{marginLeft:'55px'}}	
                              onClick={() => clickHandler(place._id)}>	
                              View      	
                          </Link>	
                          <Link  style={{backgroundColor:'blue', fontSize:'10px', marginLeft:'5px'}}	
                              onClick={() => confirmUpdate(place._id)}	
                            >	
                              Edit	
                          	
                          </Link>	
                        </BrowserRouter></div>
                      </p>
                    </div>
                    <Modal
                      isOpen={confirmActive === place._id}
                      toggle={hideConfirm}
                    >
                      <ModalHeader>
                        <b style={{ color: 'black', fontSize: '23px' }}>
                          Update place {place.name}
                        </b>
                        <hr />
                        <ModalBody>
                          <form>
                            <label className="labels">Place Name:</label>
                            <input
                              type="placename"
                              name="placename"
                              id="placename"
                              maxLength="80"
                              value={place.name}
                              onChange={(e) =>
                                updateplacename(e.target.value, index)
                              }
                              autoComplete="true"
                              required="required"
                              className="form-control"
                              style={{ width: '400px' }}
                            />
                            <br />
                            <label className="labels">Location:</label>
                            <input
                              type="location"
                              name="location"
                              id="locations"
                              maxLength="50"
                              value={place.location}
                              autoComplete="true"
                              onChange={(e) =>
                                updateplacelocation(e.target.value, index)
                              }
                              required="required"
                              className="form-control"
                              style={{ width: '400px' }}
                            />
                            <br />
                            <label
                              className="labels"
                              style={{ width: '280px' }}
                            >
                              Details:
                            </label>
                            <textarea
                              className="form-control"
                              type="text"
                              maxLength="200"
                              maxLength="50"
                              placeholder="Enter your text here."
                              id="message"
                              value={place.description}
                              onChange={(e) =>
                                updateplacedescription(e.target.value, index)
                              }
                              required="true"
                              style={{ resize: 'none' }}
                            />
                            <br />
                            <label className="labels">Picture Upload:</label>
                            <input
                              type="file"
                              name="image"
                              id="image"
                              multiple
                              accept="image/*"
                              onChange={(e) => onChangeHandler(e, index)}
                              required="required"
                              className="form-control"
                            />
                          </form>
                        </ModalBody>
                      </ModalHeader>
                      <ModalFooter>
                        <Button id="footercancel" onClick={hideConfirm}>
                          Close
                        </Button>
                        <Button
                          id="footersubmit"
                          style={{marginleft:'-20px'}}
                          onClick={() => {
                            updatePlace(place._id, index);
                          }}
                        >
                          Update
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <Modal
                      isOpen={activeModal === place._id}
                      toggle={hideModal}
                    >
                      <ModalHeader>
                      <b style={{ color: 'black', fontSize: '23px',fontFamily: 'Titillium Web, sans-serif' }}>
                          Popular Destination {place.name}
                        </b>
                      </ModalHeader>
                      <ModalBody>
                        <b style={{fontSize: '15px', color: 'black',fontFamily: 'Titillium Web, sans-serif' }}>
                          Place Name:&nbsp;&nbsp;
                        </b>
                        <b
                          style={{ fontSize: '15px',color: '#E94B3CFF', textTransform: 'capitalize',fontFamily: 'Titillium Web, sans-serif' }}	
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
                          <UncontrolledCarousel height='218px' width='231px'   id="carousel" items={items} />
                        </div>
                        <b style={{fontSize: '15px', color: 'black' ,fontFamily: 'Titillium Web, sans-serif'}}>
                          Place Location:&nbsp;&nbsp;
                        </b>
                        <b style={{fontSize: '15px', color: '#E94B3CFF' ,fontFamily: 'Titillium Web, sans-serif'}}>
                          {place.location === undefined || ''
                            ? 'Place Location not available'
                            : place.location}
                        </b>
                        <br />
                        <b style={{fontSize: '15px', color: 'black' ,fontFamily: 'Titillium Web, sans-serif'}}>
                          Description:&nbsp;&nbsp;
                        </b>
                        <b style={{fontSize: '15px', color: '#E94B3CFF' ,fontFamily: 'Titillium Web, sans-serif'}}>
                          {place.description === undefined || ''
                            ? 'Description not available'
                            : place.description}
                        </b>
                        <br />
                        <b style={{fontSize: '15px', color: 'black' ,fontFamily: 'Titillium Web, sans-serif'}}>Location:</b>
                        <br />
                        <div id="map" style={{marginTop:'10px' }}>
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
