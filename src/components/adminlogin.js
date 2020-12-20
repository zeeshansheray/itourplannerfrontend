import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loader from '../images/loading-circle-blue.svg';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/LoginView.css';
import { ToastContainer, toast } from 'react-toastify';
class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      errEmail: false,
      errPass: false,
      loading: false,
      username: localStorage.getItem('AdminName'),
      password: localStorage.getItem('AdminPass'),
      checkbox: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
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
      .post('http://localhost:3000/users/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.admin === true) {
          console.log(res.data);
          toast.success('Logged In Successfully');
          this.setState({ loading: false });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('AdminName', this.state.username);
          localStorage.setItem('AdminPass', this.state.password);
          window.location.href = '/admin_dashboard';
          if (this.state.checkbox === true) {
            localStorage.setItem('AdminName', this.state.username);
            localStorage.setItem('AdminPass', this.state.password);
          }
        } else {
          toast.error('Invalid Credentials');
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        toast.error('Enter Correct Credentials');
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div id="a_Box">
        <div className="login-form">
          <form onSubmit={this.onSubmit} id="a_form">
            <div className="avatar">
              <img id="a_img" src="/assets/img/admin.png" alt="Avatar" />
            </div>
            <h2 className="text-center" id="a_txt">
              Admin Login
            </h2>
            <div className="form-group">
              <input
                type="name"
                className="form-control"
                name="username"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
                placeholder="Username"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
                value={this.state.password}
                required="required"
              />
            </div>
            <div className="form-group">
              <button
                loader={loader}
                loading={this.state.loading}
                type="submit"
                className="btn btn-dark btn-lg btn-block"
                style={{ color: 'black' }}
              >
                Sign in
              </button>
            </div>
            <div className="bottom-action clearfix">
              <label className="float-left form-check-label">
                <input
                  type="checkbox"
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
              >
                Forgot Password?
              </Link>
            </div>
            <br />
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
                <div id="box" style={{ marginLeft: '20px', width: '400px' }}>
                  <label for="email" id="labels" style={{ color: 'black' }}>
                    Enter your email:
                  </label>
                  <input
                    type="email"
                    id="signup_Input"
                    autocomplete="off"
                    className="form-control"
                    name="email"
                    placeholder="Email
            "
                    style={{ width: '300px', float: 'left' }}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required="required"
                  />
                  <button
                    type="button"
                    class="btn btn-dark"
                    style={{ float: 'left', width: '80px', marginLeft: '10px' }}
                  >
                    Recieve
                  </button>
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
export default AdminLogin;
