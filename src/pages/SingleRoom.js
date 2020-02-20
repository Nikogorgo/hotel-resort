import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }

    static contextType = RoomContext;
    

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        
        if(!room){
            return <div className="error">

                <h3>No rooms found</h3>
                <Link to="/rooms" className="btn-primary">Back</Link>
            </div>
        }
        
        const {name, description, 
                capacity, size, price, extras,
                breakfast,pets,images} = room; 

        const [mainImg, ...defaultImg] = images;
        console.log(extras);
        // mainImg is the first image
        // defaultImg are the rest of the images 
        return (
            <>
            <StyledHero img={mainImg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">back</Link>
                </Banner>
            </StyledHero>

            <section className="singleRoom">
                <div className="single-room-images">
                    {defaultImg.map((item,index)=> {
                        return <img key={index} src={item} alt={name}/>                        
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Details</h3>
                        <p>{description}</p>
                    </article> 
                    <article className="info">
                        <h3>Info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size} m2</h6>
                        
                        <h6>max capacity: {""}
                            {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                        </h6>
                                
                        <h6>{pets ? "pets allow" : "pets not allowed"}</h6>
                        <h6>{breakfast && "Breakfast Included free of charge"}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
            <h6>extras</h6>
            <ul>
                {extras.map((item,index) =>{
                return <li key={index}>{item}</li>
                })}
            </ul>
            </section>
            </>
        )
    }
}
