import React, { Component } from 'react';
import Header from '../components/header';
import SpView from '../components/spView';
import Search from '../components/search';
import axios from 'axios';
import '../App.css';
import { Loading } from '../components/LoadingComponent';

class SpDashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .post('http://localhost:3000/users/login', {
        username: localStorage.getItem('spusername'),
        password: localStorage.getItem('sppassword'),
      })
      .then((res) => {
        if (res.data.admin === false) {
          this.setState({ loading: false });
          localStorage.setItem('token', res.data.token);
        } else {
          window.location.href = '/spsignin';
        }
      })
      .catch((err) => {
        window.location.href = '/spsignin';
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
        <SpView user={this.props.user} />
      </div>
    );
  }
}

export default SpDashboard;
