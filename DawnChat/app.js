var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    "use strict";
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    "use strict";
    console.log('a user connected');
    io.emit('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('a user disconnected');
    });

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    "use strict";
    console.log('listening on *:3000');
});