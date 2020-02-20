import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Sevices extends Component {

    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "Free Coctails",
                info: "dummy info"
            },
            {
                icon: <FaHiking/>,
                title: "Hiking",
                info: "dummy info"
            },
            {
                icon: <FaShuttleVan/>,
                title: "ShuttleVan",
                info: "dummy info"
            },
            {
                icon: <FaBeer/>,
                title: "Beer",
                info: "dummy info"
            }
        ]
    }

    render() {
        return (

            <section className="services">
                <Title title="Services"/>
                {this.state.services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                        )
                })}
             </section>
             
        )
    }
}
