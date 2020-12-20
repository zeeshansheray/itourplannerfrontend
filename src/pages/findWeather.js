import React, { Component } from 'react';
import Weather from '../components/weather';
import Header from '../components/header';
import Search from '../components/search';
import Footer from '../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '9e0fc0914939c270f35d7f2fda6bf08e';

export class findWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: undefined,
      MinTemp: undefined,
      MaxTemp: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: undefined,
      error: undefined,
      loading: false,
    };
    this.getWeather = this.getWeather.bind(this);
  }
  getWeather = async (e) => {
    e.preventDefault();
    var valid = true;
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (!valid) {
      this.setState({ loading: false });
      return;
    }
    const city = e.target.elements.city.value;
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},pk&appid=${API_KEY}&units=metric`
    );
    const data = await api_url.json();
    if (city && data.cod === '200') {
      this.setState({ loading: false });
      console.log(data);
      let weatherByDate = [];
      let weatherByTime = [];
      let dates = new Set(data.list.map((data) => data.dt_txt.slice(0, 10)));
      dates.forEach((element) => {
        let obj = {};
        obj.date = element;
        obj.data = data.list.filter((lis) => lis.dt_txt.includes(element));
        weatherByDate.push(obj);
      });
      this.setState({
        weatherByDate: weatherByDate,
        city: data.city.name,
        country: data.city.country,
        error: '',
      });
      console.log(weatherByDate);
      let times = weatherByDate.map((data) => data.data[3 % data.data.length]);
      times.forEach((element) => {
        let obj = {};
        obj = element;
        weatherByTime.push(obj);
      });
      this.setState({
        weatherByTime: times,
        error: '',
      });
      console.log(weatherByTime);
    } else {
      toast.error(
        'Location Not found, enter the name of cities only'
      );
      this.setState({ loading: false });
      this.setState({
        weatherByDate: undefined,
        weatherByTime: undefined,
        error:
        'Location Not found, enter the name of cities only',
      });
    }
  };
  render() {
    return (
      <div>
        <Header />
        <Search />
        <Weather
          getWeather={this.getWeather}
          city={this.state.city}
          country={this.state.country}
          weather={this.state.weatherByTime}
          error={this.state.error}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer/>
      </div>
    );
  }
}

export default findWeather;
