const diameter = 25
const xwidth = 600
const yheight = 600

let piece = new Piece(xwidth / 2, yheight / 2, diameter, {r: 250, g: 10, b: 0})

let platform = new Platform(7, 7, 0, 0, 50,{r: 0, g: 0, b: 0}, 1.7)

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
