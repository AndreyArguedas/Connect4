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

io.on("connection", (socket) => {
  console.log("Welcome welcome");

  socket.on('start', function (data) {
    console.log("Ok empezemos")
  });

});


server.listen(port, () =>
  console.log(`*** Server is up and running on port ${port} ***`)
);
