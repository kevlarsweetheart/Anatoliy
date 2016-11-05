var socket = io();
var userId = "user";


$('form').submit(function() {
    socket.emit('chat message', {value: $('#m').val(), userId: userId});
    $('#m').val('');
    return false;
});

$("#on_button").on('click', function(e){
    socket.emit('click', {value: 1, userId: userId});
});  

$("#off_button").on('click', function(e){
    socket.emit('click', {value: 0, userId: userId});
});

$("#auto_button").on('click', function(e){
    socket.emit('click', {value: 2, userId: userId});
});

socket.on('button pressed', function(msg) {
    var state = "";
    if (msg.value === 0)
        state = "off";
    if (msg.value === 1)
        state = "on";
    if (msg.value === 2)
        state = "auto";
    $('#messages').prepend($('<li> bulb\'s state changed to <b>' + state + '</b><span> - '+msg.userId+'</span></li>'));
});

socket.on('chat message', function(msg) {
    $('#messages').prepend($('<li>'+msg.value+'<span> - '+msg.userId+'</span></li>'));
});

socket.on('connected users', function(msg) {
    $('#user-container').html("");
    for(var i = 0; i < msg.length; i++) {
        //console.log(msg[i]+" )msg[i] == userId( "+userId);
        if(msg[i] == userId)
            $('#user-container').append($("<div id='" + msg[i] + "' class='my-circle'><span>"+msg[i]+"</span></div>"));
        else
            $('#user-container').append($("<div id='" + msg[i] + "' class='user-circle'><span>"+msg[i]+"</span></div>"));
    }
});

socket.on('user connect', function(msg) {
    if(userId === "user"){
        console.log("Client side userId: "+msg);
        userId = msg;
    }
});

socket.on('user disconnect', function(msg) {
    console.log("user disconnect: " + msg);
    var element = '#'+msg;
    console.log(element)
    $(element).remove();
});

window.onunload = function(e) {
    socket.emit("user disconnect", userId);
}