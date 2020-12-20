/*global google*/
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../componentcss/tourguides.css';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import Switch from 'react-switch';

import { Tabs } from 'antd';
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

export default class becomeGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: this.props.fullname,
      nicno: '',
      address: '',
      email: this.props.email,
      phone: this.props.phone,
      city: '',
      userid: this.props.username,
      approved: false,
      requestSent: false,
      guestData: null,
      availability: true,
    };

    this.onChangeNic = this.onChangeNic.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmitGuide = this.onSubmitGuide.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  s;
  handleChange(availability) {
    this.setState({ availability });
    axios
      .post(
        `http://localhost:3000/users/updateAvailability/` +
        this.state.guestData._id
      )
      .then((response) => {
        console.log(response);
        if (response.data.guide.availability) {
          toast.warning('Your Status changed to Unavailable');
        } else {
          toast.success('Your Status changed to Available');
        }
      });
  }

  async onSubmitGuide(e) {
    e.preventDefault();
    await this.setState({
      city: document.getElementById('city').value.toString(),
      requestSent: true,
    });
    const quidedetails = {
      fullname: this.state.fullname,
      nicno: this.state.nicno,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      city: this.state.city.toLocaleLowerCase(),
      userid: this.state.userid,
      availability: this.state.availability,
      requestSent: this.state.requestSent,
    };
    axios
      .post('http://localhost:3000/users/addQuideDetails', quidedetails)
      .then((res) => {
        toast.success('Wait until You as a Guide is approved.');
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangeFile(e) {
    let file = e.target.files[0];
    console.log(file);
    this.toBase64(file)
      .then((base) => this.setState({ file: base }))
      .catch((err) => console.error(err));
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangeNic(e) {
    this.setState({
      nicno: e.target.value,
    });
  }

  onDelete(e) {
    e.preventDefault();
    axios
      .delete(
        `http://localhost:3000/users/deleteGuide/` + this.state.guestData._id
      )
      .then((response) => {
        var check = window.confirm('Are you sure, you want to delete User');
        if (check) {
          toast.success('You have been removed as a Guide.');
          window.location.reload();
        }
      });
  }

  fetchData() {
    var options = {
      componentRestrictions: { country: 'pk' },
    };
    var city = document.getElementById('city').value.toLowerCase();
    var address = document.getElementById('address');

    var autoComplete = new google.maps.places.Autocomplete(city, options);
    var autoComplete = new google.maps.places.Autocomplete(address, options);

    axios.get(`http://localhost:3000/users/guideDetail`).then((res) => {
      if (res.data.length > 0) {
        document.getElementById('fullname').value = res.data[0].fullname;
        document.getElementById('nicnumber').value = res.data[0].nicno;
        document.getElementById('phone').value = res.data[0].phone;
        document.getElementById('city').value = res.data[0].city;
        document.getElementById('uaddress').value = res.data[0].address;
        document.getElementById('email').value = res.data[0].email;
        document.getElementById('fullname').disabled = true;
        document.getElementById('nicnumber').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('city').disabled = true;
        document.getElementById('uaddress').disabled = true;
        document.getElementById('email').disabled = true;
        this.setState({
          approved: res.data[0].approved,
          requestSent: res.data[0].requestSent,
          guestData: res.data[0],
          availability: res.data[0].availability,
        });
      } else {
        document.getElementById('fullname').value = this.state.fullname;
        document.getElementById('nicnumber').value = this.state.nicno;
        document.getElementById('phone').value = this.state.phone;
        document.getElementById('email').value = this.state.email;
        document.getElementById('uaddress').value = this.state.address;
        document.getElementById('city').value = this.state.city;
        document.getElementById('phone').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('fullname').disabled = true;
        this.setState({
          requestSent: false,
        });
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="canvastransport" id="transportId">
        <h3 style={{ fontFamily: 'Titillium Web' }}>Become A Guide</h3>
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
        <div style={{ marginLeft: '150px' }}>
          <div
            className="login-form"
            id="signupForm"
            style={{
              marginTop: '0px',
              marginBottom: '-120px',
              marginLeft: '150px',
            }}
          >
            <form
              style={{ height: '360px' }}
              onSubmit={(e) => {
                e.preventDefault();
                this.state.approved === true &&
                  this.state.requestSent === true
                  ? this.onDelete(e)
                  : this.onSubmitGuide(e);
              }}
            >
              <div id="box">
                <label id="labels">Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  required="true"
                  placeholder="fullname"
                  className="form-control"
                  style={{ fontSize: '15px' }}
                />
              </div>

              <div id="box" style={{ marginLeft: '20px' }}>
                <label id="labels">
                  NIC number:{' '}
                  <i style={{ fontSize: '10px' }}>
                    `(Remain Confidential)`
                      </i>
                </label>
                <input
                  type="text"
                  name="nicnumber"
                  id="nicnumber"
                  placeholder="14 digit NIC i.e 23123xxxxxx51"
                  className="form-control"
                  maxlength="14"
                  required="true"
                  onChange={this.onChangeNic}
                  minLength="14"
                  style={{ fontSize: '15px' }}
                  required="required"
                />
              </div>

              <div id="box">
                <label for="email" id="labels">
                  Email:
                    </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  required="true"
                  placeholder="Email"
                />
              </div>
              <br />
              <div id="box" style={{ marginLeft: '20px' }}>
                <label id="labels">
                  Location:{' '}
                  <i style={{ fontSize: '10px' }}>
                    i.e. Faizabad,Rawalpindi or Sost,Gilgit
                      </i>
                </label>
                <input
                  type="text"
                  minlength="8"
                  className="form-control"
                  name="address"
                  required="required"
                  placeholder="Address"
                  required="true"
                  id="uaddress"
                  onChange={this.onChangeAddress}
                />
              </div>

              <div id="box">
                <label id="labels">Phone Number:</label>
                <input
                  type="tel"
                  placeholder="Format: 03xx-xxxxxxx"
                  id="signup_Input"
                  className="form-control"
                  required="true"
                  required="required"
                  maxLength="11"
                  onChange={this.onChangePhone}
                  id="phone"
                />
              </div>

              <div id="box" style={{ marginLeft: '20px' }}>
                <label id="labels">City:</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter city"
                  autoComplete="true"
                  required="true"
                  autoCorrect="true"
                  required="required"
                  className="form-control"
                />
              </div>

              <div className="subcan">
                {this.state.approved === true &&
                  this.state.requestSent === true ? (
                    [
                      <button
                        type="submit"
                        id="guideBtn"
                        className="delguidebtn"
                        style={{ marginLeft: '350px' }}
                      >
                        Remove as a guide
                        </button>,
                      <label style={{ marginLeft: '-500px' }}>
                        <span>
                          <b>Unactive</b>
                        </span>
                        <Switch
                          onChange={this.handleChange}
                          checked={this.state.availability}
                        />
                        <b>Active</b>
                      </label>,
                    ]
                  ) : this.state.approved === false &&
                    this.state.requestSent === true ? (
                      <button
                        disabled
                        type="submit"
                        id="guideBtn"
                        className="pending"
                        style={{ marginLeft: '150px' }}
                      >
                        Request Pending
                      </button>
                    ) : this.state.approved === false &&
                      this.state.requestSent === false ? (
                        <button
                          type="submit"
                          id="guideBtn"
                          className="saveguidebtn"
                          style={{ marginLeft: '-20px' }}
                        >
                          Add as a Guide
                        </button>
                      ) : (
                        <div></div>
                      )}
              </div>
            </form></div>
        </div>
      </div>
    );
  }
}
