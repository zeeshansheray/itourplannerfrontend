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
export default class Automatedtourgenerator extends Component {
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
            selectedPois: JSON.parse(localStorage.getItem('selectedpoi')),
            selectedHotel: [],
            allHotels: this.props.Inputdetails.selectedHotels,
            poiToHotelTime: [],
            allTourDates: [],
            tourDay: 3,
            totalDays: 0,
            stayTime: "02:00",
            transportType: this.props.Inputdetails.transportType,
            userid: localStorage.getItem('userid'),
            isDisabled: false,
            hotelPrice: null,
            fuelCost: 0,
            vehiclePrice: props.Inputdetails.selectedVehicle.price,
            weatherDetails: [],
            budget: props.Inputdetails.budget,
            hotelType: props.Inputdetails.hotelType,
            budgetExceeding: false,
            visitPoi: null,
            poiLength: null,
            totalBudget: null,
            calculatedPrice: null,
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
        console.log('zeebashv' + this.state.vehiclePrice);
        //budget for hotels 
        let budgetforHotel;
        if (this.state.transportType != 'Personal') {
            budgetforHotel = this.state.budget - (this.state.vehiclePrice * this.state.tripDays);
        }
        else {
            budgetforHotel = this.state.budget;
        }
        console.log('Budget for hotel ' + budgetforHotel);
        console.log('hotel type' + this.state.hotelType);

        if (this.state.hotelType == 'Economy') {
            if (budgetforHotel < 800) {
                this.searchHotel(800, 3000);
                this.setState({
                    budgetExceeding: true,
                })
                console.log('eee1');
            }
            else {
                this.searchHotel(800, 3000);
                console.log('eee2');
            }
        }
        else if (this.state.hotelType == 'Business') {
            if (budgetforHotel < 4000) {
                this.searchHotel(4100, 7000);
                this.setState({
                    budgetExceeding: true,
                })
                console.log('e3');
            }
            else {
                this.searchHotel(4100, 7000);
                console.log('e4');
            }
        }
        else if (this.state.hotelType == 'Luxury') {
            if (budgetforHotel < 7100) {
                this.searchHotel(7100, 12000);
                this.setState({
                    budgetExceeding: true,
                })
                console.log('e5');
            }
            else {
                this.searchHotel(7100, 12000);
                console.log('e6');
            }
        }

        for (var i = 0; i < this.state.selectedPois.length; i++) {
            console.log('zee12  ' + i + " " + JSON.stringify(this.state.selectedPois[i].photo));
        }


        if (this.state.transportType == 'Personal' && ((this.state.selectedHotel.price * this.state.tripDays * this.state.inputDetails.Adults) > this.state.budget)) {
            this.setState({
                budgetExceeding: true,
            })
        }
        if (this.state.transportType != 'Personal' && (((this.state.selectedHotel.price * this.state.tripDays * this.state.inputDetails.Adults) + (this.state.vehiclePrice * this.state.tripDays)) > this.state.budget)) {
            this.setState({
                budgetExceeding: true,
            })
        }

