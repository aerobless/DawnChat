var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bot = require('./botBehaviour');

var init = function () {
    "use strict";
    bot.initBot();
};
init();

app.get('/', function (req, res) {
    "use strict";
    res.sendFile(__dirname + '/index.html');
});

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

            var botResponse = bot.parseMessage(msg);
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