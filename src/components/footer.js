import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class footer extends Component {
  gotoInstagram(){ 
    window.location.href='https://www.instagram.com/i_tourcompanion/';
  }
  gotoFacebook(){
    window.location.href='https://web.facebook.com/Itourcompanion';
  }
  gotoTwitter(){ 
    window.location.href='https://twitter.com/itourcompanion';
  }

  render() {
    return (
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-4 ">
                <div className="footer_widget">
                  <div className="footer_logo">
                    <Link to="/">
                      <img src="img/footer_logo.png" alt="" />
                    </Link>
                  </div>
                  <div>
                    <p id="unitag">
                      A Final Year Project of <br /> COMSATS University,
                      Islamabad. <br />
                    </p>
                    <a href="wwww.gmail.com">itourcompanion@gmail.com</a>
                  </div>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <Link onClick={this.gotoFacebook}>
                          <i className="ti-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link onClick={this.gotoTwitter}>
                          <i className="ti-twitter-alt" />
                        </Link>
                      </li>
                      <li>
                        <Link onClick={this.gotoInstagram}>
                          <i className="fa fa-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget">
                  <h3 className="footer_title">Company</h3>
                  <ul className="links">
                    <li>
                      <Link to="/about">Our Services</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/findweather">Find Weather</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Popular destination</h3>
                  <ul className="links double_links">
                    <li>
                      <Link to="/destinations">Neelum Valley</Link>
                    </li>
                    <li>
                      <Link to="/destinations">Hunza</Link>
                    </li>
                    <li>
                      <Link to="/destinations">Swat valley</Link>
                    </li>
                    <li>
                      <Link to="/destinations">Kaghan valley</Link>
                    </li>
                    <li>
                      <Link to="/destinations">Murree</Link>
                    </li>
                    <li>
                      <Link to="/destinations">Shandur Pass</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border" />
            <div className="row">
              <div className="col-xl-12">
                <p className="copy_right text-center">
                  Copyright © All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default footer;
