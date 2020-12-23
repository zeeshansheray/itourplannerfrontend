import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ReactInputVerificationCode from 'react-input-verification-code';
import loader from '../images/loading-circle-blue.svg';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/LoginView.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      phone: '',
      cpassword: 'null',
      password: 'empty',
      verificationCode: null,
      tagHotelType: null,
      tagWeatherType: null,
      tagTripType: null,
      tagLocationType: null,
      originalcode: '',
      tagHotelTypeValue: null,
      tagWeatherTypeValue: null,
      tagTripTypeValue: null,
      tagLocationTypeValue: null,
      setModal: null,
      errEmail: false,
      errPass: false,
      loading: false,
      title: this.props.location.state,
    };
    this.hideModal = this.hideModal.bind(this);
    this.activeModal = this.activeModal.bind(this);
    this.submit = this.submit.bind(this);
    this.OnSave = this.OnSave.bind(this);
  }
  activeModal = (id) => {
    this.setState({ setModal: id });
  };
  hideModal = () => {
    this.setState({ setModal: null });
  };
  submit = (e) => {
    e.preventDefault();
    if ((this.state.tagHotelTypeValue && this.state.tagWeatherTypeValue && this.state.tagLocationTypeValue && this.state.tagTripTypeValue) == null) {
      toast.warning('Fill all the fields');
    }
    else {
      if (this.state.cpassword !== this.state.password) {
        toast.error('Password Donot match');
        this.setState({ loading: false });
      } else {
        axios
          .post('http://localhost:3000/users/sendOTP', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
          })
          .then((res) => {
            if (res.status) {
              console.log(res.data);
              this.activeModal(res.data.success);
              this.setState({
                originalcode: res.data.code,
                loading: false,
              });
              toast.success('Activation Code Has Been Sent To Your Account');
            } else {
              toast.error('Problem While Creating Account,Try Again');
              this.setState({ loading: false });
            }
          })
          .catch((err) => {
            var error = err.toString();
            var n = error.search('400');
            var m = error.search('500');
            if (n > 0) {
              toast.error('Email already exist. ');
            } else if (m > 0) {
              toast.error('Username already exist. ');
            } else {
              toast.success('You have sucessfully created an account');
            }
            // toast.error("the error is : " + err);
            this.setState({ loading: false });
          });
      }
    }
  };
  getTags = async () => {
    await axios.get(
      "http://localhost:3000/users/getTags",
    ).then((res) => {

      this.setState({
        tagLocationType: res.data.tagLocations,
        tagHotelType: res.data.tagHotels,
        tagTripType: res.data.tagTrips,
        tagWeatherType: res.data.tagWeather
      })
      console.log(this.state.tagWeatherType);
    }).catch((err) => {
      console.log(err)
    })
  }
  async componentDidMount() {
    await this.getTags();
  }
  OnSave = () => {
    if (this.state.verificationCode == this.state.originalcode) {
      console.log('Code match');
      axios
        .post('http://localhost:3000/users/savetoDatabase', {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          tags: [
            this.state.tagTripTypeValue,
            this.state.tagHotelTypeValue,
            this.state.tagTripTypeValue,
            this.state.tagWeatherTypeValue
          ],
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
          accounttype: this.state.title,
        })
        .then((res) => {
          console.log(res);
          if (res.data.user) {
            this.setState({ loading: false });
            toast.success('Account Created Successfully');
            window.location.href = '/login';
          } else {
            toast.error('Account Not Created,Try Again');
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning('Code doesnot match ');
    }
  };

  render() {
    return (
      <div className="signup">
        <div className="login-form" id="signupForm">
          <form onSubmit={this.submit} style={{ height: '680px' }}>
            <div className="avatar">
              <img src="/assets/img/logo.png" alt="Avatar" />
            </div>
            <h2 className="text-center" id="signuptext">User Registration </h2>
            <div id="box">
              <label id="labels">First Name:</label>
              <input
                type="firstname"
                maxlength="32"
                // autocomplete="off"
                name="firstname"
                minlength="3"
                pattern="[A-Za-z]{1,32}"
                id="firstname"
                placeholder="First Name"
                onChange={(e) => this.setState({ firstname: e.target.value })}
                required="required"
                className="form-control"
              />
            </div>

            <div id="box" style={{ marginLeft: '20px' }}>
              <label id="labels">Last Name:</label>
              <input
                type="lastname"
                name="lastname"
                // autocomplete="off"
                maxlength="32"
                minlength="3"
                pattern="[A-Za-z]{1,32}"
                id="lastname"
                placeholder="Last Name"
                onChange={(e) => this.setState({ lastname: e.target.value })}
                required="required"
                className="form-control"
              />
            </div>
            <br />
            <div id="box">
              <label id="labels" className="username">
                Username:
              </label>
              <input
                type="username"
                className="form-control"
                name="username"
                // autocomplete="off"
                placeholder="Username
            "
                onChange={(e) => this.setState({ username: e.target.value })}
                required="required"
              />{' '}
            </div>
            <br />
            <div id="box" style={{ marginLeft: '20px' }}>
              <label for="email" id="labels">
                Email:
              </label>
              <input
                type="email"
                id="signup_Input"
                // autocomplete="off"
                className="form-control"
                name="email"
                placeholder="Email
            "
                onChange={(e) => this.setState({ email: e.target.value })}
                required="required"
              />
            </div>
            <br />
            <div id="box">
              <label id="labels">Password:</label>
              <input
                type="password"
                className="form-control"
                minlength="8"
                // autocomplete="off"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
                required="required"
              />
            </div>
            <div id="box" style={{ marginLeft: '20px' }}>
              <label id="labels">Phone Number:</label>
              <input
                type="tel"
                // pattern="^\d{4}-\d{3}-\d{4}$"
                placeholder="Format: 03xx-xxxxxxx"
                id="signup_Input"
                // autocomplete="off"
                onChange={(e) => this.setState({ phone: e.target.value })}
                required="required"
                className="form-control"
              />
            </div>
            <div id="box">
              <label id="labels">Confirm Password*:</label>
              <input
                type="password"
                minlength="8"
                className="form-control"
                name="password"
                onChange={(e) => this.setState({ cpassword: e.target.value })}
                placeholder="Password"
                required="required"
              />
            </div>
            <label id="labels" style={{position:'absolute', top:'69%', left:'5.5%'}}>Select Interests:</label>
            <div style={{position:'absolute', top:'73%', display:'flex', marginLeft:'1%'}}>
            <div id="box" style={{ display:'flex', flexDirection:'column' }}>
              <label id="labels" >Weather:</label>
              {Array.isArray(this.state.tagWeatherType) &&
                <select className="form-control" style={{ fontSize: '12px', width: '90px' }}
                  onChange={(e) => this.setState({ tagWeatherTypeValue: e.target.value })}
                >
                  <option>--</option>
                  {this.state.tagWeatherType?.map(value => {
                    return (
                      <option value={value._id}>{value.name}</option>)
                  })}
                </select>}
            </div>
            <div id="box" style={{ marginLeft: '20px' , display:'flex', flexDirection:'column'}}>
              <label id="labels" style={{ float: 'left' }}>Hotels:</label>
              {Array.isArray(this.state.tagHotelType) &&
                <select className="form-control" style={{ fontSize: '12px', width: '90px' }}
                  onChange={(e) => this.setState({ tagHotelTypeValue: e.target.value })}
                >
                  <option>--</option>
                  {this.state.tagHotelType?.map(value => {
                    return (
                      <option value={value._id}>{value.name}</option>)
                  })}
                </select>}
            </div>
            <br />
            <div id="box" style={{marginLeft: '20px', display:'flex', flexDirection:'column'}}>
              <label id="labels">Trip days:</label>
              {Array.isArray(this.state.tagTripType) &&
                <select className="form-control" style={{ fontSize: '12px', width: '100px' }}
                  onChange={(e) => this.setState({ tagTripTypeValue: e.target.value })}
                >
                  <option>--</option>
                  {this.state.tagTripType?.map(value => {
                    return (
                      <option value={value._id}>{value.name}</option>)
                  })}
                </select>}
            </div>
            <div id="box" style={{ marginLeft: '20px',display:'flex', flexDirection:'column' }}>
              <label id="labels" >Terrains:</label>
              {Array.isArray(this.state.tagLocationType) &&
                <select className="form-control" style={{ fontSize: '12px', width: '100px' }}
                  onChange={(e) => this.setState({ tagLocationTypeValue: e.target.value })}
                >
                  <option>--</option>
                  {this.state.tagLocationType?.map(value => {
                    return (
                      <option value={value._id}>{value.name}</option>)
                  })}
                </select>}
            </div>
            </div>

            <div className="subcan">
              <button type="submit" id="submitbtn">
                Submit
              </button>
              <button
                loader={loader}
                loading={this.state.loading}
                type="reset"
                id="cancelbtn"
              >
                Cancel
              </button>
            </div >
            <div style={{position:'absolute', top:'86%', left:'20%'}}>
            <p className="haveAccount">
              By creating an account you agree to our&nbsp;
              <Link className="haveAccount" id="terms">
                Terms and Privacy
              </Link>
              .
            </p>
            <p className="text-center small" id="login">
              Already have an account?&nbsp;
              <Link id="loginn" to="/login">
                Login here!
              </Link>
            </p></div>
          </form>
          <Modal isOpen={this.state.setModal === true} toggle={this.hideModal}>
            <ModalHeader>
              <b style={{ color: 'black', fontSize: '23px' }}>
                Account Verification
              </b>
            </ModalHeader>
            <ModalBody>
              <b style={{ color: 'black' }}>
                Verification has been sent to your Gmail. &nbsp;&nbsp;
              </b>
              <br />
              <b style={{ color: 'blue', textTransform: 'capitalize' }}>
                Please Enter the Valid Code.
              </b>
              <br />
              <br />
              <ReactInputVerificationCode
                length={4}
                onChange={(text) => {
                  this.setState({ verificationCode: text });
                }}
              />
              <br />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.OnSave();
                }}
              >
                Verify
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <ToastContainer
          position="bottom-center"
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
export default signup;
