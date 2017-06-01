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
console.log(city);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

socket.on('connect', function(){
    console.log("Connected to server");
    setInterval(function(){
        // socket.emit('temp-update', {city: getRandomInt(0,40)});
        socket.emit('temp-update', {city: city, temp:getRandomInt(0,40)});
    }, 5000);
});