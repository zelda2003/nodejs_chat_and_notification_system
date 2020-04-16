var app = require('http').createServer().listen(3001);
var io = require('socket.io').listen(app);

var AsteriskAmi = require('asterisk-manager');
var ami = new require('asterisk-manager')('25038','192.168.0.2','amilogin','amipassword', true);


io.sockets.on('connection', function(socket) {
    socket.emit('notification', {message: "connected"});
});

ami.on('managerevent', function(data) {
    console.log(data);
    io.sockets.emit('ami_event', data);
});

ami.connect(function(){
});