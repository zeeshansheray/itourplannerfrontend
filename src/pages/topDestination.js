import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer'; 
import Search from '../components/search';
import TopDestination from '../components/destination';

export default class topDestination extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Search/>
                <TopDestination/>
                <Footer/>
            </div>
        )
    }
}
