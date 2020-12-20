import React, { Component } from 'react';
import About from '../components/about';
import Search from '../components/search';
import Header from '../components/header';
import Footer from '../components/footer';


class about extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Search/>
        <About/>
        <Footer/>
      </div>
    );
  }
}
export default about;
