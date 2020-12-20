import React, { Component } from 'react';
import Header from '../components/header';
import Slider from '../components/slider';
import Footer from '../components/footer';
import Search from '../components/search';
import Popular from '../components/popularDes';
import Video from '../components/video';

class home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Search />
        <Slider />
        <Popular />
        <Video />
        <Footer />
      </div>
    );
  }
}
export default home;
