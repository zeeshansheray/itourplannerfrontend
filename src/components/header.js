import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import '../componentcss/headers.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';




export default class headers extends Component {
  gotoInstagram(){ 
    window.location.href='https://www.instagram.com/i_tourcompanion/';
  }
  goToFacebook(){
    window.location.href='https://web.facebook.com/Itourcompanion';
  }
  gotoTwitter(){ 
    window.location.href='https://twitter.com/itourcompanion';
  }
  render() {
    return (
      <Navbar className="navbar" scrolling bg="white" expand="lg" fixed="top">
        <div className="logo" style={{
          marginRight: '100px',
          marginBottom: '-15px',
          marginTop: '10px',
          height: '100px'
        }}>
          <Link to="/">
            <img src="/assets/img/logo.png" alt="Tour Planner" />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" id="navitems">
            <Link id="links" to="/">Home</Link>
            <Link id="links" to="/destinations">Destinations</Link>
            <Link id="links" to="/contact">Contact Us</Link>
            <Link id="links" to="/about">Services</Link>
            <Link id="links" to="/findweather">Weather</Link>
          </Nav>
          <div className="number" >
            <p>
              <i className="fa fa-phone"></i> +92 333 3376949
                      </p>
          </div>
          <FacebookIcon id="social" onClick={this.goToFacebook} style={{ marginRight: '10px' }} color="primary" />
          <InstagramIcon id="social"  onClick={this.gotoInstagram} style={{ marginRight: '10px' }} color="secondary" />
          <TwitterIcon id="social"  onClick={this.gotoTwitter} style={{ marginRight: '10px' }} color="primary" />
          <div className="search_icon">
            <Link
              to="#"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <SearchIcon id="searchicon" style={{ fontSize: 35, color: 'white', marginTop: '35px' }} />

            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>

    )
  }
}
