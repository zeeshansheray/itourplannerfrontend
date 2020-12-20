import React, { Component } from 'react';
import Header from '../components/header';
import Signup from '../components/spSignup';
import Footer from '../components/footer';
import Search from '../components/search';

export class spRegister extends Component {
  render() {
    return (
      <div>
        <Header />
        <Search />
        <Signup {...this.props} />
        <Footer />
      </div>
    );
  }
}
export default spRegister;
