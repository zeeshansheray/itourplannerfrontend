import React from 'react';
import { Carousel } from 'antd';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
function RenderWeather({ Weather, city, country, error }) {
  if (Weather != null && error === '') {
    return (
      <div className="weatherbox">
        <Carousel effect="fade">
          {Weather.map((weather) => {
            return (
              <div>
                <h2 id="day">
                  {weekday[new Date(Date.parse(weather.dt_txt)).getDay()]}
                </h2>
                <h2 id="date">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(Date.parse(weather.dt_txt)))}
                </h2>
                <h1 id="temp">{Math.round(weather.main.temp)}°</h1>
                <h2 id="place">
                  {city}, {country}
                </h2>
                <h2 id="detail">{weather.weather[0].description}</h2>
                <h2 id="icon">
                  <img
                    alt="Weather icon"
                    src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  />
                </h2>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const weatherBox = (props) => {
  if (props.weather != null && props.error === '') {
    return (
      <div>
        <RenderWeather
          Weather={props.weather}
          city={props.city}
          country={props.country}
          error={props.error}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default weatherBox;
