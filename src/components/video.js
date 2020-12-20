import React, { Component } from 'react';
import ReactPlayer from 'react-player';
class video extends Component {
  render() {
    return (
      <div className="section_title text-center mb_70">
        <h3 id="videoheading">Welcome to Pakistan</h3>

        <ReactPlayer
          className="video"
          width="60%"
          height="100"
          url="https://www.youtube.com/watch?v=DHnHpHkwqs4&t=7s"
        />

        <div>
          <div className="travel_variation_area">
            <div className="section_title text-center mb_70">
              <h3 id="popularheading">Our Services</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single_travel text-center">
                    <div className="icon">
                      <img src="/assets/img/svg_icon/traveler.png" alt="" />
                    </div>
                    <h3>Comfortable Journey</h3>
                    <p>
                      <strong>
                        A long journey is predicted for you, begin it with a
                        single step.
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_travel text-center">
                    <div className="icon">
                      <img src="/assets/img/svg_icon/hotel.png" alt="" />
                    </div>
                    <h3>Luxuries Hotel</h3>
                    <p>
                      <strong>
                        Enjoy all the luxurious hotels with a lovely relaxed
                        atmosphere .
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single_travel text-center">
                    <div className="icon">
                      <img src="/assets/img/svg_icon/compass.png" alt="" />
                    </div>
                    <h3>Travel Guide</h3>
                    <p>
                      <strong>
                        Tour recommeded by a leading travel guide, to make the
                        it more exciting.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default video;
