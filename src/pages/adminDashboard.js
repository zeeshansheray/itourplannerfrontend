import React, { Component } from 'react';
import AdminDashboard from '../components/adminprofile';
import axios from 'axios';
import { Loading } from '../components/LoadingComponent';
class admindashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .post('http://localhost:3000/users/login', {
        username: localStorage.getItem('AdminName'),
        password: localStorage.getItem('AdminPass'),
      })
      .then((res) => {
        if (res.data.user.admin === true) {
          this.setState({ loading: false });
          localStorage.setItem('token', res.data.token);
          console.log('Logged in');
        } else {
          console.log('failed');
          window.location.href = '/itc_admin';
        }
      })
      .catch((err) => {
        console.log('failed');
        window.location.href = '/itc_admin';
      });
  }
  render() {
    if (this.state.loading)
      return (
        <div>
          <Loading />
        </div>
      );
    return (
      <div className="wrapper">
        <AdminDashboard admin={this.props.admin} />
      </div>
    );
  }
}
export default admindashboard;
