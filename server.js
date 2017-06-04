var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/client.html');
});

io.on('connection', function (socket) {
  socket.on('temp-update', function (data) {
    // Publish this temperature to all clients
    // sending to all clients in 'client' room except sender
    socket.to('client').emit('temp-update', data);
  });

  socket.on('disconnect', function(data){
    console.log(socket.id+" disconnected");
  });

  socket.on('subscribe', function(data){
    socket.join(data.room); //Subscribe the socket to respective rooms(client/temp)
    console.log(data.room+' connected to the server.');
  });

});