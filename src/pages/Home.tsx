import React from 'react';
import "../styles/master.css";
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import Posts from '../components/Posts';

const Home = () => {
    return (
        <div className='set-page'>
            <Navbar />
            <Posts />
            <Pagination />
        </div>
    )
}

export default Home
