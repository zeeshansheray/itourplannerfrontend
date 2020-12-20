import React, { Component } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import Sidebar from '../components/Sidebar';
import '../App.css';

const userProfile = () => { 
    return (
        <div>
            <Header />
            <Search />
            <Sidebar/>
        </div>
    );
}

export default userProfile;