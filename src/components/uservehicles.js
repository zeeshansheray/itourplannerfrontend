import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Notfound from './Notfound';
import { ToastContainer, toast } from 'react-toastify';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import '../componentcss/transport.css';
import { Switch } from 'antd';
import { Loading } from './LoadingComponent';

export default class uservehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      fetchData: [],
      found: false,
      companyname: '',
      modelyear: '',
      perDayCostWithoutDriver: '',
      perDayCostWithDriver: '',
      vehicleregno: '',
      modelname: '',
      file: '',
      vehicleId: '',
      vehicleAvailabe: true,
      loading: true,
    };
    this.viewVehicles = this.viewVehicles.bind(this);
    this.onChangeCompanyname = this.onChangeCompanyname.bind(this);
    this.onChangeModelName = this.onChangeModelName.bind(this);
    this.onChangeModelYear = this.onChangeModelYear.bind(this);
    this.onChangeperDayCostWithoutDriver = this.onChangeperDayCostWithoutDriver.bind(
      this
    );
    this.onChangeperDayCostWithDriver = this.onChangeperDayCostWithDriver.bind(
      this
    );

    this.onChangeRegno = this.onChangeRegno.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeFile(e) {
    let file = e.target.files[0];
    console.log(file);
    this.toBase64(file)
      .then((base) => this.setState({ file: base }))
      .catch((err) => console.error(err));
  }
  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  onChangeColor(e) {
    this.setState({ color: e.target.value });
  }
  onChangeRegno(e) {
    this.setState({ vehicleregno: e.target.value });
  }

  onChangeModelYear(e) {
    this.setState({ modelyear: e.target.value });
  }
  onChangeModelName(e) {
    this.setState({ modelname: e.target.value });
  }
  onChangeCompanyname(e) {
    this.setState({ companyname: e.target.value });
  }
  async viewVehicles() {
    await axios
      .get('http://localhost:3000/users/transportdetails')
      .then((res) => {
        if (res.data[0].vehicles !== '' || res.data[0].vehicles.length > 0) {
          this.setState({
            fetchData: res.data[0].vehicles,
            found: true,
            loading: false,
          });
        } else {
          this.setState({
            found: false,
            loading: false,
          });
        }
        console.log('found is ' + this.state.found);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeperDayCostWithoutDriver(e) {
    this.setState({
      perDayCostWithoutDriver: e.target.value,
    });
  }
  onChangeperDayCostWithDriver(e) {
    this.setState({
      perDayCostWithDriver: e.target.value,
    });
  }
  onChangeAvailable(available, vehicleid) {
    window.alert('You are about to change your car availibility.');
    this.state.vehicleAvailabe = !available;
    const vehicleObject = {
      available: this.state.vehicleAvailabe,
      vehicleId: vehicleid,
    };
    axios
      .post('http://localhost:3000/users/vehicleisavailable', vehicleObject)
      .then((res) => {
        if (vehicleObject.available) {
          toast.success('Vehicle is now available for users.');
        } else {
          toast.warning('Vehicle is not available for users');
        }
        this.viewVehicles();
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });
  }

  componentDidMount() {
    this.viewVehicles();
  }

  onSubmit(e) {
    e.preventDefault();
    const vehicleObject = {
      companyname: this.state.companyname,
      priceWithDriver: this.state.perDayCostWithDriver,
      priceWithoutDriver: this.state.perDayCostWithoutDriver,
      modelyear: this.state.modelyear,
      vehiclereg: this.state.vehicleregno,
      modelname: this.state.modelname,
      image: this.state.file,
      vehicleId: this.state.vehicleId,
    };
    axios
      .post('http://localhost:3000/users/editvehicledetails', vehicleObject)
      .then((res) => {
        toast.success('Changes have been saved sucessfully.');
        this.viewVehicles();
      })
      .catch((error) => {
        toast.error('Cannot Proceed your request. Try a later.');
      });
  }

  editVehicle = (vehicleid) => {
    this.setState({
      vehicleId: vehicleid,
    });
  };

  deleteVehicle = (vehicleid) => {
    axios
      .delete(`http://localhost:3000/users/deletevehicle/` + vehicleid)
      .then((response) => {
        console.log('delete req is sent');
        var confirm = window.confirm(
          'Are you sure, you want to remove this vehicle'
        );
        if (confirm) {
          if (response.data != null) {
            this.setState({
              upers: this.state.fetchData.filter(
                (vehicle) => vehicle._id !== vehicleid
              ),
            });
            this.viewVehicles();
            toast.success('Vehicle have been removed sucessfully.');
          } else {
            toast.error('Sorry! We cannot process your request.');
          }
        }
      });
  };

  render() {
    if (this.state.loading)
      return (
        <div>
          <Loading />
        </div>
      );
    return (
      <div
        className="canvastransport"
        id="transportId"
        style={{ marginLeft: '-20px', backgroundColor: 'white' }}
      >
        <h3 style={{ fontFamily: 'Titillium Web', backgroundColor:'white' }}>View Vehicles</h3>
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
        {/* Card Light */}
        {console.log('now found is ' + this.state.found)}
        {this.state.found ? (
          <div
            className="allVehicles"
            id="content"
            style={{ marginTop: '140px', marginLeft: '100px' }}
          >
            {this.state.fetchData.map((vehicle) => (
              <div
                className="card"
                style={{
                  width: '300px',
                  height: '460px',
                  float: 'left',
                  marginRight: '30px',
                  marginBottom: '20px',
                }}
              >
                {/* Card image */}

                <div
                  className="view overlay"
                  style={{ display: 'inline-block' }}
                >
                  <img
                    className="card-img-top"
                    src={vehicle.image}
                    alt="Card image cap"
                    style={{ width: '298px', height: '180px' }}
                  />
                  <a>
                    <div className="mask rgba-white-slight" />
                  </a>
                </div>
                <div className="card-body">
                  <a className="activator waves-effect waves-light mr-4"></a>
                  <h4
                    className="card-title"
                    style={{ textTransform: 'capitalize' }}
                  >
                    <DirectionsCarIcon
                      style={{ verticalAlign: '-7px', fontSize: '30px' }}
                    />
                    &nbsp;&nbsp;{vehicle.modelname}
                    <span style={{ float: 'right' }}>
                      <EditIcon
                        id="transiconsedit"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={this.editVehicle.bind(this, vehicle._id)}
                        style={{
                          marginRight: '5px',
                          verticalAlign: '-10px',
                          fontSize: '20px',
                        }}
                      />
                      <DeleteIcon
                        id="transiconsdelete"
                        onClick={this.deleteVehicle.bind(this, vehicle._id)}
                        style={{ verticalAlign: '-10px', fontSize: '20px' }}
                      />
                    </span>
                  </h4>
                  <hr />
                  <p
                    className="card-text"
                    style={{ color: 'black', textTransform: 'capitalize' }}
                  >
                    <strong>Comapny Name: </strong> {vehicle.companyname}{' '}
                    <br></br>
                    <strong>Reg Number:</strong> {vehicle.vehiclereg} <br></br>
                    <strong>Model Year:</strong> {vehicle.modelyear}
                    <br></br>
                    <strong>
                      Rent&nbsp;
                      <i style={{ fontSize: '12px' }}>
                        (Per Day include driver)
                      </i>
                      &nbsp;:{' '}
                    </strong>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      {vehicle.priceWithDriver}Rs
                    </span>
                    <br />
                    <strong>
                      Rent&nbsp;<i style={{ fontSize: '12px' }}>(Per Day)</i>
                      &nbsp;:{' '}
                    </strong>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                      {vehicle.priceWithoutDriver}Rs
                    </span>
                    <br></br>
                    <strong>Available: &nbsp; </strong>
                    <Switch
                      size="small"
                      defaultChecked={vehicle.available}
                      onChange={this.onChangeAvailable.bind(
                        this,
                        vehicle.available,
                        vehicle._id
                      )}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div id="notfound">
              <Notfound
                message="No vehicles found!"
                style={{ position: 'absolute', top: '40%', left: '43%' }}
                sidemessage="Want to add up your business?"
                detail={[
                  'Go to ',
                  <strong>Provides Services </strong>,
                  'and add up your own vehicles to earn.',
                ]}
              />
            </div>
          )}
        <div
          class="modal fade"
          id="myModal"
          role="dialog"
          style={{ marginTop: '200px' }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4
                  class="modal-title"
                  style={{ marginLeft: '20px', color: 'red', fontSize: '25px' }}
                >
                  Vehicle Update:
                </h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div id="box" style={{ marginLeft: '20px', width: '460px' }}>
                  <form onSubmit={this.onSubmit}>
                    <div id="box">
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Company:
                      </label>
                      <input
                        type="text"
                        // autocomplete="off"
                        name="regnumber"
                        value={this.state.companyname}
                        id="regnumber"
                        onChange={this.onChangeCompanyname}
                        placeholder="Company Name"
                        required="required"
                        className="form-control"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div id="box" style={{ marginLeft: '20px' }}>
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Model Name:
                      </label>
                      <input
                        type="text"
                        // autocomplete="off"
                        name="regnumber"
                        value={this.state.modelname}
                        id="modelname"
                        onChange={this.onChangeModelName}
                        placeholder="Model Name"
                        required="required"
                        className="form-control"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div id="box">
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Reg Number:
                      </label>
                      <input
                        type="text"
                        // autocomplete="off"
                        name="regnumber"
                        value={this.state.vehicleregno}
                        id="regnumber"
                        onChange={this.onChangeRegno}
                        placeholder="Reg Number"
                        required="required"
                        className="form-control"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div id="box" style={{ marginLeft: '20px' }}>
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Rent with driver
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="rent"
                        value={this.state.perDayCostWithDriver}
                        placeholder="Price in PKR"
                        required="required"
                        id="color"
                        onChange={this.onChangeperDayCostWithDriver}
                        style={{ width: '150px' }}
                      />
                    </div>
                    <div id="box">
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Model Year:
                      </label>
                      <input
                        type="text"
                        // autocomplete="off"
                        name="regnumber"
                        value={this.state.modelyear}
                        id="regnumber"
                        onChange={this.onChangeModelYear}
                        placeholder="Model Year"
                        required="required"
                        className="form-control"
                        style={{ width: '200px' }}
                      />
                    </div>
                    <div id="box" style={{ marginLeft: '20px' }}>
                      <label
                        id="labels"
                        style={{ textAlign: 'left', color: 'black' }}
                      >
                        Rent w/o driver
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="rent"
                        value={this.state.perDayCostWithoutDriver}
                        placeholder="Price in PKR"
                        required="required"
                        id="color"
                        onChange={this.onChangeperDayCostWithoutDriver}
                        style={{ width: '150px' }}
                      />
                    </div>
                    <div
                      id="box"
                      style={{ marginLeft: '20px', color: 'black' }}
                    >
                      <label id="labels" style={{ textAlign: 'left' }}>
                        Picture upload:
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        required="required"
                        className="form-control"
                        accept="image/*"
                        style={{ width: '200px', fontSize: '12px' }}
                        onChange={this.onChangeFile}
                      />
                      {console.log(this.state.file)}
                    </div>

                    <div
                      className="subcan"
                      style={{ float: 'right', marginRight: '10px' }}
                    >
                      <button
                        type="submit"
                        id="submitbtn"
                        data-dismiss="modal"
                        style={{
                          width: '70px',
                          height: '40px',
                          fontSize: '15px',
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        id="cancelbtn"
                        data-dismiss="modal"
                        style={{
                          width: '70px',
                          height: '40px',
                          fontSize: '15px',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
