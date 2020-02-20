import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Sevices';
import FeaturedRooms from '../components/FeaturedRooms';
import Button from '../components/StyledHero';

export const Home = () => {
    return (
        <>
        <Hero>
            <Banner title="Luxurious rooms"   subtitle="Since 2019">
            <Link to="/rooms" className="btn-primary">Our rooms</Link>
            </Banner>
        </Hero>
        <Services/>
        <FeaturedRooms/>

        <Button>Hi button</Button>
        </>
    )
}

export default Home;