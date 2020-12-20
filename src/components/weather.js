import React, { Component } from 'react';
import '../componentcss/weather.css';
import WeatherBox from '../components/weatherBox';
import SearchIcon from '@material-ui/icons/Search';
class Weather extends Component {
  componentDidMount() {
    const google = window.google;
    var inputplace = document.getElementById('placeinput');
    var options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputplace, options);
  }
  render() {
    return (
      <div className="backimg">
        <h3>Weather Updates</h3>
        <form
          onSubmit={this.props.getWeather}
          className="input_fieldboxx"
          style={{ marginTop: '100px' }}
        >
          <input
            type="text"
            autocomplete="off"
            name="city"
            placeholder="Location name?"
            className="location-weather-input "
            onChange={(e) => this.setState({ cityName: e.target.value })}
            required="required"
            id="placeinput"
          />
          <button className="weatherbtn" type="submit">
            <SearchIcon
              style={{
                position: 'absolute',
                fontSize: 25,
                color: 'black',
                marginLeft: '-30px',
                marginTop: '2px',
              }}
            />
            Forecast
          </button>
        </form>
        <WeatherBox
          weather={this.props.weather}
          city={this.props.city}
          country={this.props.country}
          error={this.props.error}
        />
      </div>
    );
  }
}

export default Weather;
