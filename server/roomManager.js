const RoomData = require("./roomData")

class RoomManager {
    constructor(id = 0, rooms = [], roomSize = 2) {
        this.id = id
        this.rooms = rooms
        this.roomSize = roomSize
    }

    assignRoom(socket) {
        let room = this.findRoomAvailable()
        // Save the socket / client
        room.addClient(socket)
        // Only save the room if it is a new one
        !this.rooms.includes(room) && this.rooms.push(room)
        return room
    }

    findRoomAvailable() {
        let availableRooms = this.rooms.filter( room => room.clients.length < this.roomSize)
        return availableRooms.length > 0 ? availableRooms.shift() : new RoomData("Room" + Math.ceil(this.rooms.length / this.roomSize) , [], {})
    }

    removeFromRoom(client) {
        let rooms = this.rooms.filter( room => room.clients.includes(client))
        if(rooms.length == 1){
            let roomToDeleteClient = rooms.shift()
            roomToDeleteClient.players.splice(roomToDeleteClient.players.indexOf(roomToDeleteClient.getPlayer(client)), 1)
            roomToDeleteClient.clients.splice(roomToDeleteClient.clients.indexOf(client), 1)
            console.log("Final Rooms", this.rooms)
        }
        else {
            console.error("There is an error, is not possible to delete this socket, or it is in multiple rooms")
        }
    }


}

module.exports = RoomManager