const socket = io();

var myRoomId;

socket.on('message', message =>{
    console.log(message);
})

function createRoomButton() {
    const ROOMID = Date.now();
    myRoomId = ROOMID;
    socket.emit('ROOMID', ROOMID);
    window.location.replace("/gamePage.html")
}

function roomIdSubmitButton() {
    var getRoomID = document.getElementById("roomIdInput").value;
    console.log(getRoomID);
    socket.emit('JOINID', getRoomID);
}

socket.on('RoomExist', isExist => {
    if(isExist == true){
        console.log(isExist);
        window.location.replace("/gamePage.html")
    }else{
        alert("ROOM DOESNT EXIST");
    }
})

socket.on("FullRoom", fullRoom => {
    alert(fullRoom);
});

