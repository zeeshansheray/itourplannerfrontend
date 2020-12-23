import React, { Component } from 'react';
import '../componentcss/Selecttripvehicles.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CommuteIcon from '@material-ui/icons/Commute';
import CheckIcon from '@material-ui/icons/Check';
import { Spin } from 'antd';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

export default class Manualselectvehicles extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      selectedVehicle: null,
      vehicles: [],
      disabled:false,
      fetchedData: false,
    };
  }

  // getVehicles() {
  // }
  componentDidMount() {
    axios.get(`http://localhost:3000/users/getTransport`).then((res) => {
      console.log(JSON.stringify(res.data));
      this.setState({
        vehicles: res.data.results,
        fetchedData: true,
      })
    });
  }

  onSelectVehicle = (vehicle) => {
    console.log('I am running')
    console.log("Zee" + JSON.stringify(vehicle))
    localStorage.setItem('selectedVehicle', vehicle.price);
    this.setState ({
      disabled: true,
    })
  }

  handleChange = async (event, newValue) => {
    await this.setState({
      value: newValue,

    });
  };

  render() {
    return (
      <div style={{ marginTop: '1%', overflowY: 'hidden' }}>
        <div
          style={{
            flexGrow: 1,
            width: '50%',
            marginTop: '3%',
            marginLeft: '25%',
          }}
        >
          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="off"
              aria-label="scrollable prevent tabs example"
              style={{ backgroundColor: '#FF4500', width:'100%' }}
            >
              <Tab
                label="Economy"
                //icon={<DirectionsCarIcon style={{ color: 'white' }} />}
                {...a11yProps(0)}
              />
              <Tab
                label="Business"
                // icon={<DriveEtaIcon style={{ color: 'white' }} />}
                {...a11yProps(1)}
              />
              <Tab
                label="Luxury"
                //icon={<DriveEtaIcon style={{ color: 'white' }} />}
                {...a11yProps(2)}
              />
              <Tab
                label="Bus"
                //icon={<CommuteIcon style={{ color: 'white' }} />}
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
          {this.state.fetchedData ? <div className="overalldiv">
              <div className="cardcontainer">
                {this.state.vehicles.length > 0 &&
                  this.state.vehicles.map((vehicle) => {
                    return (
                      <div>
                        {vehicle.category === 'Budget' ? (
                          <div className="card" style={{ border: 'none' }}>
                            <div className="face face1" style={{ height: '150px' }}>
                              <div className="content">
                                <div className="icon" style={{ height: '150px' }}>
                                  <img
                                    src={vehicle.image}
                                    style={{ width: '300px', height: '170px' }}
                                  ></img>
                                </div>
                              </div>
                            </div>
                            <div className="face face2">
                              <div className="cardcontent">
                                <h4>{vehicle.name}</h4>
                                <ul>
                                  <li style={{fontSize:'14px'}}> <span style={{ color: 'black' }}>Capacity:</span> {vehicle.capacity} persons</li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day w/o driver & w/o fuel ):
                                    </i>
                                    &nbsp;{vehicle.price}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day with driver & No fuel ):
                                    </i>
                                     &nbsp;{vehicle.pricewithDriver}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Booking: </span>
                                     &nbsp;<a style={{color:'blue'}} href={"http://www.pakistanrentacar.com.pk/index.php?option=com_content&view=article&id=41&Itemid=171"}>Visit Website</a>
                                  </li>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={this.state.disabled}
                                    style={{ marginleft: '10%', marginTop: '1%' }}
                                    onClick={() => this.onSelectVehicle(vehicle)}
                                  >
                                    Select
                                  </Button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <></>
                          )}
                      </div>
                    );
                  })}
              </div>
            </div> : <Spin style={{marginTop:'10%', marginLeft:'45%'}} size="large"/> }
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            {this.state.fetchedData ? <div className="overalldiv">
              <div className="cardcontainer">
                {this.state.vehicles.length > 0 &&
                  this.state.vehicles.map((vehicle) => {
                    return (
                      <div>
                        {vehicle.category === 'Executive' ? (
                          <div className="card" style={{ border: 'none' }}>
                            <div className="face face1" style={{ height: '150px' }}>
                              <div className="content">
                                <div className="icon" style={{ height: '150px' }}>
                                  <img
                                    src={vehicle.image}
                                    style={{ width: '300px', height: '150px' }}
                                  ></img>
                                </div>
                              </div>
                            </div>
                            <div className="face face2">
                              <div className="cardcontent">
                                <h4>{vehicle.name}</h4>
                                <ul>
                                  <li style={{fontSize:'14px'}}> <span style={{ color: 'black' }}>Capacity:</span> {vehicle.capacity} persons</li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day w/o driver & w/o fuel ):
                                    </i>
                                    &nbsp;{vehicle.price}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day with driver & No fuel ):
                                    </i>
                                     &nbsp;{vehicle.pricewithDriver}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Booking: </span>
                                     &nbsp;<a style={{color:'blue'}} href={"http://www.pakistanrentacar.com.pk/index.php?option=com_content&view=article&id=41&Itemid=171"}>Visit Website</a>
                                  </li>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={this.state.disabled}
                                    style={{ marginleft: '10%', marginTop: '1%' }}
                                    onClick={() => this.onSelectVehicle(vehicle)}
                                  >
                                    Select
                                  </Button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div></div>
                          )}
                      </div>
                    );
                  })}
              </div>
            </div> : <Spin style={{marginTop:'10%', marginLeft:'45%'}} size="large"/> }
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            {this.state.fetchedData ? <div className="overalldiv">
              <div className="cardcontainer">
                {this.state.vehicles.length > 0 &&
                  this.state.vehicles.map((vehicle) => {
                    return (
                      <div>
                        {vehicle.category === 'Luxury' ? (
                          <div className="card" style={{ border: 'none' }}>
                            <div className="face face1" style={{ height: '150px' }}>
                              <div className="content">
                                <div className="icon" style={{ height: '150px' }}>
                                  <img
                                    src={vehicle.image}
                                    style={{ width: '300px', height: '150px' }}
                                  ></img>
                                </div>
                              </div>
                            </div>
                            <div className="face face2">
                              <div className="cardcontent">
                                <h4>{vehicle.name}</h4>
                                <ul>
                                  <li style={{fontSize:'14px'}}> <span style={{ color: 'black' }}>Capacity:</span> {vehicle.capacity} persons</li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day w/o driver & w/o fuel ):
                                    </i>
                                    &nbsp;{vehicle.price}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day with driver & No fuel ):
                                    </i>
                                     &nbsp;{vehicle.pricewithDriver}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Booking: </span>
                                     &nbsp;<a style={{color:'blue'}} href={"http://www.pakistanrentacar.com.pk/index.php?option=com_content&view=article&id=41&Itemid=171"}>Visit Website</a>
                                  </li>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={this.state.disabled}
                                    style={{ marginleft: '10%', marginTop: '1%' }}
                                    onClick={() => this.onSelectVehicle(vehicle)}
                                  >
                                    Select
                                  </Button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div></div>
                          )}
                      </div>
                    );
                  })}
              </div>
            </div> : <Spin style={{marginTop:'10%', marginLeft:'45%'}} size="large"/> }
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            {this.state.fetchedData ? <div className="overalldiv">
              <div className="cardcontainer">
                {this.state.vehicles.length > 0 &&
                  this.state.vehicles.map((vehicle) => {
                    return (
                      <div>
                        {vehicle.category === 'Busses & Vans' ? (
                          <div className="card" style={{ border: 'none' }}>
                            <div className="face face1" style={{ height: '150px' }}>
                              <div className="content">
                                <div className="icon" style={{ height: '150px' }}>
                                  <img
                                    src={vehicle.image}
                                    style={{ width: '300px', height: '150px' }}
                                  ></img>
                                </div>
                              </div>
                            </div>
                            <div className="face face2">
                              <div className="cardcontent">
                                <h4>{vehicle.name}</h4>
                                <ul>
                                  <li style={{fontSize:'14px'}}> <span style={{ color: 'black' }}>Capacity:</span> {vehicle.capacity} persons</li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day w/o driver & w/o fuel ):
                                    </i>
                                    &nbsp;{vehicle.price}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Rent: </span>
                                    <i style={{fontSize:'10px'}}>
                                      (Per Day with driver & No fuel ):
                                    </i>
                                     &nbsp;{vehicle.pricewithDriver}
                                  </li>
                                  <li style={{fontSize:'14px'}}>
                                    <span style={{ color: 'black' }}>Booking: </span>
                                     &nbsp;<a style={{color:'blue'}} href={"http://www.pakistanrentacar.com.pk/index.php?option=com_content&view=article&id=41&Itemid=171"}>Visit Website</a>
                                  </li>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    disabled={this.state.disabled}
                                    style={{ marginleft: '10%', marginTop: '1%' }}
                                    onClick={() => this.onSelectVehicle(vehicle)}
                                  >
                                    Select
                                  </Button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <div></div>
                          )}
                      </div>
                    );
                  })}
              </div>
            </div> : <Spin style={{marginTop:'10%', marginLeft:'45%'}} size="large"/> }
          </TabPanel>
        </div>
      </div>
    );
  }
}
