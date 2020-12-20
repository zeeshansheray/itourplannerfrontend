import React, { Component } from 'react';
import '../componentcss/plantrip.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Box from '@material-ui/core/Box';
import ManualTrip from './Manualtrip';
import AutomatedTrip from './Automatedtrip';

import {
    EditOutlined,
    SettingOutlined,
} from '@ant-design/icons';

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
                <Box p={3}>
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '42%',
        backgroundColor: theme.palette.background.paper,
        marginTop: '12%',
        marginLeft: '28%'
    },
}));

function manualTripFunction() {
    ReactDOM.render(<ManualTrip />, document.getElementById('content'))
}
function automatedTripFunction() {
    ReactDOM.render(<AutomatedTrip />, document.getElementById('content'));
}

export default function Plantrip(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    localStorage.setItem('userid', props.userId);

    return (
        <div className="canvastransport" id="transportId" style={{ height: '700px' }}>
            <h3>Plan Your Tour</h3>
            <div id="content">
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="off"
                            aria-label="scrollable prevent tabs example"
                        >
                            <Tab icon={<FlightTakeoffIcon />} aria-label="phone" {...a11yProps(0)} />
                            <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
                            <Tab icon={<PersonPinIcon />} aria-label="person" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className="outlineplan" style={{ width: '67%' }}>
                            <div className="plantripservice" onClick={automatedTripFunction} >
                                <SettingOutlined id="icons" className="icon_automated" style={{ fontSize: '40px', marginTop: '-20px', color: 'white', marginLeft: '43%' }} />
                                <h2>Automated Tour</h2>
                                <p>Let our system to design an exciting tour for you.</p>
                            </div>
                            <span style={{ marginLeft: '50px' }}></span>
                            <div className="plantripservice" onClick={manualTripFunction}>
                                <EditOutlined id="icons" className="icon_manualtrip" style={{ fontSize: '40px', marginTop: '-20px', color: 'white', marginLeft: '43%' }} />
                                <h2>Manual Tour</h2>
                                <p>Design your tour, with your own considerations.</p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
      </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
      </TabPanel>
                </div>
            </div>
        </div>
    )
}
