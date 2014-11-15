var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    "use strict";
    res.sendFile(__dirname + '/index.html');
});

var parseMessage = function (msg) {
    "use strict";
    if (/^Hello/im.test(msg)) {
        return "Hello to you too";
    }
    return null;
};

io.on('connection', function (socket) {
    "use strict";
    console.log('a user connected');
    io.emit('chat message', 'a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('chat message', 'a user disconnected');
    });

    socket.on('chat message', function (msg) {
        if (msg.length > 0) {
            console.log('message: ' + msg);
            io.emit('chat message', msg);

            var botResponse = parseMessage(msg);
            if (botResponse !== null) {
                io.emit('chat message', "Bot: " + botResponse);
            }
        }
    });
});

http.listen(3000, function () {
    "use strict";
    console.log('listening on *:3000');
});