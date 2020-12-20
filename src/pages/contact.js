import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer'; 
import Contact from '../components/contact';
import Search from '../components/search';
class contact extends Component {
  render() {
    return (
      <div className="wrapper">
       <Header/>    
       <Search/>
       <Contact/>
       <Footer/>
      </div>
    );
  }
}
export default contact;