import React from 'react'
import RoomFilters from './RoomFilters'
import RoomList from './RoomList'
import {withRoomConsumer} from '../context'
import Loading from './Loading'
import styled from 'styled-components'



function RoomContainer ({context}){
    const {loading, sortedRooms, rooms} = context;          
    if(loading){
        return <Loading/>
    }
    return (
        <div> 
            <RoomFilters rooms={rooms}/>
            <RoomList rooms={sortedRooms}/>
        </div>
    )
}
export default withRoomConsumer(RoomContainer);






// export default function RoomsContainer() {
//     return (
//         <RoomConsumer>
//         {
//             (value) => {
//                 const {loading, sortedRooms, rooms} = value;
                
//                 if(loading){
//                     return <Loading/>
//                 }

//                 return (
//                     <div> 
//                         <RoomFilters rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                 )
//             }
//         }
//         </RoomConsumer>
        
//     )
// }
