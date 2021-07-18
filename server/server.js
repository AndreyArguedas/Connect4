const express = require("express");
const path = require("path");
const http = require("http");
const socket = require('socket.io');

const GameSettings = require("./settings");
const RoomManager = require("./roomManager");

const port = process.env.PORT || 9090;
const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.set("port", port);

const server = http.createServer(app);

let io = socket(server);

let connections = [];

let serverRoomManager  = new RoomManager();

io.on("connection", (socket) => {
  console.log("Welcome welcome, someone has entered the server");

  console.log("Socket id :", socket.id, "has entered");

  connections.push(socket);

  // Get the Room Available
  let assignedRoom = serverRoomManager.assignRoom(socket);

  // Add the socket to the room
  socket.join(assignedRoom.getRoomName());

  //Let everyone in the room know that someone has joined
  io.to(assignedRoom.getRoomName()).emit('roomAssigned', {roomName : assignedRoom.getRoomName(), platform : assignedRoom.getPlatform(), player : assignedRoom.getPlayer(socket.id), settings : GameSettings});

  socket.on('putPiece', data => {
		let platform = assignedRoom.getPlatform()
    let pieceToInsert = data.pieceToInsert
    let row = data.row
    let col = data.col
    if (platform.existsNeighborAtBottom(row, col) && platform.isSpaceEmpty(row, col)) {
      platform.platform[row][col] = pieceToInsert
      assignedRoom.players.forEach( player => player.hasTurn = player.id !== socket.id )
      //Let everyone in the room know that the platform has change
      io.to(assignedRoom.getRoomName()).emit('gameUpdated', {roomName : assignedRoom.getRoomName(), platform : assignedRoom.getPlatform()})
    }
	});
  
  socket.on('disconnect', () => {
    console.log("The user with socket id :", socket.id, "has disconnected");
		connections.splice(connections.indexOf(socket), 1);
    serverRoomManager.removeFromRoom(socket);
	});

});


server.listen(port, () =>
  console.log(`*** Server is up and running on port ${port} ***`)
);
