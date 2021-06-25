class Player {
    constructor(id = 0, color = { r: 0, g: 0, b: 0 }, hasTurn = false, pieces = []) {
        this.id = id
        this.color = color
        this.pieces = pieces
        this.hasTurn = hasTurn
    }

    getCurrentPiece() {
        return this.pieces.slice(-1).pop()
    }
}