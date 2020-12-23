/*global google*/
import React, { Component, useState, createContext } from 'react';
import Geocode from "react-geocode";
import axios from 'axios';
import '../componentcss/plantrip.css';
import '../componentcss/manualtrip.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import HotelIcon from '@material-ui/icons/Hotel';
import pagenotfound from '../images/image-not-found.jpg';

import { Spin } from 'antd';

import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    InfoWindow,
} from 'react-google-maps';
import { DeleteOutline, PanoramaRounded } from '@material-ui/icons';

const SelectedHotels = createContext();

export default class Manualselecthotels extends Component {
    constructor() {
        super();
        this.state = {
            Hotels: [],
            loading: true,
            errors: null,
            destination: localStorage.getItem('destination'),
            Lat: null,
            Lng: null,
            selectedLocations: localStorage.getItem('selectedpoi'),
            selectionDone: false,
            selectedHotels: [],
        }
        this.resetHotels = this.resetHotels.bind(this);


    }
    initMap = (Hotels) => {
        let map = new google.maps.Map(document.getElementById("mapcanvas"), {
            //center: new google.maps.LatLng(this.state.hotels[0].latLng[0].lat, this.state.hotels[0].latLng[0].lng),
            center: new google.maps.LatLng(this.state.Lat, this.state.Lng),
            zoom: 9,
        });
        for (var i = 0; i < Hotels.length; i++) {
            //var poiDetails = '<h4>' + '<strong>' + POIS[i].name + '</strong>' + "<br/>" + 'Address: ' + POIS[i].address + "</br>" + "Ratings: " + POIS[i].rating + "/5" + "</br>" + "Total Ratings: " + POIS[i].totalRating + " people" + '</h4>'
            var hotelDetails = '<ul>' + '<li>' + '<strong>' + Hotels[i].name + '</strong>' + '</li>' + '<li>' + '<strong>Address: </strong>' + Hotels[i].address + '</li>' + '<li>' + '<strong>Ratings: </strong>' + (Hotels[i].rating==undefined ? 'Not avaliable' : Hotels[i].rating + " /5" )  + '</li>' + '<li>' + '<strong>Total Ratings: </strong>' + (Hotels[i].totalRating==undefined ? 'Not avaliable' : Hotels[i].totalRating)  + " people" + '</li>' + '<li>' + '<strong>Price: </strong>' + (Hotels[i].price==undefined ? 'Not avaliable' : Hotels[i].price)  + '</li>' + '</ul>'
            const marker = new google.maps.Marker({
                position: Hotels[i].latLng[0],
                //icon: icons[Hotels[i].type].icon,
                map: map,
            })
            console.log("lat lngL " + JSON.stringify(Hotels[i].latLng[0]));
            const infowindow = new google.maps.InfoWindow({
                content: hotelDetails,
                val: Hotels[i],
            });

            marker.addListener("mouseover", () => {
                infowindow.open(map, marker);
            });
            marker.addListener("mouseout", () => {
                infowindow.close(map, marker);
            });
            if (!this.state.selectionDone) {
                marker.addListener('click', () => {
                    console.log('Selection is ' + this.state.selectionDone);
                    var alreadySelected = false;
                    for (var i = 0; this.state.selectedHotels.length > 0 && i < this.state.selectedHotels.length; i++) {
                        console.log('For loop is working');
                        console.log('selected location length is ' + this.state.selectedHotels[i].name);
                        if (this.state.selectedHotels[i].name.match(infowindow.val.name)) {
                            alreadySelected = true;
                            console.log('Loop Already select is ' + alreadySelected);
                        }
                    }
                    console.log('The value to compare is ' + infowindow.val.name);
                    console.log('Already select is ' + alreadySelected);
                    console.log('length of ' + this.state.selectedHotels.length);
                    if (!alreadySelected) {
                        //this.state.selectedLocations.push(infowindow.val)
                        if (this.state.selectedHotels.length == 0) {
                            var hotelSelect = window.confirm('Do you want to select ' + infowindow.val.name);
                            if(hotelSelect){
                            this.setState(prevState => ({
                                selectedHotels: [...prevState.selectedHotels, infowindow.val]
                            }))
                            console.log(JSON.stringify(this.state.selectedHotels));
                            localStorage.setItem('selectedhotel', JSON.stringify(this.state.selectedHotels));
                        }}
                        else {
                            window.alert('You can only select 1 hotel');
                        }
                    }
                    else if (alreadySelected) {
                        window.alert('The location is already selected');
                    }

                });



            }


        }


    }
    async resetHotels(e) {
        e.preventDefault();
        console.log('Reset is clicked');
        await this.setState({ selectedHotels: [], selectionDone: false });
        await this.initMap(this.state.Hotels);
    }
    async componentDidMount() {
        if(localStorage.getItem('selectedhotel')==null) {
            await this.setState({
                selectedHotels: [],
            })
        }
        else{
            await this.setState({
                selectedHotels: JSON.parse(localStorage.getItem('selectedhotel')),
            })
        }

        Geocode.setApiKey("AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss");
        Geocode.setLanguage("en");
        Geocode.setRegion("es");
        Geocode.enableDebug();

        await Geocode.fromAddress(this.state.destination).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    Lat: lat.toFixed(4),
                    Lng: lng.toFixed(4),
                })
                console.log('Geocoder is run first');
                console.log(this.state.Lat)
            },
            error => {
                console.error(error);
            }
        );
        var ind = 0;
        axios
            .get(
                `https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=PKR&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${this.state.Lat}%252C${this.state.Lng}&adults=1&checkin=2020-12-31&rooms=1&nights=2&maxResults=24`,
                {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                        'x-rapidapi-key':
                            '4b9bc97b37msh97a76aea744c532p1e8e09jsndbeae1f178a3',
                    },
                }
            ).then(response =>
                response.data.data.map((hotel, index) => ({
                    name: hotel.name,
                    address: hotel.location_string,
                    latLng: [{ lat: parseFloat(hotel.latitude), lng: parseFloat(hotel.longitude) }],
                    rating: hotel.rating,
                    totalRating: hotel.num_reviews,
                    price: hotel.price,
                    image: hotel.photo,
                    type: "hotel",
                }),
                    console.log(JSON.stringify(response.data))
                )

            ).then(Hotels => {
                this.setState({
                    Hotels,
                    loading: false,
                });

                let filteredHotels = this.state.Hotels.filter(hotel => hotel.price != undefined);
                this.setState({
                    Hotels: filteredHotels,
                })

                this.initMap(this.state.Hotels);

                console.log("data: Hotels" + JSON.stringify(this.state.Hotels));
                console.log("Length: Hotels" + this.state.Hotels.length);
            })
    }


    async hotelRemove(hotelname) {
        await this.setState({
            selectedHotels: this.state.selectedHotels.filter(hotel => hotel.name !== hotelname)
        })
        localStorage.removeItem('selectedhotel');
        console.log(hotelname + ' have been removed sucessfuly');
    }
    render() {
        return (
            <div>
                <SelectedHotels.Provider value={'zeeshan'}>
                    {this.state.loading == true ? <div style={{ marginLeft: '35%', position: 'relative', height: '300px', width: '600px' }}> <Spin style={{ marginTop: '30%', marginLeft:'30%' }} /></div> : <div><div id="mapcanvas" style={{ marginLeft: '12%', position: 'relative', height: '300px', width: '600px' }}>
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
                    </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={this.resetHotels}
                            startIcon={<AutorenewIcon />}
                            style={{ position: 'absolute', left: '62.5%', top: '61.3%' }}
                        >
                            Reset
      </Button></div>}
                    <p id="totalHotels" style={{ color: 'white', fontFamily: 'sans-serif', float: 'left', marginLeft: '3%', marginTop: '3%', padding: '8px', backgroundColor: '#001529', height: '40%', width: '13.2%', opactity: '0.9', boxShadow: '10px, 10px, 5px,#ccc' }}>We found <span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>{this.state.loading == true ? <Spin style={{ marginLeft: '2%' }} /> : this.state.Hotels.length}</span><br /> hotels in <span style={{ fontWeight: 'bold' }}>{this.state.destination}</span></p>
                    <div id="allHotels" style={{ marginTop: '3%', height: '200px', width: '820px', overflowY: 'auto', overflowX: 'hidden' }}>
                        {this.state.Hotels.map((hotel) => <div className="card mb-3" style={{ marginLeft: '-3%', boxShadow: '10px, 10px, 5px,#ccc', height: '201px', width: '830px', display: 'inline-block' }}>
                            <div className="row no-gutters" id="singlehotelCard">
                                <div className="col-md-4">
                                    <img
                                        src={hotel.image === undefined
                                            ? pagenotfound
                                            : hotel.image.images.small.url}
                                        className="card-img" style={{ height: '200px',marginLeft:'-2px' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ color: '#001529', wordBreak: 'break-all' }}>{hotel.name}</h4>
                                        {hotel.rating === undefined || hotel.rating < 1 ? <p style={{ textAlign: 'right', marginTop: '-6%', color: '#001529' }}>Not available</p> : <p style={{ textAlign: 'right', marginTop: '-6%', color: '#001529' }}>{hotel.rating > 4.5 ? 'Excellent' : hotel.rating > 3.5 ? 'Good' : 'Fine'}<span style={{ backgroundColor: '#001529', borderRadius: '5px', color: 'white', padding: '5px' }}><strong >{hotel.rating}</strong></span></p>}
                                        <p className="card-text" style={{ color: '#001529', marginTop: '-4%', marginLeft: '0%' }}><small style={{ color: '#001529' }}><PlaceIcon style={{ color: '#005129', fontSize: '12px', verticalAlign: '-1%' }} />{hotel.address}</small></p>
                                        {hotel.price === undefined ? <p style={{ color: '#001529', marginTop: '-3%', textAlign: 'right', fontSize: '18px' }}>Prices not available</p> : <p style={{ color: '#001529', marginTop: '-3%', textAlign: 'right', fontSize: '18px' }}>{hotel.price}</p>}
                                        <p style={{ textAlign: 'right', marginTop: '-4%', color: '#001529', fontSize: '14px' }}><small>Per Night</small></p>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            disaled
                                            startIcon={<HotelIcon />}
                                            style={{ position: 'absolute', color: 'white', left: '75%', backgroundColor: 'green' }}
                                        //onClick={this.savePOI}
                                        >
                                            Available
      </Button>

                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <div className="selectedhotelsList" style={{ width: '20%', position: 'absolute', top: '53%', left: '71%', backgroundColor: "#E8E8E8", color: "black" }}>
                        <h4 style={{ paddingTop: '4%', backgroundColor: '#001529', height: '40px', paddingLeft: '5%', color: 'white' }}>Selected Hotels <PlaceIcon style={{ verticalAlign: '-5px', color: 'white' }} /></h4>
                        <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {this.state.selectedHotels.length != 0 ? this.state.selectedHotels.map((Hotel, index) => {
                                const labelId = `checkbox-list-label-${Hotel}`;
                                return (
                                    <ListItem key={Hotel} role={undefined} dense>
                                        <ListItemText disabled id={labelId} primary={(index + 1) + '. ' + Hotel.name} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" onClick={this.hotelRemove.bind(this, Hotel.name,)} aria-label="comments">
                                                <DeleteOutline />
                                            </IconButton >
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            }) :
                                <ListItem role={undefined} dense onClick={() => { }}>
                                    <ListItemText style={{ textAlign: 'center' }} disabled primary={this.state.loading ? <Spin /> : `None Selected`} />
                                </ListItem>}
                        </List>
                    </div></SelectedHotels.Provider>
            </div>
        )
    }
}

export { SelectedHotels };