import React, { useContext, Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import '../componentcss/tourGenerator.css';
import PlaceIcon from '@material-ui/icons/Place';
import { makeStyles } from '@material-ui/core/styles';
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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
export default class Tourgenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationTimeInterval: [],
            poiTimeIntervals: [],
            tripDays: 0,
            tourStartDate: new Date(props.Inputdetails.startdate),
            tourEndDate: new Date(props.Inputdetails.enddate),
            currentDate: props.Inputdetails.startdate,
            selectedPoiPosition: [],
            inputDetails: this.props.Inputdetails,
            hotelToFirstPoiTime: 0,
            startTime: "10:00",
            isLoading: true,
            selectedPoi: JSON.parse(localStorage.getItem('selectedpoi')),
            selectedHotel: JSON.parse(localStorage.getItem('selectedhotel')),
            poiToHotelTime: [],
            allTourDates: [],
            tourDay: 3,
            totalDays: 0,
            stayTime: "02:00",
            transportType: localStorage.getItem('transportType'),
            TourType: 'Manual',
            userid: localStorage.getItem('userid'),
            isDisabled: false,
            hotelPrice: null,
            fuelCost: 0,
            vehiclePrice: parseInt(localStorage.getItem('selectedVehicle')),
            weatherDetails: [],
            budget: null,
            tagHotelTypeValue: null,
            tagWeatherTypeValue: null,
            tagTripTypeValue: null,
            tagLocationTypeValue: null,
            tagHotelType: null,
            tagWeatherType: null,
            tagTripType: null,
            tagLocationType: null,
        }
    }
    //alert	
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.state.tripScheduled = false;
    };
    calculateTripDays = async () => {
        let startdate = new Date(this.state.inputDetails.startdate);
        let enddate = new Date(this.state.inputDetails.enddate);
        await this.setState({
            tripDays: ((enddate.getTime() - startdate.getTime()) / (1000 * 3600 * 24) + 1),
        })
        console.log('Trip days are ' + this.state.tripDays);
    }
    getTags = async () => {
        await axios.get(
            "http://localhost:3000/users/getTags",
        ).then((res) => {

            this.setState({
                tagLocationType: res.data.tagLocations,
                tagHotelType: res.data.tagHotels,
                tagTripType: res.data.tagTrips,
                tagWeatherType: res.data.tagWeather
            })
            console.log(this.state.tagWeatherType);
        }).catch((err) => {
            console.log(err)
        })
    }
    async componentDidMount() {
        this.getTags();
        console.log('Input det' + JSON.stringify(this.state.inputDetails));
        const selectedPois = JSON.parse(localStorage.getItem('selectedpoi'));
        console.log('selected hotel ' + JSON.stringify(this.state.selectedHotel));
        console.log('selected POIS ' + JSON.stringify(selectedPois));
        let selectedPoiPosition = selectedPois.map(postion => postion.latLng);
        this.state.selectedPoiPosition = selectedPoiPosition;
        console.log('selected poiss location' + JSON.stringify(selectedPoiPosition));
        console.log('sheray1' + typeof this.state.hotelToFirstPoiTime);
        console.log('selectedhotel' + JSON.stringify(this.state.selectedHotel));
        if (this.state.transportType == 'Bus') {
            console.log('zee11');
            await this.setState({
                tourDay: 2,
                locationTimeInterval: [...this.state.locationTimeInterval, this.state.inputDetails.travelTime],
            })
        }
        else if (this.state.transportType != 'Bus' && this.state.inputDetails.stayCity == null) {
            console.log('zee22');
            await this.setState({
                tourDay: 2,
            })
            this.directionRenderer(this.state.inputDetails.source, this.state.inputDetails.destination);
        }
        else {
            console.log('zee33')
            var locationTimeIntervals = await [this.directionRenderer(this.state.inputDetails.source, this.state.inputDetails.stayCity), this.directionRenderer(this.state.inputDetails.stayCity, this.state.inputDetails.destination)]
            await this.setState({
                tourDay: 3,
            })
        }
        console.log('select poi length' + selectedPoiPosition.length);
        this.calculateTripDays();
        let startPoi = selectedPoiPosition[0][0].lat + ',' + selectedPoiPosition[0][0].lng;
        let hotelPosition = this.state.selectedHotel[0].latLng[0].lat + ',' + this.state.selectedHotel[0].latLng[0].lng;
        console.log('Hotel position ' + hotelPosition + '\nPOi postion ' + startPoi);
        await this.hoteldirectionRenderer(hotelPosition, startPoi);
        for (var i = 0, j = 1; i < selectedPoiPosition.length - 1; i++, j++) {
            let startPoint = selectedPoiPosition[i][0].lat + ',' + selectedPoiPosition[i][0].lng;
            let endPoint = selectedPoiPosition[j][0].lat + ',' + selectedPoiPosition[j][0].lng;
            console.log('latstartpoint is ' + startPoint);
            console.log('latendpoint is ' + endPoint);
            await this.poidirectionRenderer(startPoint, endPoint);
            console.log('DIstance from Poi ' + i + ' to ' + (j))
            console.log('Array of poi direction is ' + this.state.poiTimeIntervals);
        }
        for (var i = 0; i <= selectedPoiPosition.length - 1; i++) {
            let startPoint = selectedPoiPosition[i][0].lat + ',' + selectedPoiPosition[i][0].lng;
            let hotelPosition = this.state.selectedHotel[0].latLng[0].lat + ',' + this.state.selectedHotel[0].latLng[0].lng;
            await this.poiToHotelRenderer(hotelPosition, startPoint);
        }
        var totalDays = Math.abs((this.state.tourEndDate - this.state.tourStartDate) / (1000 * 60 * 60 * 24));
        // console.log('zee5' + totalDays);	
        // console.log('Current date' + this.state.currentDate);	
        for (var i = 0; i <= totalDays; i++) {
            var new_date = moment(this.state.currentDate, "YYYY:MM:DD").add(1, 'days');
            let dateString = new Date(new_date).toUTCString();
            dateString = dateString.split(' ').slice(0, 4).join(' ');
            this.setState({
                currentDate: new_date,
                allTourDates: [...this.state.allTourDates, dateString],
            })
        }
        console.log('tour date' + this.state.allTourDates)

        if (this.state.inputDetails.stayCity == null) {
            let days = (Math.ceil(this.state.selectedPoi.length / 3)) + 1;
            console.log('ram janey ' + days);
            this.setState({
                totalDays: days,
            })
        }
        else {
            let days = (Math.ceil(this.state.selectedPoi.length / 3)) + 2;
            console.log('ram janey ' + days);
            this.setState({
                totalDays: days,
            })
        }

        console.log('hotel price before ' + this.state.selectedHotel[0].price);
        let price = this.state.selectedHotel[0].price.match(/\d+(?:\.\d+)?/g);
        console.log('price length' + price.length);
        price = parseInt(price[0] + price[1]);
        let hotelprice = price * (this.state.tripDays * (this.state.inputDetails.Adults / 2));
        console.log('hotel price after ' + price);
        console.log('sohail ' + typeof price);
        await this.setState({
            isLoading: false,
            //totalDays: this.state.tripDays + 1,	
            currentDate: this.state.inputDetails.startdate,
            hotelPrice: hotelprice,
            budget: parseInt((this.state.vehiclePrice * this.state.tripDays) + (hotelprice)),
        })
        console.log('mazhar total' + this.state.tripDays);
        console.log('mazhar price' + this.state.hotelPrice);
        console.log('budget' + this.state.budget);
        //for fuel storage for specific traveltype
        //  if (this.state.inputDetails.stayCity != null) {
        //     this.setState({
        //         fuelCost: this.state.fuelCost
        //     })
        // }

        this.checkWeather();

    }
    hoteldirectionRenderer = async (start, end) => {
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=EWm0H194ftFD1crYjUyVrukOZQ9xBBC2&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    var travelTime = res.data.route.formattedTime;
                    var fuelCost = parseInt((res.data.route.fuelUsed * 3.78541).toFixed(2));
                    console.log('index' + typeof fuelCost);
                    this.setState({
                        hotelToFirstPoiTime: travelTime,
                        fuelCost: this.state.fuelCost + fuelCost,
                    })
                    console.log('Hotel to first POI time is ' + this.state.hotelToFirstPoiTime);
                    console.log('zeebash' + fuelCost);
                }
                else {
                    console.log('Cannot find the time interval.')
                }
            })
    }
    poiToHotelRenderer = async (start, end) => {
        console.log('I am running poi to hotel')
        console.log('Start ' + JSON.stringify(start));
        console.log('End' + JSON.stringify(end));
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=EWm0H194ftFD1crYjUyVrukOZQ9xBBC2&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    var travelTime = res.data.route.formattedTime;
                    var fuelCost = parseInt((res.data.route.fuelUsed * 3.78541).toFixed(2));
                    console.log('index' + typeof fuelCost);
                    this.setState({
                        poiToHotelTime: [...this.state.poiToHotelTime, travelTime],
                        fuelCost: this.state.fuelCost + fuelCost,
                    })
                    console.log('zeebash' + fuelCost);
                }
                else {
                    console.log('Cannot find the time interval.')
                }
            })
    }
    directionRenderer = async (start, end) => {
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=EWm0H194ftFD1crYjUyVrukOZQ9xBBC2&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    var travelTime = res.data.route.formattedTime;
                    var fuelCost = parseInt((res.data.route.fuelUsed * 3.78541).toFixed(2));
                    console.log('index' + typeof fuelCost);
                    this.setState({
                        locationTimeInterval: [...this.state.locationTimeInterval, travelTime],
                        fuelCost: this.state.fuelCost + fuelCost,
                    })
                    console.log('Source Destination time is ' + this.state.locationTimeInterval);
                    console.log('zeebash' + fuelCost);
                }
                else {
                    console.log('Cannot find the time interval.')
                }
            })
    }
    poidirectionRenderer = async (start, end) => {
        console.log('POI direction  working');
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=EWm0H194ftFD1crYjUyVrukOZQ9xBBC2&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    var travelTime = res.data.route.formattedTime;
                    var fuelCost = parseInt((res.data.route.fuelUsed * 3.78541).toFixed(2));
                    this.setState({
                        poiTimeIntervals: [...this.state.poiTimeIntervals, travelTime],
                        fuelCost: this.state.fuelCost + fuelCost,
                    })
                    console.log('time is ' + this.state.poiTimeIntervals);
                    console.log('zeebash' + fuelCost);
                }
                else {
                    console.log('Cannot find the time interval.')
                }
            })
    }
    tourObjectCreate = (tourDay) => {
        let price = 0;
        console.log('Musa' + this.state.tourDay);
        if (this.state.transportType == 'Rental') {
            price = this.state.vehiclePrice * tourDay;
        }
        else if (this.state.transportType == 'Bus') {
            price = this.state.vehiclePrice * (tourDay - 1);
        }
        else if (this.state.transportType == 'Personal') {
            price = 0;
        }

        const tourObject = ({
            locationTimeInterval: this.state.locationTimeInterval,
            poiTimeIntervals: this.state.poiTimeIntervals,
            tripDays: this.state.tripDays,
            tourStartDate: this.state.tourStartDate,
            tourEndDate: this.state.tourEndDate,
            currentDate: this.state.currentDate,
            selectedPoiPosition: this.state.selectedPoiPosition,
            inputDetails: this.state.inputDetails,
            hotelToFirstPoiTime: this.state.hotelToFirstPoiTime,
            startTime: this.state.startTime,
            selectedPoi: this.state.selectedPoi,
            selectedHotel: this.state.selectedHotel,
            poiToHotelTime: this.state.poiToHotelTime,
            allTourDates: this.state.allTourDates,
            tourDay: tourDay,
            totalDays: this.state.tripDays,
            stayTime: this.state.stayTime,
            transportType: this.state.transportType,
            TourType: this.state.TourType,
            userid: this.state.userid,
            hotelPrice: this.state.hotelPrice,
            fuelCost: this.state.fuelCost,
            vehiclePrice: price,
            budget: this.state.budget,
            tags: [
                this.state.tagTripTypeValue,
                this.state.tagHotelTypeValue,
                this.state.tagTripTypeValue,
                this.state.tagWeatherTypeValue
            ],
        })
        console.log('Obj' + JSON.stringify(tourObject))
        axios
            .post('http://localhost:3000/users/addTrip', tourObject)
            .then((res) => {
                toast.success("Your tour has been saved sucessfully!");
            })
            .catch((error) => {
                toast.error('Cannot Process your request. Pleaese try again later. ');
            });
    }
    saveTour = async (e) => {
        let tourDay = this.state.tourDay;
        e.preventDefault();
        if ((this.state.tagHotelTypeValue && this.state.tagWeatherTypeValue && this.state.tagLocationTypeValue && this.state.tagTripTypeValue) == null) {
            toast.warning('Select tour categories');
        }
        else {
            let confirm;
            window.alert('total days ' + this.state.tripDays + 'tour days ' + this.state.tourDay)
            if (this.state.tourDay > this.state.tripDays) {
                confirm = window.confirm('Your trip days are exceeding. Do you want to increase tour days to ' + this.state.tourDay + '?');
                await this.setState({
                    totalDays: tourDay,
                    allTourDates: [],
                })
                for (var i = 0; i < this.state.tripDays; i++) {
                    var new_date = moment(this.state.currentDate, "YYYY:MM:DD").add(1, 'days');
                    let dateString = new Date(new_date).toUTCString();
                    dateString = dateString.split(' ').slice(0, 4).join(' ');
                    await this.setState({
                        currentDate: new_date,
                        allTourDates: [...this.state.allTourDates, dateString],
                    })
                }
                console.log('new dates are ' + this.state.allTourDates);
                console.log('new total days ' + this.state.tripDays);
                this.tourObjectCreate(tourDay);
            }
            else if (this.state.tourDay < this.state.tripDays) {
                let tourDay = this.state.tourDay;
                confirm = window.confirm('Your trip is scheduled but you have free days. Do you want to shorten your trip for ' + this.state.tourDay + ' Days?');
                await this.setState({
                    totalDays: tourDay,
                    allTourDates: [],
                })
                for (var i = 0; i < this.state.tripDays; i++) {
                    var new_date = moment(this.state.currentDate, "YYYY:MM:DD").add(1, 'days');
                    let dateString = new Date(new_date).toUTCString();
                    dateString = dateString.split(' ').slice(0, 4).join(' ');
                    await this.setState({
                        currentDate: new_date,
                        allTourDates: [...this.state.allTourDates, dateString],
                    })
                }
                console.log('new dates are ' + this.state.allTourDates);
                console.log('new total days ' + this.state.tripDays);
                this.tourObjectCreate(tourDay);
            }
            else {
                this.tourObjectCreate(tourDay);
            }
            this.setState({
                isDisabled: true,
            })
        }
    }

    checkWeather = (place) => {
        console.log('Trying to check weather for places.')

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputDetails.source},pk&appid=9e0fc0914939c270f35d7f2fda6bf08e&units=metric`).then(
            (res) => {
                console.log('weather' + JSON.stringify(res));
            }
        )



    }

    render() {
        const FirstDayTripCar = (props) => {
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
                                    Driving({this.state.transportType})
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
                                    {this.state.inputDetails.stayCity == null ? this.state.inputDetails.destination : this.state.inputDetails.stayCity} (Night Stay)
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.inputDetails.stayCity == null ? this.state.selectedHotel[0].name : this.state.inputDetails.stayCity} (Hotel)
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            )
        }
        const SecondDayTripCar = (props) => {
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
                                    {this.state.inputDetails.destination} (Night Stay)
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {this.state.selectedHotel[0].name} (Hotel)
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
                            {this.state.selectedHotel[0].name} (Hotel)
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
                                {this.state.selectedHotel[0].name}
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
            <>{!this.state.isLoading ? <div id="tourgeneratorBox">
                <Alert
                    message="Success"
                    description="Your trip is scheduled."
                    type="success"
                    showIcon
                    closable
                    style={{ position: 'absolute', left: '71%', top: '70%', width: '240px' }}
                />
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '40px', color: '#001529' }}>Scheduled Tour</h1>
                <Alert
                    banner
                    style={{ marginLeft: '36.5%', width: '27%' }}
                    message={
                        <TextLoop mask>
                            <div>Your Trip has been scheduled.</div>
                            <div>Scroll down to view your trip.</div>
                        </TextLoop>
                    }
                />
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
                        <ListItemText primary="Total Days" secondary={this.state.tripDays + ' Days'} />
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
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice * this.state.tripDays).toLocaleString() + ` PKR (${this.state.tripDays} Days)`} />
                    </ListItem> : <></>}
                    {this.state.transportType == 'Bus' ? <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <DirectionsCarIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice * this.state.tripDays).toLocaleString() + ` PKR (${this.state.tripDays} Days)` + '(Including Bus)'} />
                    </ListItem> : <></>}
                    <ListItem>
                        <ListItemAvatar color="secondary">
                            <Avatar>
                                <ScheduleIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary=" Total Budget" secondary={this.state.budget.toLocaleString() + ' PKR'} />
                    </ListItem>
                </List>

                {this.state.inputDetails.stayCity == null ? <FirstDayTripCar day={this.state.tourDay - 1} /> : <FirstDayTripCar day={this.state.tourDay - 2} />}
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
                                {this.state.selectedHotel[0].name}
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
                                                className="card-img" style={{ height: '200px', marginLeft: '-6.5%' }} />
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
                <><Alert
                    banner
                    style={{ marginLeft: '10%' }}
                    message={
                        <TextLoop mask>
                            <div>Your Trip is scheduled.</div>
                            <div>Your Trip duration is maximum for {this.state.tripDays} days.</div>
                            {this.state.tripDays > this.state.tourDay ? <><div>You can visit {this.state.inputDetails.destination} for other {(this.state.tripDays - this.state.tourDay)} days.</div>
                                <div>Go with this plan or select some more Point of Interest to visit.</div></> : <>{this.state.tripDays < this.state.tourDay ? <><div>You are short of trip Days.</div><div>Go back and select some less POI's or Extend the dates.</div> </> : <>Save it now. </>}</>}
                        </TextLoop>
                    }
                />   <label id="labels" style={{ position: 'relative', marginTop: '2%', marginLeft: '10%' }}>Tour Categories:</label>
                    <div style={{ position: 'relative', display: 'flex', marginLeft: '15%' }}>
                        <div id="box" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label id="labels" >Weather:</label>
                            {Array.isArray(this.state.tagWeatherType) &&
                                <select className="form-control" style={{ fontSize: '12px', width: '90px' }}
                                    onChange={(e) => this.setState({ tagWeatherTypeValue: e.target.value })}
                                >
                                    <option>--</option>
                                    {this.state.tagWeatherType?.map(value => {
                                        return (
                                            <option value={value._id}>{value.name}</option>)
                                    })}
                                </select>}
                        </div>
                        <div id="box" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                            <label id="labels" style={{ float: 'left' }}>Hotels:</label>
                            {Array.isArray(this.state.tagHotelType) &&
                                <select className="form-control" style={{ fontSize: '12px', width: '90px' }}
                                    onChange={(e) => this.setState({ tagHotelTypeValue: e.target.value })}
                                >
                                    <option>--</option>
                                    {this.state.tagHotelType?.map(value => {
                                        return (
                                            <option value={value._id}>{value.name}</option>)
                                    })}
                                </select>}
                        </div>
                        <br />
                        <div id="box" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                            <label id="labels">Trip days:</label>
                            {Array.isArray(this.state.tagTripType) &&
                                <select className="form-control" style={{ fontSize: '12px', width: '100px' }}
                                    onChange={(e) => this.setState({ tagTripTypeValue: e.target.value })}
                                >
                                    <option>--</option>
                                    {this.state.tagTripType?.map(value => {
                                        return (
                                            <option value={value._id}>{value.name}</option>)
                                    })}
                                </select>}
                        </div>
                        <div id="box" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                            <label id="labels" >Terrains:</label>
                            {Array.isArray(this.state.tagLocationType) &&
                                <select className="form-control" style={{ fontSize: '12px', width: '100px' }}
                                    onChange={(e) => this.setState({ tagLocationTypeValue: e.target.value })}
                                >
                                    <option>--</option>
                                    {this.state.tagLocationType?.map(value => {
                                        return (
                                            <option value={value._id}>{value.name}</option>)
                                    })}
                                </select>}
                        </div>
                    </div>
                    <div style={{ marginLeft: '85%', marginTop: '2%' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            style={{ marginLeft: '2%' }}
                            onClick={this.saveTour}
                            disabled={this.state.isDisabled}
                        >
                            Save
      </Button>
                    </div>
                    {/* <ReactToPrint	
                            trigger={() => {	
                                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop	
                                // to the root node of the returned component as it will be overwritten.	
                                return <a href="#">Print this out!</a>;	
                            }}	
                            content={Tourgenerator}	
                        />  */}
                </>
            </div> : <div style={{ marginLeft: '49%', marginTop: '15%' }} ><Spin size="large" /><h4 style={{ marginLeft: '-8%', marginTop: '1%' }}>Generating Trip</h4></div>} </>
        )
    }
}