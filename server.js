var io = require('socket.io'),
    connect = require('connect'),
    chatter = require('chatter'),
    settings = require('./settings');

var app = connect().use(connect.static('public')).listen(settings.port);
var chat_room = io.listen(app);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function(socket) {
    chatter.connect_chatter({
        socket: socket,
        socketId: socket.id,
    });
});

var mongoose = require('mongoose');
var url = 'mongodb://' + settings.db.hostname + '/' + settings.db.name;

// Bootstrap db connection
mongoose.connect(url);

mongoose.connection.on('error', function(err) {
    console.log(new Date());
    console.log('Mongoose default connection error: ' + err);
});
