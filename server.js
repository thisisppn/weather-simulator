var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/client.html');
});

io.on('connection', function (socket) {
  console.log("Someone connected to the server");
  socket.on('temp-update', function (data) {
    console.log(data);
    // Publish this temperature to all clients
    // sending to all clients in 'client' room except sender
    socket.to('client').emit('temp-update', data);
    
  });

  socket.on('disconnect', function(data){
    console.log("Someone disconnected");
  });

  socket.on('subscribe', function(data){
    socket.join('client');
  });

});