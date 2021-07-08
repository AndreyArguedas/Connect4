class RoomData {
    constructor(name = "", clients = [], gameData = {}) {
        this.roomName = name
        this.clients = clients
        this.gameData = gameData
    }
}

module.exports = RoomData