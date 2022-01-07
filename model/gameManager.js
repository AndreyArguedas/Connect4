class GameManager {

    constructor(platform = [], gameCondition = 4) {
        this.platform = platform
        this.gameCondition = gameCondition
    }

    isGameFinished(lastRow, lastCol) {
        //We get the last piece
        let lastPiece = this.platform[lastRow][lastCol]
        let lastPieceColor = lastPiece.color

        let quantity = Array.from(new Array(this.gameCondition), (x, i) => i)

        console.log(quantity)

        let result
        
        //Check row from left to right
        if(lastCol + this.gameCondition <= this.platform.length) {
            result = quantity.every( element => this.platform[lastRow][lastCol + element] && this.platform[lastRow][lastCol + element].color === lastPieceColor)
            console.log("ltr", result)
        }

        //Check row from right to left
        if(lastCol - this.gameCondition >= 0) {
            result = quantity.every( element => this.platform[lastRow][lastCol - element] && this.platform[lastRow][lastCol - element].color === lastPieceColor)
            console.log("rtl", result)
        }

        return false
    }

}

module.exports = GameManager