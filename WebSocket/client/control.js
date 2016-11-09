var socket = io();
var userId = "user";

$("#on_button").on('click', function(e){
    socket.emit('click', {value: 1, userId: userId}); // toogle light
});

$("#auto_button").on('click', function(e){
    socket.emit('click', {value: 2, userId: userId}); // activate auto mode
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
    console.log(element);
});

window.onunload = function(e) {
    socket.emit("user disconnect", userId);
}
