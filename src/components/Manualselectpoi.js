/*global google*/
import React, { Component, useState } from 'react';
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
import { Spin } from 'antd';


import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    InfoWindow,
} from 'react-google-maps';
import { DeleteOutline, PanoramaRounded } from '@material-ui/icons';
export default class Manualselectpois extends Component {
    constructor() {
        super();
        this.state = {
            POIS: [],
            isLoading: true,
            errors: null,
            destination: localStorage.getItem('destination'),
            Lat: null,
            Lng: null,
            selectedLocations: [],
            selectionDone: false,
        };
        // this.initialize = this.initialize.bind(this);
        this.savePOI = this.savePOI.bind(this);
        this.resetPOIS = this.resetPOIS.bind(this);
        this.poiView = this.poiView.bind(this);
    }

    initMap = (POIS) => {
        let map = new google.maps.Map(document.getElementById("mapcanvas"), {
            center: new google.maps.LatLng(this.state.POIS[0].latLng[0].lat, this.state.POIS[0].latLng[0].lng),
            zoom: 10.1,
        });
        var icons = {
            poi: {
                icon: <PlaceIcon />,
            }
        };

        for (var i = 0; i < POIS.length; i++) {
            //var poiDetails = '<h4>' + '<strong>' + POIS[i].name + '</strong>' + "<br/>" + 'Address: ' + POIS[i].address + "</br>" + "Ratings: " + POIS[i].rating + "/5" + "</br>" + "Total Ratings: " + POIS[i].totalRating + " people" + '</h4>'
            var poiDetails = '<ul>' + '<strong>' + POIS[i].name + '</strong>' + '<li>' + '<strong>Address: </strong>' + POIS[i].address + '</li>' + '<li>' + '<strong>Ratings: </strong>' + POIS[i].rating + " /5" + '</li>' + '<li>' + '<strong>Total Ratings: </strong>' + POIS[i].totalRating + " people" + '</li>'+ '</ul>'
            const marker = new google.maps.Marker({
                position: POIS[i].latLng[0],
                icon: icons[POIS[i].type].icon,
                map: map,
            })
            console.log("lat lngL " + JSON.stringify(POIS[i].latLng[0]));
            const infowindow = new google.maps.InfoWindow({
                content: poiDetails,
                val: POIS[i],
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
                    for (var i = 0; this.state.selectedLocations.length > 0 && i < this.state.selectedLocations.length; i++) {
                        console.log('For loop is working');
                        console.log('selected location length is ' + this.state.selectedLocations[i].name);
                        if (this.state.selectedLocations[i].name.match(infowindow.val.name)) {
                            alreadySelected = true;
                            console.log('Loop Already select is ' + alreadySelected);
                        }
                    }
                    console.log('The value to compare is ' + infowindow.val.name);
                    console.log('Already select is ' + alreadySelected);
                    var poiSelect = window.confirm('Do you want to select ' + infowindow.val.name);
                    if (poiSelect && !alreadySelected) {
                        // this.state.selectedLocations.push(infowindow.val)
                        this.setState(prevState => ({
                            selectedLocations: [...prevState.selectedLocations, infowindow.val]
                        }))
                        console.log(this.state.selectedLocations);

                    }
                    else if (alreadySelected) {
                        window.alert('The location is already selected');
                    }
                });



            }


        }

    }

    async savePOI(e) {
        e.preventDefault();
        if (this.state.selectedLocations == 0) {
            window.alert('Select POI\'s first');
        }
        else {
            console.log('new locations' + this.state.selectedLocations);
            await this.setState({ selectionDone: true })
            console.log('selection is ' + this.state.selectionDone);
            await this.initMap(this.state.selectedLocations);
            await this.viewPOIRoute();
        }
    }
    async resetPOIS(e) {
        e.preventDefault();
        console.log('Reset is clicked');
        await this.setState({ selectedLocations: [], selectionDone: false });
        await this.initMap(this.state.POIS);
        console.log('Reset destinations are ' + this.state.selectedLocations);
    }
    viewPOIRoute = () => {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var infowindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById('mapcanvas'), {
            zoom: 10,
            center: new google.maps.LatLng(this.state.Lat, this.state.Lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        directionsDisplay.setMap(map);
        var i;
        var request = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for (i = 0; i < this.state.selectedLocations.length; i++) {
            const marker = new google.maps.Marker({
                position: this.state.selectedLocations[i].latLng[0],
            });
            if (i == 0) request.origin = marker.getPosition();
            else if (i == this.state.selectedLocations.length - 1) request.destination = marker.getPosition();
            else {
                if (!request.waypoints) request.waypoints = [];
                request.waypoints.push({
                    location: marker.getPosition(),
                    stopover: true
                });
            }

        }
        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
        localStorage.setItem('selectedpoi', JSON.stringify(this.state.selectedLocations));
        localStorage.setItem('destinationLat', this.state.Lat);
        localStorage.setItem('destinationLng', this.state.Lng);
    }
    async poiRemove(poiname) {
        console.log('Remove is working working');
        if (this.state.selectedLocations.length > 2) {
            await this.setState({
                selectedLocations: this.state.selectedLocations.filter(poi => poi.name !== poiname)
            })
            console.log(poiname + ' have been removed sucessfuly');
            await this.viewPOIRoute(this.state.selectedLocations);
        }
        else if (this.state.selectedLocations.length <= 2) {
            await this.setState({
                selectedLocations: this.state.selectedLocations.filter(poi => poi.name !== poiname)
            })
            if (this.state.selectedLocations.length == 0) {
                await this.setState({ selectedLocations: [], selectionDone: false });
                await this.initMap(this.state.POIS);
            }
            console.log(poiname + ' have been removed sucessfuly');
        }

    }
    poiView(lat, lng) {
        const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("map"),
            {
                position: { lat: lat, lng: lng },
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER,
                },
                linksControl: false,
                panControl: false,
                enableCloseButton: false,
            }
        );
        // console.log(JSON.stringify(panorama));

    }
    async componentWillMount() {
        //getting location lat and longitute
        if(localStorage.getItem('selectedpoi')==null) {
            await this.setState({
                selectedLocations: [],
            })
        }
        else{
            await this.setState({
                selectedLocations: JSON.parse(localStorage.getItem('selectedpoi')),
            })
        }
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: this.state.destination }, (results, status) => {
            if (status === 'OK') {
                console.log(results);
                try {
                    this.setState({
                        Lng: results[0].geometry.bounds.Sa.j,
                        Lat: results[0].geometry.bounds.Ya.i,
                    });
                    console.log(
                        this.state.Lat.toPrecision(7),
                        this.state.Lng.toPrecision(7)
                    );
                }
                catch (err) {

                }

            }
        })
        //https://cors-anywhere.herokuapp.com/
        axios
            .get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.destination}+point+of+interest&language=en&key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss`,
            {
                headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
        )
            .then(response =>
                response.data.results.map(poi => ({
                    name: poi.name,
                    address: poi.formatted_address,
                    latLng: [{ lat: poi.geometry.location.lat, lng: poi.geometry.location.lng }],
                    rating: poi.rating,
                    totalRating: poi.user_ratings_total,
                    photo: poi.photos == undefined ? " " : poi.photos[0].photo_reference,
                    type: "poi",
                }))
            )
            .then(POIS => {
                this.setState({
                    POIS,
                    isLoading: false
                });
                this.initMap(this.state.POIS);
                console.log("data: POIS" + JSON.stringify(this.state.POIS));
                console.log("Length: POIS" + this.state.POIS.length);
            })
    }

    render() {
        return (
            <div>
                <div id="mapcanvas" style={{ marginLeft: '12%', position: 'relative', height: '400px', width: '600px' }}>
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
                    onClick={this.resetPOIS}
                    startIcon={<AutorenewIcon />}
                    style={{ position: 'absolute', left: '62.5%', top: '61.3%' }}
                >
                    Reset
      </Button>
                <Button
                    variant="contained"
                    color="default"
                    size="small"
                    startIcon={<PlaceIcon />}
                    style={{ position: 'absolute', left: '62.3%', top: '67%' }}
                    onClick={this.savePOI}
                >
                    Route
      </Button>
                <div className="selectedpoiList" style={{ width: '20%', position: 'absolute', top: '53%', left: '71%', backgroundColor: "#E8E8E8", color: "black" }}>
                    <h4 style={{ paddingTop: '4%', backgroundColor: '#001529', height: '40px', paddingLeft: '5%', color: 'white' }}>Selected POIS <PlaceIcon style={{ verticalAlign: '-5px', color: 'white' }} /></h4>
                    <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {this.state.selectedLocations.length != 0 ? this.state.selectedLocations.map((POI, index) => {
                            const labelId = `checkbox-list-label-${POI}`;
                            return (
                                <ListItem key={POI} role={undefined} dense>
                                    <span style={{ width: '80%' }}>
                                        <ListItemText disabled id={labelId} primary={(index + 1) + '. ' + POI.name} /></span>
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={this.poiRemove.bind(this, POI.name,)} aria-label="comments">
                                            <DeleteOutline />
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => { this.poiView(POI.latLng[0].lat, POI.latLng[0].lng) }} data-toggle="modal" data-target="#exampleModalCenterr" aria-label="comments">
                                            <VisibilityIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        }) :
                            <ListItem role={undefined} dense onClick={() => { }}>
                                <ListItemText style={{ textAlign: 'center' }} disabled primary={`None Selected`} />
                            </ListItem>}
                    </List>
                </div>
                <div class="modal fade" id="exampleModalCenterr" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle" style={{ color: '#005129', marginLeft: '8%', fontFamily: '"Titillium Web", "sans-serif"' }}> 360° View</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" id='map' style={{ height: '400px', width: '400px', marginLeft: '50px' }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
