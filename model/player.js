class Player {
    constructor(id = 0, color = { r: 0, g: 0, b: 0 }, hasTurn = false) {
        this.id = id
        this.color = color
        this.pieces = []
        this.hasTurn = hasTurn
    }
}

module.exports = Player