import React, { Component } from 'react';
import Header from '../components/header';
import Signup from '../components/signup';
import Footer from '../components/footer';
import Search from '../components/search';
class login extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Search />
        <Signup {...this.props} />
        <Footer />
      </div>
    );
  }
}
export default login;
