var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/client.html');
});

io.on('connection', function (socket) {
  console.log("Someone connected to the server");
  socket.on('temp-update', function (data) {
    // Publish this temperature to all clients
    // sending to all clients in 'client' room except sender
    socket.to('client').emit('temp-update', data);
  });

  socket.on('disconnect', function(data){
    console.log("A socket disconnected");
  });

  socket.on('subscribe', function(data){
    socket.join('client');
  });

});