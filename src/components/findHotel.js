/*global google*/
import React, { Component } from 'react';
import axios from 'axios';
import Hotels from './hotels';
import '../componentcss/hotel.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const API_KEY = 'AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss';

export class findhotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      address: '',
      Lat: null,
      Lng: null,
      error: null,
      Hotels: null,
      loading: false,
      hotelPhone: null,
      hotelWebsite: null,
    };
    this.clickme = this.clickme.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  async clickHandler(id) {
    this.setState({ activeModal: id });
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${API_KEY}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'x-requested-with': 'XMLHttpRequest',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          hotelPhone: res.data.result.international_phone_number,
          hotelWebsite: res.data.result.website,
        });
      });
  }

  hideModal() {
    this.setState({ activeModal: null });
  }
  componentDidMount() {
    var inputori = document.getElementById('address');
    var options = {
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
  }

  clickme(e) {
    e.preventDefault();
    var geocoder = new google.maps.Geocoder();
    const address = document.getElementById('address').value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        console.log(results);
        try {
          let longitude = results[0].geometry.location.lng();
          let latitude = results[0].geometry.location.lat();
          this.setState({
            Lng: longitude.toPrecision(6),
            Lat: latitude.toPrecision(6),
          });
          this.setState({
            loading: true,
          });
          console.log(this.state.Lat, this.state.Lng);
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss&radius=5000&type=lodging&pagetoken=&location=${this.state.Lat},${this.state.Lng}&keyword=Hotel&rankby=prominence`,
              {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                  'x-requested-with': 'XMLHttpRequest',
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              this.setState({
                Hotels: res.data.results,
                loading: true,
              });
              console.log(this.state.Hotels);
              setTimeout(() => {
                this.setState({ loading: false });
              }, 100);
              // document.getElementById('canvashotel').style.height = '100%';
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          toast.error("Sorry couldn't find this place, try another one.");
        }
      } else {
        toast.error("Sorry couldn't find this place, try another one.");
      }
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="canvashotel" id="hotelid">
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
        <h3 style={{ fontFamily: 'Titillium Web' }}>Search Hotels</h3>
        <div>
          <form className="outlineboxhotel" onSubmit={(e) => this.clickme(e)}>
            <input
              id="address"
              type="text"
              className="location-search-input"
              name="address"
              placeholder="Enter a location?"
              required="required"
              autoComplete="true"
              autoCorrect="true"
              style={{ color: 'black', border: 'solid 1px #001529' }}
            />
            <button className="searchHotel" type="submit" disabled={loading}>
              {loading && <i className="fa fa-refresh fa-spin"></i>}
              &nbsp;&nbsp;Search
            </button>
          </form>

          <div id="hotelslistget">
            <Hotels
              Hotels={this.state.Hotels}
              activeModal={this.state.activeModal}
              hideModal={this.hideModal}
              clickHandler={this.clickHandler}
              hotelPhone={this.state.hotelPhone}
              hotelWebsite={this.state.hotelWebsite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default findhotel;
