import React, { Component } from 'react';
import Header from '../components/header';
import UserView from '../components/userView';
import Search from '../components/search';
import axios from 'axios';
import '../App.css';
import { Loading } from '../components/LoadingComponent';

class userDashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .post('http://localhost:3000/users/login', {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      })
      .then((res) => {
        if (res.data.admin === false) {
          this.setState({ loading: false });
          localStorage.setItem('token', res.data.token);
        } else {
          window.location.href = '/login';
        }
      })
      .catch((err) => {
        window.location.href = '/login';
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
        <Header />
        <Search />
        <UserView user={this.props.user} />
      </div>
    );
  }
}

export default userDashboard;
