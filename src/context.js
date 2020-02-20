import React, { Component } from 'react'
import items from './data'
import Client from './Contentful'


Client
  .getEntries({
      content_type: 'resortProject'
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
const RoomContext = React.createContext();

class RoomProvider extends Component {

    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }

    getData = async () => {
        try{
            let res = Client.getEntries({
                content_type: 'resortProject' 
            })
            let rooms = this.formatData(res.items);
            let featuredRooms =  rooms.filter(room => room.featured === true);

            let maxPrice = Math.max(...rooms.map(room => room.price) )
            let maxSize = Math.max(...rooms.map(room => room.size))
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms:rooms,
                loading:false,
                price:maxPrice,
                maxPrice:maxPrice,
                maxSize:maxSize
            })
        
        }catch(error){
            console.error(error);
        }
    }

    componentDidMount(){
        this.getData();
    }

    formatData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id;

            let images = item.fields.images.map(image => 
                image.fields.file.url);     

            let room = {...item.fields,images,id};
            return room;
        });
        return tempItems;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        this.setState(
            {
                [name]: value
            },
                this.filterRooms
            );
        }

    filterRooms = () => {
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state

        capacity = parseInt(capacity);
        price = parseInt(price);

        // filter by type
        let tempRooms = [...rooms];
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        // filter by capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price)
        
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        this.setState({
            sortedRooms:tempRooms
        })


        
    } 

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    render() {
        return (
            <div>
                <RoomContext.Provider value={{...this.state, getRoom:this.getRoom}}>
                    {this.props.children}
                </RoomContext.Provider>
            </div>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
        <RoomConsumer>
            {value => <Component {...props} context={value}/> }
        </RoomConsumer>
        )
    }
}


export {RoomProvider, RoomConsumer, RoomContext}