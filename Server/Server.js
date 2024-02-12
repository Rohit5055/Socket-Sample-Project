const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'], // Replace with your React app's origin
    methods: ['GET', 'POST'],
    credentials: true // Allow cookies to be sent with requests
  },
  connectionStateRecovery: {}
});


app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('chat message', (msg) =>{
    console.log(" Message Received: ", msg);
    io.emit('chat message', msg);
  })

  socket.on('requestForConnection', (msg) =>{
    console.log(" Message Received at server: ", msg);
    io.emit('requestForConnection', "Acknowledged from server");
  })

  socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {
    if (err) {
      // the client did not acknowledge the event in the given delay
    } else {
      console.log(response.status); // 'ok'
    }
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


server.listen(5055, () => {
  console.log("server running at http://localhost:5055");
});
