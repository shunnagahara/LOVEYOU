const express = require('express');
const app = require('express')();
const server= require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){

    // socket.broadcast.emit('new comer', socket);

    socket.on('new comer', function(cht){
      socket.broadcast.emit("new comer", cht);　//送信元以外の全員に送信
    });

    socket.on('chat message', function(cht){
      io.emit('chat message', cht);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});	