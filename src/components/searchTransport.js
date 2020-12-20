/*global google*/
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import '../componentcss/transport.css';
import Notfound from './Notfound';
import '../componentcss/searchtransport.css';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export default class searchTransport extends Component {
  constructor() {
    super();
    this.input = React.createRef();
    this.state = {
      vehicles: [],
      found: false,
    };
    this.searchTransport = this.searchTransport.bind(this);
  }

  async searchTransport(e) {
    e.preventDefault();
    const location = {
      city: this.input.current.value.toLowerCase(),
    };
    console.log('location is ' + this.input.current.value);
    await axios
      .get(
        'http://localhost:3000/users/searchtransport/',
        this.input.current.value.toLowerCase()
      )
      .then((res) => {
        console.log(res.data);
        if (res.data != '' && res.data[0].vehicles.length > 0) {
          this.setState({
            vehicles: res.data,
            found: true,
          });
        } else {
          this.setState({
            found: false,
          });
        }
        console.log('found id ' + this.state.found);
        document.getElementById('display').style.visibility = 'visible';
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });
  }

  componentDidMount() {
    var inputori = document.getElementById('address');
    var options = {
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
  }
  render() {
    // document.getElementById('notfound').style.visibility='hidden';
    return (
      <div className="canvastransport" id="transportId">
        <h3 style={{ fontFamily: 'Titillium Web' }}>Search Transport</h3>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <form className="outlineboxhotel" onSubmit={this.searchTransport}>
          <input
            id="address"
            type="text"
            className="location-search-input"
            name="address"
            placeholder="Enter a location?"
            required="required"
            autoComplete="true"
            ref={this.input}
            style={{ color: 'black', border: 'solid 1px #001529' }}
          />
          <button className="searchHotel" id="search " type="submit">
            {/* {loading && <i className="fa fa-refresh fa-spin"></i>} */}
            &nbsp;&nbsp;Search
          </button>
        </form>
        <div id="display" style={{ visibility: 'hidden' }}>
          {this.state.found ? (
            <div
              className="allVehicles"
              id="content"
              style={{
                marginTop: ' 240px',
                marginLeft: '100px',
                display: 'table',
                clear: 'both',
                content: '',
              }}
            >
              {this.state.vehicles.map((user) => (
                <div>
                  {/* Card image */}
                  {user.vehicles.map((vehicle) => (
                    <div
                      className="card"
                      style={{
                        width: '300px',
                        height: '450px',
                        float: 'left',
                        marginRight: '20px',
                        marginBottom: '20px',
                      }}
                    >
                      <div
                        className="view overlay"
                        style={{ display: 'inline-block' }}
                      >
                        <img
                          className="card-img-top"
                          src={vehicle.image}
                          alt="Card image cap"
                          style={{ width: '298px', height: '200px' }}
                        />
                        <a>
                          <div className="mask rgba-white-slight" />
                        </a>
                      </div>
                      <div className="card-body">
                        <a className="activator waves-   effect waves-light mr-4"></a>
                        <h4
                          className="card-title"
                          style={{ marginTop: '-30px' }}
                        >
                          <DirectionsCarIcon
                            style={{ verticalAlign: '-7px', fontSize: '30px' }}
                          />
                          &nbsp;&nbsp;{vehicle.modelname}
                        </h4>
                        <hr />
                        <p
                          className="card-text"
                          style={{ marginTop: '-30px' }}
                          style={{
                            color: 'black',
                            textTransform: 'capitalize',
                          }}
                        >
                          <strong>Comapny Name: </strong> {vehicle.companyname}
                          <br></br>
                          <strong>Reg Number:</strong> {vehicle.vehiclereg}
                          <br></br>
                          <strong>Model Year:</strong> {vehicle.modelyear}
                          <br></br>
                          <strong>Color: </strong>
                          {vehicle.color}
                          <strong>
                            <br></br>Phone:
                          </strong>
                          {user.phone}
                          <br></br>
                          <strong>Available:</strong>&nbsp;&nbsp;
                          {vehicle.available ? (
                            <CheckCircleIcon
                              style={{
                                fontSize: '20px',
                                verticalAlign: '-5px',
                                color: 'green',
                              }}
                            />
                          ) : (
                            <CancelIcon
                              style={{
                                fontSize: '20px',
                                verticalAlign: '-4px',
                                color: 'red',
                              }}
                            />
                          )}
                          <br></br>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div id="notfound">
              <Notfound
                style={{ marginTop: '170px' }}
                message="No vehicles found!"
                detail="Search vehicles in other places nearby"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
