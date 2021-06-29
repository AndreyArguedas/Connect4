const express = require("express");
const path = require("path");
const http = require("http");
const socket = require('socket.io');

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

io.on("connection", (socket) => {
  console.log("Welcome welcome, someone has entered the server");

  connections.push(socket);

  socket.on('start', function (data) {
    console.log("The player that just arrived is", data.id);
  });


  socket.on('disconnect', () => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Someone, has been disconnected");
	});

});


server.listen(port, () =>
  console.log(`*** Server is up and running on port ${port} ***`)
);
