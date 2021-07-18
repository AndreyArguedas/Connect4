let gameSettings

//let piece = new Piece(xwidth / 2, yheight / 2, diameter, { r: 250, g: 250, b: 10 })

let platform = null

//let player = null;

//let player2 = new Player(1, { r: 250, g: 10, b: 10 }, false, [])

//let currentPlayer = null

function setup() {
  let socket = io.connect()

  socket.on("roomAssigned", args => {
    console.log("Your room is" , args, "and someone has been added to this room")

    //Assign the game settings coming from the server
    gameSettings = args.settings

    //Assign the platform coming form the server
    platform = args.platform
    
    let canv = createCanvas(gameSettings.xwidth, gameSettings.yheight)

    canv.position(gameSettings.xCanvaPosition, gameSettings.yCanvaPosition)
  });

  //player = new Player(socket.id, { r: 250, g: 250, b: 10 }, false, [])
  
  //givePieces(player, rows * cols)

  //socket.emit('playerReady',data);

  //Starts the game
  
}

function draw() {
  background(0, 0, 255)
  showPlatform(platform)
  //platform.show()
  //currentPlayer = defineCurrentPlayer(player1, player2)
  //piece = currentPlayer.getCurrentPiece()
  //piece.show()
  //textSize(32)
  //text('Player' + currentPlayer.id, 10, 30)
  //movementOfPiece(piece)
}

let showPlatform = (gamePlatform) => {
  if(gamePlatform) {
    gamePlatform.platform.forEach((row, i) =>
      row.forEach((piece, j) =>
        piece === null ? showEmptySpace(gamePlatform, i, j) : piece.show()
      )
    )
  }
}
    

let showEmptySpace = (gamePlatform, row, col) => {
    let { r, g, b } = gamePlatform.color
    fill(255) //Change
    stroke(r, g, b)
    circle(
      row * gamePlatform.dimension * gamePlatform.margin + gamePlatform.dimension,
      col * gamePlatform.dimension * gamePlatform.margin + gamePlatform.dimension,
      gamePlatform.dimension
    )
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
  //putPieceOnPlatfrom(piece, platform)
}
