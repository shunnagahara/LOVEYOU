const express = require('express');
const app = require('express')();
const server= require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){

    let nickName = ""; 

    socket.on('new comer', function(strNickname_){
      nickName = strNickname_;
      socket.broadcast.emit("new comer", nickName);
    });

    socket.on('disconnect',function(){
      socket.broadcast.emit("left", nickName);
    })

    socket.on('chat message', function(chat){
      io.emit('chat message', chat);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});	