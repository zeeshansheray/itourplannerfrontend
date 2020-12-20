import React, { Component } from 'react';
import FindGuide from '../components/tourguides';
import Header from '../components/header';
import Footer from '../components/footer'; 
import Search from '../components/search';

class findhotel extends Component {
  render() {
    return (
      <div className="wrapper">
       <Header/> 
       <Search/>
       <FindGuide/>
       <Footer/>
      </div>
    );
  }
}
export default findhotel;