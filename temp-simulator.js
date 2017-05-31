io = require('socket.io-client');
var socket = io('http://localhost:8081');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

socket.on('connect', function(){
    console.log("Connected to server");
    setInterval(function(){
        socket.emit('temp-update', {'tinsukia': getRandomInt(0,40)});
    }, 1000);
});