let gameSettings

let piece = null

let platform = null

let player = null

let socket = null

let currentRoom = null

let players = null

function setup() {
  socket = io.connect()

  socket.on("roomAssigned", args => {
    console.log("Your room is" , args, "and someone has been added to this room")
    
    if(socket.id === args.player.id) {

      //Assign the player server data to the client
      player = args.player

      //Assign the game settings coming from the server
      gameSettings = args.settings

      //Assign the platform coming form the server
      platform = args.platform
      
      //Current Room, this can change if the rival disconnects
      currentRoom = args.roomName

      //Players across all rooms
      players = args.connectedPlayers
    
      let canv = createCanvas(gameSettings.xwidth, gameSettings.yheight)

      canv.position(gameSettings.xCanvaPosition, gameSettings.yCanvaPosition)

      givePieces(player, gameSettings.rows * gameSettings.cols)
    }

  });

  socket.on("gameUpdated", args => {

    console.log("The game has been updated")

    //We update the platform to reflect the changes
    platform = args.platform

    player.hasTurn = !player.hasTurn

    //Players across all rooms
    players = args.connectedPlayers

  });
  
}

function draw() {
  background(0, 0, 255)
  if(platform && gameSettings && player) {
    showPlatform(platform)
    piece = player.pieces.slice(-1).pop()
    showPiece(piece)
    textSize(gameSettings.textSize)
    text('Player: ' + player.id, 10, 30)
    text(currentRoom, 10, height - 10)
    text('Players:' + players, 400, height - 10)
    movementOfPiece(piece)
  }
}

let showPlatform = (gamePlatform) => {
    gamePlatform.platform.forEach((row, i) =>
      row.forEach((piece, j) =>
        piece === null ? showEmptySpace(gamePlatform, i, j) : showPiece(piece)
      )
    )
}

let showPiece = (piece) => {
    let actualColor = piece.color
    fill(actualColor.r, actualColor.g, actualColor.b)
    circle(piece.x, piece.y, piece.diameter)
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
  player.pieces = range.map(e => new Piece(gameSettings.width / 2, gameSettings.height / 2, gameSettings.diameter, player.color))
}

let defineCurrentPlayer = (p1, p2) => {
  return p1.hasTurn ? p1 : p2
}

let movementOfPiece = p => {
  p.x = mouseX
  p.y = mouseY
}

let putPieceOnPlatfrom = (piece, platform) => {
  let mapX = floor(map(piece.x, 0, gameSettings.xwidth, 0, gameSettings.rows))
  let mapY = floor(map(piece.y, 0, gameSettings.yheight, 0, gameSettings.cols))

  /* 
    We send to the server the position where we want to put a piece,
    If it is possible the server will put the piece in the platform,
    if not nothing will happen, also the server will change the turns if it has to
  */

  if(Math.sign(mapX) > -1 && Math.sign(mapY) > -1 && mapY <= gameSettings.rows - 1 && mapX <= gameSettings.cols - 1 && player.hasTurn) {
    socket.emit('putPiece', {pieceToInsert : piece, row : mapX, col : mapY})
  }
}

function mouseClicked() {
  putPieceOnPlatfrom(piece, platform)
}
