const socket = io.connect();

function startSinglePlayer() {
    var Username = document.getElementById('USERNAME').value.trim();
    if (Username.localeCompare("") == false) {
        alert("Enter Username");
    } else {
        socket.emit('SaveUsername', Username);
        socket.on('YourUserId',id => {
            console.log(id);
            localStorage.setItem('UserIdPass',id)
        })
        setInterval(() => {
            redirect('single');    
        }, 2000);
        
    }
}

function startMultiPlayer() {
    var Username = document.getElementById('USERNAME').value.trim();
    if (Username.localeCompare("") == false) {
        alert("Enter Username");
    } else {
        socket.emit('SaveUsername', Username);
        redirect('multi')
    }
}

function redirect(mode) {
    console.log(mode);
    if(mode == 'single'){
        console.log("TRUE");
        window.location.href = 'singlePlayer.html';
    }else{
        window.location.href = 'multiplayer.html';
    }
    
}