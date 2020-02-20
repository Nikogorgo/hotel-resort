import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilters({rooms}) {
    const context = useContext(RoomContext);
    const {
        handleChange, 
        type, 
        capacity, 
        price,
        minPrice, 
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    // get the unique types
    let types = getUnique(rooms, 'type');
    // add the word all on top of everything
    types = ['all', ...types]
    // map to jsx
    types = types.map((item, index) => {
        return(
            <option value={item} key={index}>{item}</option>
        );
    })

    let people = getUnique(rooms, 'capacity');
    people = people.map((person, index) => {
        return(
        <option value={person} key={index}> {person}</option>
        )
    })
        
    return (
        <section className="filter-container">
            <Title title="search"/>
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">Room type</label>
                    <select
                    name="type"
                    id="type"
                    onChange={handleChange}
                    className="form-control"
                    value={type}
                >
                    {types}
                </select>
                </div>


                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                    name="capacity"
                    id="capacity"
                    onChange={handleChange}
                    className="form-control"
                    value={capacity}
                >
                    {people}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="price">Room Price ${price}</label>

                <input type="range" 
                name="price" 
                min={minPrice} 
                max={maxPrice} 
                id="price"
                value={price}
                onChange={handleChange}
                className="form-control"
                />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number"
                        name="minSize"
                        id="size"
                        value={minSize}
                        onChange={handleChange}
                        className="size-input">
                        </input>

                        <input type="number"
                        name="maxSize"
                        id="size"
                        value={maxSize}
                        onChange={handleChange}
                        className="size-input">
                        </input>
                    </div>
                </div>


                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox"
                        name="breakfast"
                        id="breakfast" 
                        checked={breakfast}
                        onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>

                    <div className="single-extra">
                        <input type="checkbox"
                        name="pets"
                        id="pets" 
                        checked={pets}
                        onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>

            </form>
        </section>
    )
}
