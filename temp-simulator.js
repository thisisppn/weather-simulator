io = require('socket.io-client');
if (process.argv.length <= 2) {
    console.log("Usage: node " + __filename + " <city_id>");
    process.exit(-1);
}

var param = process.argv[2];

var socket = io('http://localhost:8081');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities-name-list.json', 'utf8'));

city = obj[param];

if(city === undefined){
    console.log('Invalid cityID provided. Max cityID is '+obj.length);
    process.exit(-1);
}

console.log('Providing temperature for '+city);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

socket.on('connect', function(){
    console.log("Connected to server");
    socket.emit('subscribe',{room:'temp'});

    setInterval(function(){
        socket.emit('temp-update', {city: city, temp:getRandomInt(0,40)});
    }, 5000);
});

socket.on('connect_failed', function(){
    console.log('Connection to server failed');
});

socket.on('reconnect_attempt', function(){
    console.log('Attempting to reconnect to server.');
});

socket.on('reconnect', function(){
    console.log('Reconnected to server successfully');
});

socket.on('reconnect_failed', function(){
    console.log('Reconnection failed: Looks like the server is down, please try again later');
    process.exit(-1);
});
