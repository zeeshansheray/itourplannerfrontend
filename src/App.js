import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import SpRegister from './pages/spRegister';
import UserDashboard from './pages/userDashboard';
import SpDashboard from './pages/spDashboard';
import SpLogin from './pages/spLogin';
import AdminLogin from './pages/adminLog';
import AdminDashboard from './pages/adminDashboard';
import WeatherCheck from './pages/findWeather';
import About from './pages/about';
import Contact from './pages/contact';
import Forgot from './components/forgot';
import SearchGuide from './components/tourguides';
import Destination from './pages/topDestination';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const history = createBrowserHistory();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, admin: {}, adminAuth: false, authenticate: false };
  }
  componentDidMount = () => {
    axios
      .get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.admin === false) {
          this.setState({
            user: res.data,
            authenticate: true,
            adminAuth: res.data.admin,
          });
        } else {
          this.setState({
            admin: res.data,
            adminAuth: res.data.admin,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setUser = (user) => this.setState({ user: user });
  setAdmin = (admin) => this.setState({ admin: admin });
  render() {
    return (
      <div className="wrapper">
        <BrowserRouter history={history}>
          <Switch>
            <Redirect from="/" exact to="/landing"></Redirect>
            <Redirect from="/landingpage" to="/landing" />
            <Route exact path="/landing" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/spsignin" component={SpLogin} />
            <Route exact path="/spsignup" component={SpRegister} />
            <Route exact path="/itc_admin" component={AdminLogin} />
            <Route
              exact
              path="/sp_dashboard"
              render={(props) => (
                <SpDashboard user={this.state.user} {...props} />
              )}
            />
            <Route
              exact
              path="/user_dashboard"
              render={(props) => (
                <UserDashboard user={this.state.user} {...props} />
              )}
            />
            <Route
              exact
              path="/admin_dashboard"
              render={(props) => (
                <AdminDashboard admin={this.state.admin} {...props} />
              )}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/destinations" component={Destination} />
            <Route exact path="/findWeather" component={WeatherCheck} />
            <Route exact path="/about" component={About} />
            <Route exact path="/searchguide" component={SearchGuide} />
            <Redirect from="/" to="/landing" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
