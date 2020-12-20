import React, { Component } from 'react'
import '../componentcss/topplaces.css';
import Header from '../components/header';
export default class topplaces extends Component {
    render() {
        return (
          <div>
          <Header/>
            <div className="popular_destination_area">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="section_title text-center mb_70">
                    <h3 className="heading" style={{fontWeight:'bold',fontSize:'45px'}}>Top Places of Pakistan</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/hunza.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Hunza
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/kalash.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Kalash Valley
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/Murree.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Murree Hills
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/Shandur.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Shandur Pass
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/Skardu.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Skardu
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb">
                      <img src="/assets/img/destination/Swat.jpg" alt="" />
                    </div>
                    <div className="content">
                      <p className="d-flex align-items-center">
                        Swat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
    }
}
