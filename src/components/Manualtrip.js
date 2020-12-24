/*global google*/
import React, { Component, useState } from 'react';
import Geocode from "react-geocode";
import axios from 'axios';
import pagenotfound from '../images/image-not-found.jpg';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../componentcss/plantrip.css';
import '../componentcss/manualtrip.css';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Stepper from '@material-ui/core/Stepper';
import IconButton from '@material-ui/core/IconButton';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import PlaceIcon from '@material-ui/icons/Place';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';
import { ToastContainer, toast } from 'react-toastify';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@material-ui/icons/Edit';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Spin } from 'antd';
import TextField from '@material-ui/core/TextField';
import ScheduleIcon from '@material-ui/icons/Schedule';

import Manualselectvehicles from './Manualselectvehicles';
import Manualselectpois from './Manualselectpoi';
import Manualselecthotels from './Manualselecthotels';
import Tourgenerator from './Tourgenerator';

import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    InfoWindow,
} from 'react-google-maps';
import { DeleteOutline, DirectionsCar, PanoramaRounded } from '@material-ui/icons';

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {

    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <PlaceIcon />,
        2: <DriveEtaIcon />,
        3: <CameraAltIcon />,
        4: <HotelIcon />,
        5: <DirectionsCar />,
        6: <ScheduleIcon />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Where are you going?', 'Route View', 'Select Point of Interest', 'Select Hotels', 'Select Vehicles', 'Sheduled Trip'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            // return <h1>First Step working</h1>
            return <Inputtourdetails />;
        case 1:
        //    return <h1>Second Step working</h1>
        return <Manualcheckroute />;

        case 2:
            return <Manualselectpois />
            //return <h1>third Step working</h1>
        case 3:
           // return <h1>fourth Step working</h1>
         return <Manualselecthotels />;
        case 4:
            return <Manualselectvehicles />
        case 5:
            return <Tourgenerator Inputdetails={Inputdetails} />
        default:
            return <Inputtourdetails />;
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function autoComplete() {
    var inputori = document.getElementById('address');
    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
}


var direction = null;
var source = null;
var destination = null;
var enddate = null;
var startdate = null;
var travelDis = null;
var travelTime = null;
var travelFuel = null;
var stayCity = null;
var Inputdetails = null;
var transportType = null;
var Adults = 1;
const setMap = () => {
    console.log('trying to refresh')
    localStorage.setItem('source', source);
    localStorage.setItem('destination', destination);
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
        {
            origin: localStorage.getItem('source'),
            destination: localStorage.getItem('destination'),
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                direction = result;
            }
        }
    );
}


class Inputtourdetails extends Component {
    constructor() {
        super();
        this.state = {
            origin: null,
            destination: null,
            adults: '',
            childerns: '',
            startdate: null,
            enddate: null,
            type: null,
        }
        this.adultsChange = this.adultsChange.bind(this);
        this.childernsChange = this.childernsChange.bind(this);
        this.enddateChange = this.enddateChange.bind(this);
        this.startdateChange = this.startdateChange.bind(this);
    }


