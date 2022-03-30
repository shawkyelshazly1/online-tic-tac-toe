const express = require("express"),
  cors = require("cors"),
  http = require("http");
const { initSocketIO } = require("./socketIO/socketio");

require("dotenv").config();

// Express app & HTTP server instances
const app = express();
const server = http.createServer(app);

//setting Socket IO server with httpserver
initSocketIO(server);

// starting server
server.listen(process.env.PORT, () => {
  console.log(`Server started on port: 4000`);
});
