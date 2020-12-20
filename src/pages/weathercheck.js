import React, { Component } from 'react'
import Weather from '../components/weather';
import Header from '../components/header';
import Footer from '../components/footer';
import Search from '../components/search';
export default class weathercheck extends Component {
    render() {
        return (
            <div>
                <Header />
                <Search />
                <Weather />
                <Footer />
            </div>
        )
    }
}
