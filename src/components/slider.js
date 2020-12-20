import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const photos = [
  {
    name: 'Chitral',
    alt: 'Chitral',
    source: '/assets/img/banner/new.jpg',
  },

  {
    name: 'Gilgit',
    alt: 'Gilgit',
    source: '/assets/img/banner/gilgitt.jpg',
  },

  {
    name: 'Swat',
    alt: 'Swat',
    source: '/assets/img/banner/swat.jpg',
  },
  {
    name: 'Skardu',
    alt: 'Skardu',
    source: '/assets/img/banner/skarduu.jpg',
  },
];

class slider extends Component {
  constructor() {
    super();
  }
  render() {
    const settings = {
      infinite: true,
      speed: 1,
      fade: true,
      autoplay: true,
      dots: false,
      variableWidth: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      className: 'slides',
    };
    return (
      <Slider {...settings}>
        {photos.map((photo) => {
          return (
            <div>
              <img width="100%" src={photo.source} alt={photo.alt} />
              <div className="slider_text text-center" id="slider_details">
                <h3 id="span1">{photo.name}</h3>
                <p id="span2">PLAN YOUR NEXT TRIP WITH US</p>
                <div
                  className="plan_btn "
                  id="plantrip_btn"
                  style={{ height: '20px', opacity: '0.9' }}
                >
                  <Link to="/login" className="boxed-btn3" id="btn_plan">
                    <span
                      class="material-icons"
                      id="plan_triplogo"
                      style={{ textAlign: 'center', fontSize: '30px' }}
                    >
                      explore
                    </span>{' '}
                    <br />
                    Make my trip
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default slider;
