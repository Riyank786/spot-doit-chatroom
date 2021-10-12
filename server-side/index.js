
// const FIREBASE_TOKEN = '1//0gMvCOvrSwdcLCgYIARAAGBASNwF-L9IrfriUjKj-xFwq30DcruouJyrjMTqSriNRpl4GsAuuNwZ6besjLssElAft-Vqylcn0hsA';

var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 8000);

// server = process.env.PORT || 8000;

app.get('/', function (req, res) {
    res.sendFile('../index.html')
  })

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      credentials: true
    }
  });


const users = {};

io.on('connection', socket => {


    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('userJoined', name, users[socket.id]);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
    })
})