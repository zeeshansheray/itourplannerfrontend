/*global google*/
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DisplayGuide from './displayGuides';
import '../componentcss/transport.css';
import '../componentcss/tourguides.css';
import '../componentcss/searchtransport.css';

export default class tourguides extends Component {
  constructor() {
    super();
    this.state = {
      guides: null,
      city: '',
    };
    this.searchGuide = this.searchGuide.bind(this);
  }

  async searchGuide(e) {
    e.preventDefault();
    var temp = document.getElementById('address').value;
    await this.setState({
      city: temp.toLocaleLowerCase(),
    });
    const object = {
      city: this.state.city,
    };
    await axios
      .get('http://localhost:3000/users/guide/' + this.state.city)
      .then((res) => {
        this.setState({
          guides: res.data,
        });
        console.log(this.state.guides);
        // console.log(guides);
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });
  }

  componentDidMount() {
    var inputori = document.getElementById('address');
    var options = {
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
  }
  render() {
    return (
      <div className="canvashotel" id="hotelid">
        <h3 style={{ fontFamily: 'Titillium Web' }}>Search Guides</h3>

        <form className="outlineboxhotel" onSubmit={this.searchGuide}>
          <input
            id="address"
            type="text"
            className="location-search-input"
            name="address"
            placeholder="Enter a location?"
            required="required"
            autoComplete="true"
            style={{ color: 'black', border: 'solid 1px #001529' }}
          />
          <button className="searchHotel" type="submit">
            {/* {loading && <i className="fa fa-refresh fa-spin"></i>} */}
            &nbsp;&nbsp;Search
          </button>
        </form>

        <DisplayGuide guides={this.state.guides} city={this.state.city} />
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
      </div>
    );
  }
}