        // for(var i=0; i<this.state.allHotels.length;i++) {
        //     let price= 
        // }

    }
    searchHotel = async (startRange, endRange) => {
        console.log('mazhari hotels ' + startRange + ' ' + endRange);
        for (var i = 0; i < this.state.allHotels.length; i++) {
            console.log('I am working ' + i + this.state.allHotels[i].price);
            if (this.state.allHotels[i].price > startRange && this.state.allHotels[i].price < endRange) {
                await this.setState({
                    selectedHotel: this.state.allHotels[i],
                })
                break;
            }
        }

        console.log('I am first');
        console.log('selectedHotel is ' + JSON.stringify(this.state.selectedHotel));
    }


    async componentDidMount() {
        this.getTags();
        console.log('Input det' + JSON.stringify(this.state.inputDetails));
        // const selectedPois = JSON.parse(localStorage.getItem('selectedpoi'));
        console.log('selected hotel ' + JSON.stringify(this.state.selectedHotel));
        console.log('selected POIS ' + JSON.stringify(this.state.selectedPois));

        //hotelselection 
        //let poiLength = this.state.selectedPois.length;
        await this.calculateTripDays();

        let poilength;
        if (this.state.inputDetails.stayCity == null) {
            poilength = (this.state.tripDays - 1) * 3
        }
        else {
            poilength = (this.state.tripDays - 2) * 3
        }
        console.log('zeeshu ' + this.state.poilength + ' ' + this.state.tripDays);
        this.state.selectedPois.length = poilength;
        this.setState({
            poiLength: poilength,
        })
        console.log('zeeshu ' + this.state.poiLength);
        console.log('zeeshu ' + this.state.selectedPois.length);
        let selectedPoiPosition = this.state.selectedPois.map(postion => postion.latLng);
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

        let startPoi = selectedPoiPosition[0][0].lat + ',' + selectedPoiPosition[0][0].lng;
        console.log('No I am first');
        let hotelPosition = this.state.selectedHotel.latLng[0].lat + ',' + this.state.selectedHotel.latLng[0].lng;
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
            let hotelPosition = this.state.selectedHotel.latLng[0].lat + ',' + this.state.selectedHotel.latLng[0].lng;
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
            let days = (Math.ceil(this.state.selectedPois.length / 3)) + 1;
            console.log('ram janey ' + days);
            this.setState({
                totalDays: days,
            })
        }
        else {
            let days = (Math.ceil(this.state.selectedPois.length / 3)) + 2;
            console.log('ram janey ' + days);
            this.setState({
                totalDays: days,
            })
        }


        let price = this.state.selectedHotel.price;
        console.log('sohail ' + typeof price);
        await this.setState({
            isLoading: false,
            //totalDays: this.state.tripDays + 1,	
            currentDate: this.state.inputDetails.startdate,
            hotelPrice: price * (this.state.tripDays * (this.state.inputDetails.Adults / 2)),
        })
        console.log('mazhar total' + this.state.tripDays);
        console.log('mazhar price' + this.state.hotelPrice);

        //for fuel storage for specific traveltype
        //  if (this.state.inputDetails.stayCity != null) {
        //     this.setState({
        //         fuelCost: this.state.fuelCost
        //     })
        // }

        // this.calculateBudget();

        //totalprice 9
        // let totalPrice = (this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice);
        // this.setState({
        //     calculatedPrice: totalPrice,
        // })
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
    tourObjectCreate = (budget) => {
        let price = 0;
        if (this.state.transportType == 'Rental') {
            price = this.state.vehiclePrice * this.state.tripDays;
        }
        else if (this.state.transportType == 'Bus') {
            price = this.state.vehiclePrice * (this.state.tripDays - 1);
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
            selectedPoi: this.state.selectedPois,
            selectedHotel: this.state.selectedHotel,
            poiToHotelTime: this.state.poiToHotelTime,
            allTourDates: this.state.allTourDates,
            tourDay: this.state.tourDay,
            totalDays: this.state.tripDays,
            stayTime: this.state.stayTime,
            transportType: this.state.transportType,
            userid: this.state.userid,
            hotelPrice: this.state.hotelPrice,
            fuelCost: this.state.fuelCost,
            vehiclePrice: price,
            budget: budget,
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
        e.preventDefault();
        if ((this.state.tagHotelTypeValue && this.state.tagWeatherTypeValue && this.state.tagLocationTypeValue && this.state.tagTripTypeValue) == null) {
            toast.warning('Fill all the fields');
        }
        else {


            let cost = parseInt((this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice));
            let confirm;
            if (this.state.budgetExceeding) {
                confirm = window.confirm('Do you want to exceed your trip cost to ' + cost.toLocaleString() + ' PKR ?');
                if (confirm) {
                    let budget = parseInt((this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice));
                    this.tourObjectCreate(budget);
                    this.setState({
                        isDisabled: true,
                    })
                }
                else {
                    this.setState({
                        isDisabled: false,
                    })
                }
            }
            else {
                let budget = (this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice);
                this.tourObjectCreate(budget);
                this.setState({
                    isDisabled: true,
                })
            }

        }
    }
        // calculateBudget = () => {
        //    let totalPrice = (this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice);
        //     this.state.calculatedPrice= totalPrice; 
        //     console.log('calculated price ' + this.state.calculatedPrice)
        // }

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
                                        {this.state.inputDetails.stayCity == null ? this.state.selectedHotel.name : this.state.inputDetails.stayCity} (Hotel)
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
                        {this.state.budgetExceeding ? <ListItem>
                            <ListItemAvatar color="secondary">
                                <Avatar>
                                    <ScheduleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Exceeded Budget" secondary={(this.state.budget - ((this.state.vehiclePrice * this.state.tripDays) + (this.state.hotelPrice))).toLocaleString() + ' PKR'} />
                        </ListItem> : <></>}
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
                            <ListItemText primary={'Vehicle Cost ' + (this.state.inputDetails.selectedVehicle.name)} secondary={(this.state.vehiclePrice * this.state.totalDays).toLocaleString() + ` PKR (${this.state.tripDays} Days)`} />
                        </ListItem> : <></>}
                        {this.state.transportType == 'Bus' ? <ListItem>
                            <ListItemAvatar color="secondary">
                                <Avatar>
                                    <DirectionsCarIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vehicle cost" secondary={(this.state.vehiclePrice * (this.state.tripDays)).toLocaleString() + ` PKR (${this.state.tripDays - 1} Days) Including Bus Fare`} />
                        </ListItem> : <></>}

                        <ListItem>
                            <ListItemAvatar color="secondary">
                                <Avatar>
                                    <ScheduleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Total Budget" secondary={this.state.budget.toLocaleString() + ' PKR'} />
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
                        {this.state.selectedPois.map((poi, index) => <div>
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
                                                    className="card-img" style={{ height: '200px', marginleft: '-3%' }} />
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
                                        {(index == 2 || index == this.state.selectedPois.length - 1) ? this.state.poiToHotelTime[index] + ' hours' : this.state.poiTimeIntervals[index] + ' hours'}
                                    </Typography>
                                </TimelineContent>
                            </TimelineItem> {index == 2 && index != this.state.selectedPois.length - 1 ? <EndingTowardsHotel tripEnd={false} /> : index == this.state.selectedPois.length - 1 || (index + 1) % 3 == 0 ? <EndingTowardsHotel tripEnd={true} /> : <></>}</div>)}
                    </Timeline>
                    <><Alert
                        banner
                        style={{ marginLeft: '10%' }}
                        message={
                            <TextLoop mask>
                                <div>Your Trip is scheduled.</div>
                                <div>Your Trip duration is for {this.state.tripDays} days.</div>
                                <div>Save your trip.</div>
                            </TextLoop>
                        }
                    />
                        <label id="labels" style={{ position: 'relative', marginTop:'2%', marginLeft:'10%' }}>Tour Categories:</label>
                        <div style={{ position: 'relative',display: 'flex', marginLeft: '15%' }}>
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