    componentDidMount() {
        this.documentData = JSON.parse(localStorage.getItem('document'));
        if (localStorage.getItem('document')) {
            this.setState({
                type: this.documentData.type,
                adults: this.documentData.adults,
                childerns: this.documentData.childerns,
                startdate: this.documentData.startdate,
                enddate: this.documentData.enddate,
                origin: localStorage.getItem('source'),
                destination: localStorage.getItem('destination'),
            })
        }
        else {
            this.SetState = ({
                origin: null,
                destination: null,
                type: '',
                adults: '',
                childerns: '',
                startdate: null,
                enddate: null,
                type: null,
            })
        }
        var inputori = document.getElementById('manual_origin');
        var inputdes = document.getElementById('manual_destination');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'pk' },
        };
        var autocomplete = new google.maps.places.Autocomplete(inputori, options);
        var autocomplete = new google.maps.places.Autocomplete(inputdes, options);

    }
    setbrowserHistory = () => {
        localStorage.setItem('document', JSON.stringify(this.state));
    }
    typeChange = async (e) => {
        e.preventDefault();
        await this.setState({
            type: e.target.value
        })
        localStorage.setItem('transportType', this.state.type);
        this.setbrowserHistory();
    }
    async startdateChange(e) {
        e.preventDefault();
        this.setState({
            startdate: e.target.value
        })
        this.setbrowserHistory();
    }
    async enddateChange(e) {
        e.preventDefault();
        await this.setState({
            enddate: e.target.value
        })
        this.setbrowserHistory();
    }
    adultsChange = async (e) => {
        e.preventDefault();
        await this.setState({
            adults: e.target.value
        })
        Adults = this.state.adults;
        //this.setbrowserHistory();
        console.log('adultchange' + Adults);
        localStorage.setItem('adults', this.state.adults)
        //localStorage.setItem('adults',this.state.adults)
    }
    async childernsChange(e) {
        e.preventDefault();
        await this.setState({
            childerns: e.target.value
        })
        this.setbrowserHistory();
    }

    render() {
        return (
            <div id="booking" className="section">
                <div className="section-center">
                    <div className="container" >

                        <div className="row" >
                            <div className="col-md-4 col-md-pull-7" style={{ marginLeft: '33%', overflowY: 'hidden' }}>
                                <div className="booking-form" style={{ height: '420px' }}>
                                    <form style={{ marginTop: '-30px' }} onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <span className="form-label" >Starting From?</span>
                                            <input className="form-control" value={this.state.origin} id="manual_origin" style={{ width: '100%' }} autoComplete="true" type="text" placeholder="Enter your source?" />
                                            <span style={{ position: 'absolute', left: '88%', top: '52%' }} onClick={() => { { localStorage.setItem('source', '') }; document.getElementById('manual_origin').value = null; this.setState({ origin: null }) }}><EditIcon id="transiconsedit" /></span>
                                        </div>
                                        <div className="form-group">
                                            <span className="form-label" >Your Destination?</span>
                                            <input className="form-control" value={this.state.destination} style={{ width: '100%' }} autoComplete="true" id="manual_destination" type="text" placeholder="Enter a destination?" />
                                            <span style={{ position: 'absolute', left: '88%', top: '52%' }} onClick={() => { { localStorage.setItem('destination', '') }; document.getElementById('manual_destination').value = null; this.setState({ destination: null }) }}><EditIcon id="transiconsedit" /></span>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <span className="form-label">Start date</span>
                                                    <input className="form-control" type="date" id="startdate" min="2020-12-22" max="2020-12-28" style={{ marginLeft: '-3%', fontSize: '12px', width: '140px' }} onChange={this.startdateChange} value={this.state.startdate} required />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <span className="form-label">End date</span>
                                                    <input className="form-control" id="enddate" style={{ fontSize: '12px', width: '140px' }} min="2020-12-22" max="2020-12-28" onChange={this.enddateChange} type="date" value={this.state.enddate} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <span className="form-label">Transport</span>
                                                    <select onChange={this.typeChange} className="form-control" style={{ marginLeft: '-3%', fontSize: '12px', width: '140px' }}>
                                                        <option value="Bus">Bus</option>
                                                        <option value="Personal">Personal</option>
                                                        <option value="Rental">Rental</option>
                                                    </select>
                                                    <span className="select-arrow" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <span className="form-label">People?</span>
                                                    <input type='number' className="form-control" style={{ fontSize: '14px', width: '140px' }} id="manual_adults" onChange={this.adultsChange} value={this.state.adults} />
                                                    <span className="select-arrow" />
                                                </div>
                                            </div>
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


export default function Manualtrip() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [snackbar, setSnackbar] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const submitForm = () => {
        if (activeStep == 0) {
            source = document.getElementById('manual_origin').value;
            destination = document.getElementById('manual_destination').value;
            enddate = document.getElementById('enddate').value;
            startdate = document.getElementById('startdate').value;
            console.log('source is :' + source + '\ndestination is :' + destination + '\nData is :' + startdate);
            if (activeStep == 0 && ((source && destination && startdate && enddate) === '')) {
                setSnackbar(true);
            }
            else if (activeStep == 0 && ((source && destination && startdate && enddate) !== '')) {
                setMap();
                setTimeout(() => {
                    handleNext()
                }, 800);
            }
        }
        else if ((activeStep == 1 && localStorage.getItem('transportType') != 'Bus')) {
            if (travelTime >= "10:00:00" && stayCity == null) {
                window.alert('Please select a stay city to continue!');
            }
            else {
                handleNext();
            }
        }
        else if (activeStep == 2 && localStorage.getItem('selectedpoi') === null) {
            window.alert('Do select some poi first');
        }
        // else if (activeStep == 3 && localStorage.getItem('selectedhotel') === null) {
        //     window.alert('Please select a hotel first');
        // }
        else if (activeStep == 3 && (localStorage.getItem('transportType') == 'Personal')) {
            localStorage.setItem('selectedVehicle', 0);
            setActiveStep((prevActiveStep) => prevActiveStep + 2);
        }
        else {
            handleNext();
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    if (transportType == null) {
        transportType = 'Bus';
        localStorage.setItem('transportType', transportType);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    }
    Inputdetails = { source: source, destination: destination, startdate: startdate, enddate: enddate, travelFuel: travelFuel, travelDistance: travelDis, travelTime: travelTime, stayCity: stayCity, transportType: transportType, Adults: Adults }
    return (
        <div className="canvastransport" id="transportId" style={{ height: '750px' }}>
            <h3>Manual Tour</h3>
            <Snackbar open={snackbar} style={{ position: 'absolute', left: '81%', top: '20%' }} autoHideDuration={800} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please enter the details.
        </Alert>
            </Snackbar>
            <div className={classes.root} style={{ marginTop: '10%' }}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div style={{ marginTop: '30px' }}>
                            {/* <Button F={handleReset} className={classes.button}>
                                Reset
            </Button> */}
                        </div>
                    ) : (
                            <div >
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div style={{ marginTop: '30px', textAlign: 'right', marginRight: '10%' }}>
                                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                        Back
              </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        id='nextButton'
                                        onClick={submitForm}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>

                                </div>

                            </div>
                        )}

                </div>
            </div>
        </div>

    );
}

class Manualcheckroute extends Component {
    constructor() {
        super();
        this.state = {
            routeType: 'fastest',
            travelDistance: null,
            travelTime: null,
            fuelUsed: null,
            apiKey: 'EWm0H194ftFD1crYjUyVrukOZQ9xBBC2',
            snackbar: false,
            stayCity: null,
            transportType: localStorage.getItem('transportType'),
        }
        this.stayCityName = this.stayCityName.bind(this);

    }
    async componentWillMount() {
        console.log('zee' + this.state.transportType);
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=${this.state.apiKey}&from=${localStorage.getItem('source')}&to=${localStorage.getItem('destination')}&outFormat=json&ambiguities=ignore&routeType=${this.state.routeType}&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    console.log('result: ' + JSON.stringify(res));
                    this.setState({
                        travelDistance: (res.data.route.distance * 1.60934).toFixed(2),
                        travelTime: res.data.route.formattedTime,
                        fuelUsed: (res.data.route.fuelUsed * 3.78541).toFixed(2),
                    });
                    travelDis = this.state.travelDistance;
                    travelTime = this.state.travelTime;
                    travelFuel = this.state.fuelUsed;
                    console.log('Fuel used in Liters' + this.state.fuelUsed);
                    console.log(typeof this.state.travelDistance);
                } else {
                    console.log('Unable to fetch Data');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            snackbar: true,
        })
    }


    async stayCityName(e) {
        await this.setState({
            stayCity: e.target.value
        })
        stayCity = this.state.stayCity;
    }


    render() {
        const GoogleMapExample = withGoogleMap(() => (
            <GoogleMap
                id="mapfix"
                defaultCenter={{ lat: 30.3949, lng: 70.124 }}
                defaultZoom={5.2}
            >
                <DirectionsRenderer directions={direction} />
            </GoogleMap>

        ));

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({
                snackbar: false,
            })
        }

        return (
            <div><div id="routeshortDetails" style={{ width: '20%', position: 'absolute', top: '53%', left: '73%', backgroundColor: "#E8E8E8", color: "black" }}>
                <h4 style={{ paddingTop: '4%', backgroundColor: '#001529', height: '40px', paddingLeft: '5%', color: 'white' }}>Route Details <PlaceIcon style={{ verticalAlign: '-5px', color: 'white' }} /></h4>
                {this.state.travelTime != null ? <div><h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Distance is:</strong> {this.state.travelDistance} Km's</h4>{this.state.transportType === 'Bus' ? <></> : <h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Fuel:</strong> {this.state.fuelUsed}&nbsp;Ltr's approx</h4>}<h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Time required:</strong> {this.state.travelTime}&nbsp;Hr's<br /></h4> </div> :
                    <div><h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Distance</strong>: &nbsp;<Spin /></h4>{this.state.transportType === 'Bus' ? <></> : <h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Fuel:</strong>  &nbsp;<Spin /></h4>}<h4 style={{ paddingLeft: '5%', color: '#001529', fontFamily: '"Titillium Web", "sans-serif"' }}><strong>Time required:</strong>  &nbsp;<Spin /> </h4></div>}
            </div>
                <div id="mapCanvas" style={{ position: 'relative', height: '400px' }}>
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
                    <GoogleMapExample
                        containerElement={
                            <div
                                id="viewmap"
                                style={{ height: `600px`, width: '1800px', position: 'relative' }}
                            />
                        }
                        mapElement={<div id="mapitself" style={{ height: `55%`, width: '35%', marginLeft: '8%' }} />}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        // onClick={}
                        startIcon={<AutorenewIcon />}
                        style={{ position: 'absolute', left: '57.5%', top: '15%' }}
                    >
                        Refresh
      </Button>
                </div>
                {this.state.transportType !== 'Bus' && travelTime >= "10:00:00" ? <><Snackbar open={this.state.snackbar} style={{ position: 'absolute', left: '30%', top: '33%', width: '450px' }} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                    Do select atleast a city to stay
        </Alert>
                </Snackbar>
                    <div id="routeshortDetails" style={{ width: '20%', position: 'absolute', height: '120px', top: '83%', left: '73%', backgroundColor: "#E8E8E8", color: "black" }}>
                        <h4 style={{ paddingTop: '4%', backgroundColor: '#001529', height: '40px', paddingLeft: '5%', color: 'white' }}>Stay City <LocationCityIcon style={{ verticalAlign: '-5px', color: 'white' }} /></h4>
                        <TextField onChange={this.stayCityName} style={{ marginLeft: '13%' }} id="standard-secondary" label="Where would you stay?*" color="secondary" />
                    </div></> : <></>}
            </div>
        );
    }

}

