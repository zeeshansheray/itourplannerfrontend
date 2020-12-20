import React, { Component } from 'react';
// import { Timeline } from 'antd';
import '../componentcss/tourGenerator.css';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
export default class temp extends Component {
    render() {
        return (
            <div id="tourgeneratorBox">
                <h4 >Islamabad</h4>
                <h3 style={{ textAlign: 'center' }}>Day 1</h3>
                <Timeline style={{ marginLeft: '-80%' }}>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot>
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Serena Hotel
            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;&nbsp;9:00 am
          </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <DirectionsCarIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;&nbsp;9:30 am
          </Typography>
                        </TimelineContent>
                    </TimelineItem>
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
                                            //src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${'ATtYBwLAPTfowIechgm55hd0NewhM21JjCRIqlRmnWPfxhwULAem_G4grkZY4nEo10jZq36-exBA4JtBt-p9EwbXsPDmQ0SRgO1TViMfEvivhJgN9exocTFpTp9wac38-ZimHwAe5RzDw55PBrsvfLSOc1nalJb2ISLIvJp4moMfEqUTuirP'}&sensor=false&maxheight=200&maxwidth=200&key=AIzaSyD0FFwKL9zAZIpjkM9zf7CKQeNoFUIE6Ss`}
                                            className="card-img" style={{ height: '200px' }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title" style={{ color: '#001529', wordBreak: 'break-all' }}>First POI Name</h4>
                                            <Typography style={{color:'black'}}>
                                                12.00pm
            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                &nbsp;04:00pm
          </Typography>

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
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography>
                                Driving
            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                &nbsp;&nbsp;9:30 am
          </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
        )
    }
}
