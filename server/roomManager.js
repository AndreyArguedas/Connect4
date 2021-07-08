class RoomManager {
    constructor(id = 0, rooms = []) {
        this.id = id
        this.rooms = rooms
    }

    assignRoom() {
        console.log("I will assign room");
    }
}

module.exports = RoomManager