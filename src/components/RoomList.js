import React from 'react'
import Room from './Room'

export default function RoomList({rooms}) {

    if (rooms.length === 0){
        return (
            <div className = "emptySearch">
                <h3>No rooms founds</h3>
            </div>
        )
    }
    
    return (
        <section className="roomsist">
            <div className="roomslist-center">
                {rooms.map((room) => {
                    return <Room key={room.id} room={room}></Room>
                })}
            </div>
        </section>
    )
}
