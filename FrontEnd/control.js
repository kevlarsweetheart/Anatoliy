var socket = io();
var userId = "user";

$("#on_button").on('click', function(e){
    socket.emit('click', {value: 1, userId: userId}); // toogle light
});

$("#auto_button").on('click', function(e){
    socket.emit('click', {value: 2, userId: userId}); // activate auto mode
});
