import React, { Component } from 'react';
import Findhotel from '../components/findHotel';
import Header from '../components/header';
import Footer from '../components/footer'; 
import Search from '../components/search';

class findhotel extends Component {
  render() {
    return (
      <div className="wrapper">
       <Header/> 
       <Search/>
       <Findhotel/>
       <Footer/>
      </div>
    );
  }
}
export default findhotel;