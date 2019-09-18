const diameter = 50
const xwidth = 600
const yheight = 600
const rows = 7
const cols = 7
const platforMargin = 1.7

let piece = new Piece(xwidth / 2, yheight / 2, diameter, {r: 250, g: 10, b: 0})

let platform = new Platform(rows, cols, 0, 0, diameter, { r: 0, g: 0, b: 0 }, platforMargin)

function setup() {
  let canv = createCanvas(xwidth, yheight)
  canv.position(300, 100)
}

function draw() {
  background(0, 0, 255)
  platform.show()
  piece.show()
  movementOfPiece(piece)
}

let movementOfPiece = p => {
  p.x = mouseX
  p.y = mouseY
}

let putPieceOnPlatfrom = (piece, platform) => {
  let mapX = map(piece.x, 0, width, 0, rows)
  let mapY = map(piece.y, 0, height, 0, cols)
  if (floor(mapY) === rows - 1 || platform.existsNeighborAtBottom(floor(mapX), floor(mapY))) {
    platform.platform[floor(mapX)][floor(mapY)] = new Piece(piece.x, piece.y, piece.diameter, piece.color)
  }
  
}

function mouseClicked() {
  putPieceOnPlatfrom(piece, platform)
}
