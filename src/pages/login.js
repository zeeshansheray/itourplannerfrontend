import React, { Component } from 'react';
import Header from '../components/header';
import Signin from '../components/signin';
import Search from '../components/search';
import Footer from '../components/footer';
class Login extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Search />
        <Signin user={this.props.user} setUser={this.props.setUser} />
        <Footer />
      </div>
    );
  }
}
export default Login;
