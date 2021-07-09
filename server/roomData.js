class RoomData {
    constructor(name = "", clients = [], gameData = {}) {
        this.roomName = name
        this.clients = clients
        this.gameData = gameData
    }

    getRoomName() {
        return this.roomName
    }

    addClient(client) {
        this.clients.push(client)
    }

    getClients() {
        return this.clients
    }
}

module.exports = RoomData