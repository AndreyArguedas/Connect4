let Platform = require("../model/platform")
const GameSettings = require("./settings")

class RoomData {
    constructor(name = "", clients = []) {
        this.roomName = name
        this.clients = clients
        this.platform = new Platform(GameSettings.rows, GameSettings.cols, 0,  0, GameSettings.diameter, { r: 255, g: 255, b: 255 }, GameSettings.platforMargin)
    }

    getPlatform() {
        return this.platform
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