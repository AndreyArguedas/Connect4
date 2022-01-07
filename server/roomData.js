const GameSettings = require("./settings")
let Platform = require("../model/platform")
let Player = require("../model/player")
let GameManager = require("../model/gameManager")


class RoomData {
    constructor(name = "", clients = []) {
        this.roomName = name
        // This array contains the socket clients (metadata of the socket)
        this.clients = clients
        // Players is the arrat with the abstracion of a player in the game
        this.players = []
        this.platform = new Platform(GameSettings.rows, GameSettings.cols, 0,  0, GameSettings.diameter, { r: 255, g: 255, b: 255 }, GameSettings.platforMargin)
        this.gameManager = new GameManager(this.platform.platform)
    }

    getPlatform() {
        return this.platform
    }

    getRoomName() {
        return this.roomName
    }

    getGameManager() {
        return this.gameManager
    }

    addClient(client) {
        this.clients.push(client)
        if(this.players.length === 0) {
            // This player will have the first turn since entered first to the room
            this.players.push(new Player(client.id, GameSettings.yellowColor, true))
        }
        else {
            // This player will not have the first turn since entered last to the room
            this.players.push(new Player(client.id, GameSettings.redColor, false))
        }
    }

    getPlayer(client) {
        return this.players.filter( player => player.id ===  client.id).pop()
    }

    getClients() {
        return this.clients
    }
}

module.exports = RoomData