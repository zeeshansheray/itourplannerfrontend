import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../componentcss/usertour.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import PageviewIcon from '@material-ui/icons/Pageview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notfound from './Notfound';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/tourGenerator.css';
import PlaceIcon from '@material-ui/icons/Place';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import HotelIcon from '@material-ui/icons/Hotel';
import Typography from '@material-ui/core/Typography';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import { Spin } from 'antd';
import HomeIcon from '@material-ui/icons/Home';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import moment from 'moment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PrintIcon from '@material-ui/icons/Print';
import TextLoop from 'react-text-loop';
import { Alert } from 'antd';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import ReactToPrint from 'react-to-print';
import { Modal } from 'antd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { Space } from 'antd';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default class recommendedTours extends Component {
    constructor() {
        super();
        this.state = {
            tours: [],
            loading: false,
            dataFound: false,
            IsModalVisible: false,
            specificTour: null,
            isPrintModalVisible: false,
        }
    }
    componentDidMount() {
        this.viewTours();
    }
    viewTours = async () => {
        console.log(localStorage.getItem("token"));
        await axios
            .get('http://localhost:3000/users/showRecommendedTrips', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (res.data.trips[0] != null) {
                    this.setState({
                        tours: res.data.trips.slice(0, res.data.trips.length > 5 ? 5 : res.data.trips.length),
                        dataFound: true,
                    })
                }
                else {
                    this.setState({
                        dataFound: false,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    showModal = (tour, index) => {
        console.log('tour are ' + JSON.stringify(tour))
        this.setState({
            specificTour: tour,
            IsModalVisible: true,
        })
        // localStorage.setItem('tour',tour);
        console.log('tour are ' + JSON.stringify(this.state.specificTour));
    };


    showprintModal = (tour) => {
        console.log('tour are ' + JSON.stringify(tour))
        this.setState({
            specificTour: tour,
            IsPrintModalVisible: true,
        })
        // localStorage.setItem('tour',tour);
    };

    handleOk = () => {
        this.setState({
            IsModalVisible: false,
            IsPrintModalVisible: false,
            specificTour: null,
            index: null,
        })
    };

    handleCancel = () => {
        this.setState({
            IsModalVisible: false,
            specificTour: null,
            IsPrintModalVisible: false,
            index: null,
        })
    };


    render() {
        return (
            <div className="canvastransport" id="transportId" style={{ marginLeft: '-20px', backgroundColor: 'white' }}>
                <h3 style={{ fontFamily: 'Titillium Web' }}>Recommended Tour</h3>
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
                {this.state.dataFound ? <><TableContainer style={{ marginTop: '11%' }} component={Paper}>
                    <Table aria-label="customized table" style={{ width: '95%' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Tour No #</StyledTableCell>
                                <StyledTableCell align="center">Source</StyledTableCell>
                                <StyledTableCell align="center">Destination</StyledTableCell>
                                <StyledTableCell align="center">Start Date</StyledTableCell>
                                <StyledTableCell align="center">End Date</StyledTableCell>
                                <StyledTableCell align="center">Created at</StyledTableCell>
                                <StyledTableCell align="center">Total Budget</StyledTableCell>
                                <StyledTableCell align="center">View</StyledTableCell>
                                <StyledTableCell align="center">Print</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tours.map((tour, index) => (
                                <StyledTableRow key={tour.source}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{tour.inputDetails.source}</StyledTableCell>
                                    <StyledTableCell align="center">{tour.inputDetails.destination}</StyledTableCell>
                                    <StyledTableCell align="center">{tour.inputDetails.startdate}</StyledTableCell>
                                    <StyledTableCell align="center">{tour.inputDetails.enddate}</StyledTableCell>
                                    <StyledTableCell align="center">{tour.created_at}</StyledTableCell>
                                    <StyledTableCell align="center">{(tour.budget).toLocaleString()} PKR</StyledTableCell>
                                    <StyledTableCell align="center"><IconButton aria-label="view" >
                                        <PageviewIcon id="viewIcon" onClick={() => this.showModal(tour, index)} />
                                    </IconButton></StyledTableCell>
                                    <StyledTableCell align="center"><IconButton aria-label="view" >
                                        <PrintIcon id="printIcon" onClick={() => this.showprintModal(tour, index)} />
                                    </IconButton></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Modal
                        visible={this.state.IsModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={800}
                        style={{ marginTop: '2%' }}
                    >
                        <Singletour tour={this.state.specificTour} />
                    </Modal>
                    <Modal
                        visible={this.state.IsPrintModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={620}
                        style={{ marginTop: '2%' }}
                        footer={null}
                    >
                        <ReactToPrint
                            trigger={() => {
                                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                // to the root node of the returned component as it will be overwritten.
                                return <a href="#">Print this out!</a>;
                            }}
                            content={() => this.componentRef}
                        />
                        <Printview tour={this.state.specificTour} ref={el => (this.componentRef = el)} />

                        {/* <Printview tour={this.state.specificTour} /> */}
                    </Modal>
                </> : <Space size="middle" style={{ marginLeft: '50%', marginTop: '25%' }}>
                        <Spin size="large" />
                    </Space>
                    //<div id="notfound">
                    // <Notfound message="No trips found" style={{ position: 'absolute', top: '40%', left: '43%' }} sidemessage="Want to make exciting trips?" detail={["Go to ", <strong>Plan Trips </strong>, "and create your desired trips."]} /> </div>
                }
            </div>
        );
    }
}

class Singletour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationTimeInterval: this.props.tour.locationTimeInterval,
            poiTimeIntervals: this.props.tour.poiTimeIntervals,
            tripDays: this.props.tour.tripDays,
            tourStartDate: this.props.tour.tourStartDate,
            tourEndDate: this.props.tour.tourEndDate,
            currentDate: this.props.tour.currentDate,
            selectedPoiPosition: this.props.tour.selectedPoiPosition,
            inputDetails: this.props.tour.inputDetails,
            hotelToFirstPoiTime: this.props.tour.hotelToFirstPoiTime,
            startTime: this.props.tour.startTime,
            isLoading: true,
            selectedPoi: this.props.tour.selectedPoi,
            selectedHotel: this.props.tour.selectedHotel,
            poiToHotelTime: this.props.tour.poiToHotelTime,
            allTourDates: this.props.tour.allTourDates,
            tourDay: this.props.tour.inputDetails.stayCity == null ? 2 : 3,
            totalDays: this.props.tour.totalDays,
            stayTime: this.props.tour.stayTime,
            transportType: this.props.tour.transportType,
            TourType: this.props.tour.TourType,
            hotelPrice: this.props.tour.hotelPrice,
            fuelCost: this.props.tour.fuelCost,
            vehiclePrice: this.props.tour.vehiclePrice,
            budget: this.props.tour.budget,
            created_at: this.props.tour.created_at,
        }
        console.log('tour ' + JSON.stringify(this.props.tour));
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        if (this.props !== nextProps) {
            console.log('true')
            this.setState(nextProps.tour);
        }
        if (this.state.inputDetails.stayCity == null) {
            this.setState({
                tourDay: 2,
            });
        }
        else {
            this.setState({
                tourDay: 3,
            });
        }
        console.log('zee44 ' + this.state.tourDay);
    }


    render() {
        const FirstDayTripCar = (props) => {
            console.log('tour days 1' + this.state.tourDay)
            return (
                <div>
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
                    <Timeline style={{ marginLeft: '-80%' }} >
                        <h4 style={{ textAlign: 'left', marginLeft: '46%', fontSize: '22px', marginTop: '3%' }}><PlaceIcon style={{ marginTop: '-0.5%', fontSize: '19px' }} />{this.state.inputDetails.source}</h4>
                        <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {props.day} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[0]}</span></h4>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <HomeIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.source}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.startTime} am
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving ({this.state.transportType})
                                         <Typography variant="body2" color="textSecondary">
                                        {this.state.locationTimeInterval[0]} hours
                                        </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {/* {moment.utc(this.state.startTime,'hh:mm').add(this.state.locationTimeInterval[0],'hh:mm')} */}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <HotelIcon />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.stayCity == null ? this.state.inputDetails.destination : this.state.inputDetails.stayCity}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.inputDetails.stayCity == null ? this.state.selectedHotel.name : this.state.inputDetails.stayCity} Hotel
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            )
        }

        const SecondDayTripCar = (props) => {
            console.log('tour days 2' + this.state.tourDay)
            return (
                <div>
                    <Timeline style={{ marginLeft: '-80%' }} >
                        <h4 style={{ textAlign: 'left', marginLeft: '46%', fontSize: '22px', marginTop: '3%' }}><PlaceIcon style={{ marginTop: '-0.5%', fontSize: '19px' }} />{this.state.inputDetails.stayCity}</h4>
                        <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {props.day} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[1]}</span></h4>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <HomeIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.stayCity}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.startTime} am
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving &nbsp; ({this.state.transportType})
                                        <Typography variant="body2" color="textSecondary">
                                        {this.state.locationTimeInterval[0]} hours
                                        </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {/* {moment.utc(this.state.startTime,'hh:mm').add(this.state.locationTimeInterval[0],'hh:mm')} */}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <HotelIcon />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.destination}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.selectedHotel.name}
                                </Typography>
                                <Typography></Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            )
        }


        const EndingTowardsHotel = (props) => {
            return (
                <div><TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <HotelIcon />
                        </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography>
                            {this.state.inputDetails.destination}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.selectedHotel.name}
                        </Typography>
                    </TimelineContent>
                </TimelineItem>	   </div>
            )
        }

        const StartingFromHotel = (props) => {
            this.state.tourDay = this.state.tourDay + 1;
            return (
                <div>
                    <h4 style={{ textAlign: 'left', marginLeft: '46%', fontSize: '22px', marginTop: '3%' }}><PlaceIcon style={{ marginTop: '-0.5%', fontSize: '19px' }} />{this.state.inputDetails.destination}</h4>
                    <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {this.state.tourDay} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.tourDay > this.state.allTourDates.length ? 'Your selected Dates exceeded ' : this.state.allTourDates[this.state.tourDay - 1]}</span></h4>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                {this.state.inputDetails.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {this.state.selectedHotel.name}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <DirectionsCarIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
                        </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {this.state.poiToHotelTime[props.index]} hours
                                </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </div>
            )
        }
        return (

            //    <div id="tourgeneratorBox">
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px', color: '#001529' }}>Scheduled Tour</h1>
                <h4 style={{ textAlign: 'left', marginLeft: '3.5%', fontSize: '22px', marginTop: '3%' }}>⦿ Trip Summary</h4>
                <List style={{ width: '320px', marginLeft: '5.5%', marginTop: '-1%' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText color="secondary" primary="Source" secondary={this.state.inputDetails.source} />
                    </ListItem>
                    {this.state.inputDetails.stayCity == null ? <></> : <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationCityIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Stay City" secondary={this.state.inputDetails.stayCity} />
                    </ListItem>}
                    <ListItem>
                        <ListItemAvatar >
                            <Avatar color="secondary">
                                <PlaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Destination" secondary={this.state.inputDetails.destination} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DateRangeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Tour Days" secondary={this.state.totalDays + ' Days'} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <ScheduleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Budget" secondary={this.state.budget.toLocaleString() + ' PKR'} />
                    </ListItem>
                    {this.state.totalDays >= this.state.tripDays ? <></> :
                        <ListItem>
                            <ListItemAvatar color="secondary">
                                <Avatar>
                                    <ScheduleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Extra Days" secondary={this.state.tripDays - this.state.totalDays + ' Days '} />
                        </ListItem>}
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <MonetizationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Hotel & Accomodation" secondary={this.state.hotelPrice.toLocaleString() + ` PKR (${this.state.tripDays} Days for ${this.state.inputDetails.Adults} people)`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <LocalGasStationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Fuel " secondary={this.state.fuelCost + ' Liters Approx'} />
                    </ListItem>
                    {this.state.transportType == 'Rental' ? <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DirectionsCarIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice).toLocaleString() + ` PKR (${this.state.totalDays} Days)`} />
                    </ListItem> : <></>}
                    {this.state.transportType == 'Bus' ? <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DirectionsCarIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice).toLocaleString() + ` PKR (${this.state.totalDays - 1} Days)`} />
                    </ListItem> : <></>}
                </List>

                {this.state.inputDetails.stayCity == null ? <FirstDayTripCar day={this.state.tourDay - 1} /> : <div > <FirstDayTripCar day={this.state.tourDay - 2} /></div>}
                {this.state.inputDetails.stayCity == null ? <></> : <SecondDayTripCar day={this.state.tourDay - 1} />}
                <Timeline style={{ marginLeft: '-80%' }}>
                    <h4 style={{ textAlign: 'left', marginLeft: '46%', fontSize: '22px' }}><PlaceIcon style={{ marginTop: '-0.5%', fontSize: '19px' }} />{this.state.inputDetails.destination}</h4>
                    <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {this.state.tourDay} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[this.state.tourDay - 1]}</span> </h4>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot>
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                {this.state.selectedHotel.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;&nbsp;{this.state.startTime} am
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <DirectionsCarIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;{this.state.hotelToFirstPoiTime} hours
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    {this.state.selectedPoi.map((poi, index) => <div>
                        {index == 0 ? <></> : index % 3 == 0 ? <StartingFromHotel index={index} /> : <></>}
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary" variant="outlined">
                                    <PlaceIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <div className="card mb-3" id="poiCard" style={{ height: '92%', width: '100%', display: 'inline-block' }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img
                                                src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${poi.photo}&sensor=false&maxheight=200&maxwidth=200&key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss`}
                                                className="card-img" style={{ height: '200px', marginLeft: '-7%' }} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h4 className="card-title" style={{ color: '#001529', wordBreak: 'break-all' }}>{poi.name}</h4>
                                                {poi.rating === undefined || poi.rating < 1 ? <p style={{ textAlign: 'right', marginTop: '-6%', color: '#001529' }}>Not available</p> : <p style={{ textAlign: 'right', marginTop: '-6%', color: '#001529' }}>{poi.rating > 4.5 ? 'Excellent' : poi.rating > 3.5 ? 'Good' : 'Fine'}<span style={{ backgroundColor: '#001529', borderRadius: '5px', color: 'white', padding: '5px', marginLeft: '1%' }}><strong >{poi.rating}</strong></span></p>}
                                                <p className="card-text" style={{ color: '#001529', marginTop: '-4%', marginLeft: '0%' }}><small style={{ color: '#001529' }}><ThumbUpIcon style={{ color: 'blue', fontSize: '18px', marginTop: '-3px', marginRight: '1%' }} />{poi.totalRating == null ? 'Ratings not available' : poi.totalRating} Total Ratings</small></p>
                                                <p className="card-text" style={{ color: 'red', marginTop: '10%', marginLeft: '0%' }}>You can stay upto {Math.floor(Math.random() * 3) + 1} Hours</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving
            </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {(index == 2 || index == this.state.selectedPoi.length - 1) ? this.state.poiToHotelTime[index] + ' hours' : this.state.poiTimeIntervals[index] + ' hours'}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem> {index == 2 && index != this.state.selectedPoi.length - 1 ? <EndingTowardsHotel tripEnd={false} /> : index == this.state.selectedPoi.length - 1 || (index + 1) % 3 == 0 ? <EndingTowardsHotel tripEnd={true} /> : <></>}</div>)}
                </Timeline>
            </div>
        )

    }
}

class Printview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationTimeInterval: this.props.tour.locationTimeInterval,
            poiTimeIntervals: this.props.tour.poiTimeIntervals,
            tripDays: this.props.tour.tripDays,
            tourStartDate: this.props.tour.tourStartDate,
            tourEndDate: this.props.tour.tourEndDate,
            currentDate: this.props.tour.currentDate,
            selectedPoiPosition: this.props.tour.selectedPoiPosition,
            inputDetails: this.props.tour.inputDetails,
            hotelToFirstPoiTime: this.props.tour.hotelToFirstPoiTime,
            startTime: this.props.tour.startTime,
            isLoading: true,
            selectedPoi: this.props.tour.selectedPoi,
            selectedHotel: this.props.tour.selectedHotel,
            poiToHotelTime: this.props.tour.poiToHotelTime,
            allTourDates: this.props.tour.allTourDates,
            tourDay: this.props.tour.inputDetails.stayCity == null ? 2 : 3,
            totalDays: this.props.tour.totalDays,
            stayTime: this.props.tour.stayTime,
            transportType: this.props.tour.transportType,
            TourType: this.props.tour.TourType,
            hotelPrice: this.props.tour.hotelPrice,
            fuelCost: this.props.tour.fuelCost,
            vehiclePrice: this.props.tour.vehiclePrice,
            budget: this.props.tour.budget,
        }
        console.log('tour ' + JSON.stringify(this.props.tour));
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        if (this.props !== nextProps) {
            console.log('true')
            this.setState(nextProps.tour);
        }
        if (this.state.inputDetails.stayCity == null) {
            this.setState({
                tourDay: 2,
            });
        }
        else {
            this.setState({
                tourDay: 3,
            });
        }
        console.log('zee44 ' + this.state.tourDay);
    }


    render() {
        const FirstDayTripCar = (props) => {
            console.log('tour days 1' + this.state.tourDay)
            return (
                <div>
                    <Timeline style={{ marginLeft: '-84%' }} >
                        <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {props.day} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[0]}</span></h4>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <HomeIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.source}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.startTime} am
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving ({this.state.transportType})
                                         <Typography variant="body2" color="textSecondary">
                                        {this.state.locationTimeInterval[0]} hours
                                        </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {/* {moment.utc(this.state.startTime,'hh:mm').add(this.state.locationTimeInterval[0],'hh:mm')} */}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <HotelIcon />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.stayCity == null ? this.state.inputDetails.destination : this.state.inputDetails.stayCity}  (Night Stay)
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.inputDetails.stayCity == null ? this.state.selectedHotel.name : this.state.inputDetails.stayCity} (Hotel)
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            )
        }

        const SecondDayTripCar = (props) => {
            console.log('tour days 2' + this.state.tourDay)
            return (
                <div>
                    <Timeline style={{ marginLeft: '-80%' }} >
                        <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {props.day} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[1]}</span></h4>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <HomeIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.stayCity}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.startTime} am
                                    </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving &nbsp; ({this.state.transportType})
                                        <Typography variant="body2" color="textSecondary">
                                        {this.state.locationTimeInterval[0]} hours
                                        </Typography>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {/* {moment.utc(this.state.startTime,'hh:mm').add(this.state.locationTimeInterval[0],'hh:mm')} */}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <HotelIcon />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {this.state.inputDetails.destination} (Night Stay)
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.selectedHotel.name} (Hotel)
                                </Typography>
                                <Typography></Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            )
        }


        const EndingTowardsHotel = (props) => {
            return (
                <div><TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot color="primary">
                            <HotelIcon />
                        </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent>
                        <Typography>
                            {this.state.inputDetails.destination} (Night Stay)
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {this.state.selectedHotel.name} (Hotel)
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
                </div>
            )
        }

        const StartingFromHotel = (props) => {
            this.state.tourDay = this.state.tourDay + 1;
            return (
                <div>
                    <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {this.state.tourDay} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.tourDay > this.state.allTourDates.length ? 'Your selected Dates exceeded ' : this.state.allTourDates[this.state.tourDay - 1]}</span></h4>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                {this.state.inputDetails.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {this.state.selectedHotel.name}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <DirectionsCarIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
                        </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {this.state.poiToHotelTime[props.index]} hours
                                </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </div>
            )
        }
        return (

            //    <div id="tourgeneratorBox">
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: '#001529' }}>Scheduled Tour</h1>
                <List style={{ width: '320px', marginLeft: '1%', marginTop: '-1%' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HomeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText color="secondary" primary="Source" secondary={this.state.inputDetails.source} />
                    </ListItem>
                    {this.state.inputDetails.stayCity == null ? <></> : <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationCityIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Stay City" secondary={this.state.inputDetails.stayCity} />
                    </ListItem>}
                    <ListItem>
                        <ListItemAvatar >
                            <Avatar color="secondary">
                                <PlaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Destination" secondary={this.state.inputDetails.destination} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DateRangeIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Tour Days" secondary={this.state.totalDays + ' Days'} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <ScheduleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Budget" secondary={(this.state.budget).toLocaleString() + ' PKR'} />
                    </ListItem>
                    {this.state.totalDays >= this.state.tripDays ? <></> :
                        <ListItem>
                            <ListItemAvatar color="secondary">
                                <Avatar>
                                    <ScheduleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Extra Days" secondary={this.state.tripDays - this.state.totalDays + ' Days '} />
                        </ListItem>}
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <MonetizationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Hotel & Accomodation" secondary={this.state.hotelPrice.toLocaleString() + ` PKR (${this.state.inputDetails.Adults} people)`} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <LocalGasStationIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Fuel " secondary={this.state.fuelCost + ' Liters Approx'} />
                    </ListItem>
                    {this.state.transportType == 'Rental' ? <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DirectionsCarIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice).toLocaleString() + ` PKR (${this.state.totalDays} Days)`} />
                    </ListItem> : <></>}
                    {this.state.transportType == 'Bus' ? <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DirectionsCarIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice).toLocaleString() + ` PKR (${this.state.totalDays - 1} Days)`} />
                    </ListItem> : <></>}
                </List>
                {this.state.inputDetails.stayCity == null ? <FirstDayTripCar day={this.state.tourDay - 1} /> : <FirstDayTripCar day={this.state.tourDay - 2} />}
                {this.state.inputDetails.stayCity == null ? <></> : <SecondDayTripCar day={this.state.tourDay - 1} />}
                <Timeline style={{ marginLeft: '-84%' }}>
                    <h4 style={{ textAlign: 'left', marginLeft: '47%', fontSize: '20px' }}>Day {this.state.tourDay} <span style={{ fontSize: '15px', color: 'white', backgroundColor: '#001529', padding: '8px', marginLeft: '0.5%', borderRadius: '20px' }}>{this.state.allTourDates[this.state.tourDay - 1]}</span> </h4>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot>
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                {this.state.selectedHotel.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;&nbsp;{this.state.startTime} am
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <DirectionsCarIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;{this.state.hotelToFirstPoiTime} hours
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    {this.state.selectedPoi.map((poi, index) => <div>
                        {index == 0 ? <></> : index % 3 == 0 ? <StartingFromHotel index={index} /> : <></>}
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="primary" variant="outlined">
                                    <PlaceIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    {poi.name}
                                </Typography>
                                {/* <Typography variant="body2" color="textSecondary">
                                    {(index == 2 || index == this.state.selectedPoi.length - 1) ? this.state.poiToHotelTime[index] + ' hours' : this.state.poiTimeIntervals[index] + ' hours'}
                                </Typography> */}
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <DirectionsCarIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>
                                    Driving
            </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {(index == 2 || index == this.state.selectedPoi.length - 1) ? this.state.poiToHotelTime[index] + ' hours' : this.state.poiTimeIntervals[index] + ' hours'}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem> {index == 2 ? <EndingTowardsHotel tripEnd={false} /> : index == this.state.selectedPoi.length - 1 || (index + 1) % 3 == 0 ? <EndingTowardsHotel tripEnd={true} /> : <></>}</div>)}
                </Timeline>
            </div>
        )

    }
}
