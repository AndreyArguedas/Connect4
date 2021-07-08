const diameter = 50
const xwidth = 600
const yheight = 600
const rows = 7
const cols = 7
const platforMargin = 1.7

let piece = new Piece(xwidth / 2, yheight / 2, diameter, { r: 250, g: 250, b: 10 })

let platform = new Platform(rows, cols, 0, 0, diameter, { r: 0, g: 0, b: 0 }, platforMargin)

let player1 = new Player(0, { r: 250, g: 250, b: 10 }, true, [])

let player2 = new Player(1, { r: 250, g: 10, b: 10 }, false, [])

let currentPlayer = null

function setup() {
  let socket = io.connect();

  socket.on("roomAssigned", (...args) => {
    console.log("Your room is" , args, "and someone has been added to this room");
  });

  let canv = createCanvas(xwidth, yheight)
  canv.position(300, 100)
  givePieces(player1, rows * cols)
  //givePieces(player2, rows * cols)

  //Starts the game
  
}

function draw() {
  background(0, 0, 255)
  platform.show()
  currentPlayer = defineCurrentPlayer(player1, player2)
  piece = currentPlayer.getCurrentPiece()
  piece.show()
  textSize(32)
  text('Player' + currentPlayer.id, 10, 30)
  movementOfPiece(piece)
}

let givePieces = (player, amount) => {
  let range = [...Array(amount).keys()]
  player.pieces = range.map(e => new Piece(width / 2, height / 2, diameter, player.color))
}

let defineCurrentPlayer = (p1, p2) => {
  return p1.hasTurn ? p1 : p2
}

let movementOfPiece = p => {
  p.x = mouseX
  p.y = mouseY
}

let putPieceOnPlatfrom = (piece, platform) => {
  let mapX = map(piece.x, 0, width, 0, rows)
  let mapY = map(piece.y, 0, height, 0, cols)
  if ((floor(mapY) === rows - 1 && floor(mapX) === cols - 1) || platform.existsNeighborAtBottom(floor(mapX), floor(mapY)) && platform.isSpaceEmpty(floor(mapX), floor(mapY))) {
    platform.platform[floor(mapX)][floor(mapY)] = new Piece(piece.x, piece.y, piece.diameter, piece.color)
    currentPlayer.hasTurn = false
    if(currentPlayer === player2){
      player1.hasTurn = true
    }
  }
  
}

function mouseClicked() {
  putPieceOnPlatfrom(piece, platform)
}
