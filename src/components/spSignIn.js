import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import '../componentcss/signinsignup.css';
import loader from '../images/loading-circle-blue.svg';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/LoginView.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import { ToastContainer, toast } from 'react-toastify';
class SpSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errEmail: false,
      errPass: false,
      loading: false,
      username: localStorage.getItem('spusername'),
      password: localStorage.getItem('sppassword'),
      checkbox: false,
      hiddenpass: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  togglepass = () => {
    const { hiddenpass } = this.state;
    this.setState({ hiddenpass: !hiddenpass });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: this.email,
    };
  };

  onSubmit = (e) => {
    e.preventDefault();
    var valid = true;
    if (this.state.loading) return;
    this.setState({ errEmail: false, errPass: false, loading: true });
    if (this.state.username === '') {
      this.setState({ errEmail: true });
      valid = false;
    }
    if (this.state.password === '') {
      this.setState({ errPass: true });
      valid = false;
    }
    if (!valid) {
      this.setState({ loading: false });
      return;
    }
    axios
      .post('http://localhost:3000/serviceProvider/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.admin === false) {
          toast.success('Logged In Successfully');
          this.setState({ loading: false });
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
          window.location.href = '/sp_dashboard';

          localStorage.setItem('spusername', this.state.username);
          localStorage.setItem('sppassword', this.state.password);
        } else {
          toast.error('Invalid Credentials');
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        var error = err.toString();
        console.log(error);
        var n = error.search('400');
        if (n > 0) {
          toast.error('Confirm your email first');
        } else {
          toast.error('Enter Correct Credentials');
        }
        this.setState({ loading: false });
      });
  };
  render() {
    const { hiddenpass } = this.state;
    return (
      <div className="signin">
        <div className="login-form">
          <form onSubmit={this.onSubmit} style={{ height: '440px' }}>
            <div className="avatar">
              <img src="/assets/img/logo.png" alt="Avatar" />
            </div>
            <h2 className="text-center" id="logtext">
              Service Provider Login
            </h2>
            <div className="form-group">
              <input
                type="name"
                className="form-control"
                name="name"
                placeholder="Username"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
                required="required"
                style={{
                  width: '290px',
                  marginLeft: '10px',
                  marginRight: '5px',
                  float: 'left',
                }}
              />
              <i id="passicon">
                <PersonIcon />
              </i>
            </div>
            <div className="form-group">
              <input
                type={hiddenpass ? 'text' : 'password'}
                className="form-control"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
                value={this.state.password}
                required="required"
                style={{
                  float: 'left',
                  marginRight: '5px',
                  marginLeft: '10px',
                  width: '290px',
                }}
              />
              <i id="passicon" onClick={this.togglepass}>
                <VisibilityIcon />
              </i>
            </div>
            <div className="form-group">
              <button
                loader={loader}
                loading={this.state.loading}
                type="submit"
                className="signinbtn"
                style={{ width: '290px', marginLeft: '10px' }}
              >
                Sign In
              </button>
            </div>
            <div className="bottom-action clearfix">
              <label className="float-left form-check-label">
                <input
                  type="checkbox"
                  style={{ marginLeft: '10px' }}
                  name="checkbox"
                  onChange={(e) =>
                    this.setState({ checkbox: e.target.checked })
                  }
                />
                Remember me
              </label>
              <Link
                data-toggle="modal"
                data-target="#myModal"
                className="float-right"
                style={{ marginRight: '30px' }}
              >
                Forgot Password?
              </Link>
            </div>
            <br />
            <p className="text-center small" id="signup">
              Don't have an account?&nbsp;
              <Link id="signnup" to="/spsignup">
                Sign up here!
              </Link>
            </p>
          </form>
        </div>
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
        <div
          class="modal fade"
          id="myModal"
          role="dialog"
          style={{ marginTop: '200px' }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4
                  class="modal-title"
                  style={{ marginLeft: '20px', color: 'red' }}
                >
                  We will send you a recovery link
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div id="box" style={{ marginLeft: '20px', width: '460px' }}>
                  <form
                    onSubmit={this.handleSubmit}
                    action="/forgot"
                    method="POST"
                  >
                    <label
                      for="email"
                      id="labels"
                      style={{ color: 'black', width: '250px' }}
                    >
                      Enter your email:
                    </label>
                    <input
                      type="email"
                      id="signup_Input"
                      autocomplete="off"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      style={{ width: '300px', float: 'left' }}
                      onChange={(e) => (this.email = e.target.value)}
                      required="required"
                    />
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{
                        float: 'left',
                        width: '140px',
                        marginLeft: '10px',
                      }}
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SpSignIn);
