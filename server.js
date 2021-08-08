const { Socket } = require("dgram");
const express = require("express");
const { request } = require("http");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 5501

http.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

// Socket

const io= require("socket.io")(http)

io.on("connection",(Socket)=>{
    console.log("connected....");
    Socket.on("message", (msg)=>{
        Socket.broadcast.emit("message", msg);
    })
})