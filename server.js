const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { fdatasync } = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var RoomIdArray = [];
var LockedRoomIdArray = [];
var clientNumber = [];
var userId = [];

class RoundStart {
    constructor(playerId, money, RoundNumber, WockHolding, HdfcHolding,
        TataHolding, OngcHolding, RelHolding, InfoHolding,
        WockPrice, HdfcPrice, TataPrice, OngcPrice, RelPrice, InfoPrice) {
        this.playerId = playerId
        this.money = money
        this.RoundNumber = RoundNumber
        this.WockHolding = WockHolding
        this.HdfcHolding = HdfcHolding
        this.TataHolding = TataHolding
        this.OngcHolding = OngcHolding
        this.RelHolding = RelHolding
        this.InfoHolding = InfoHolding
        this.WockPrice = WockPrice
        this.HdfcPrice = HdfcPrice
        this.TataPrice = TataPrice
        this.OngcPrice = OngcPrice
        this.RelPrice = RelPrice
        this.InfoPrice = InfoPrice
    }
}

var CardsData = [
    [1, "Wockhardt", -10, "Change in management"],
    [2, "Wockhardt", -5, "Patent registration not allowed"],
    [3, "Wockhardt", 5, "Good publicity"],
    [4, "Wockhardt", 10, "Break through in Diabetes medicine"],
    [5, "HDFC", -15, "Change in chairman"],
    [6, "HDFC", -10, "Large rights issue to finance expansion"],
    [7, "HDFC", -5, "Decrease in overseas business"],
    [8, "HDFC", 5, "Good publicity"],
    [9, "HDFC", 10, "Year end profit better than expected"],
    [10, "HDFC", 15, "Dividend doubles that of last year"],
    [11, "TATA", -15, "Uncertain economic outlook"],
    [12, "TATA", -10, "Unexpected increase in inflation"],
    [13, "TATA", -5, "Increase in bank interest rate"],
    [14, "TATA", 5, "Good publicity"],
    [15, "TATA", 10, "Favourable government policies"],
    [16, "TATA", 15, "Excellent yearly performance"],
    [17, "ONGC", -20, "Increase in excise duty"],
    [18, "ONGC", -15, "Government restrictions on import"],
    [19, "ONGC", -10, "Competition increases"],
    [20, "ONGC", -5, "Overall depression in share market"],
    [21, "ONGC", 5, "Good publicity"],
    [22, "ONGC", 10, "Increased productivity"],
    [23, "ONGC", 15, "High demand in overseas market"],
    [24, "ONGC", 20, "Expected bonus share isses"],
    [25, "Reliance", -25, "New tax levied"],
    [26, "Reliance", -20, "Baltic freight index falls"],
    [27, "Reliance", -15, "Government restrictions on import"],
    [28, "Reliance", -10, "International increase in oil prices"],
    [29, "Reliance", -5, "New product of rival company successful"],
    [30, "Reliance", 5, "Good publicity"],
    [31, "Reliance", 10, "Excise duty reduced"],
    [32, "Reliance", 15, "High demand of new product"],
    [33, "Reliance", 20, "Achieved No.1 in status world wide"],
    [34, "Reliance", 25, "Unexpected increase in profit"],
    [35, "Infosys", -30, "Government implements uncertain policies"],
    [36, "Infosys", -25, "Overseas big order cancelled"],
    [37, "Infosys", -20, "Closure of one unit in Asia"],
    [38, "Infosys", -15, "Rumors of increased taxes in budget"],
    [39, "Infosys", -10, "Uncertain economic outlook"],
    [40, "Infosys", -5, "Fluctuations in share market"],
    [41, "Infosys", 5, "Good publicity"],
    [42, "Infosys", 10, "Encouraging half yearly results"],
    [43, "Infosys", 15, "Discount to shareholders"],
    [44, "Infosys", 20, "MOU signed for corporate"],
    [45, "Infosys", 25, "Operations extended in other countries"],
    [46, "Infosys", 30, "Announcement of bonus shares"],
]

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.emit('message', 'HELLO CLIENT');

    socket.on('ROOMID', ROOMID => {
        RoomIdArray.push(ROOMID);
        socket.join(ROOMID);
        console.log("CLIENT CREATED ROOM: " + ROOMID);
        clientNumber[ROOMID] = 1;
    });

    socket.on('JOINID', JoinId => {
        for (var i = 0; i < RoomIdArray.length; i++) {
            if (JoinId == RoomIdArray[i]) {
                if (clientNumber[JoinId] < 4) {
                    socket.join(JoinId);
                    console.log("CLIENT JOINED ROOM: " + JoinId);
                    socket.emit("RoomExist", true);
                    clientNumber[JoinId] += 1;
                    console.log(clientNumber[JoinId]);
                } else {
                    socket.emit('FullRoom', 'Room Is Full');
                    delete RoomIdArray[JoinId];
                    LockedRoomIdArray.push(JoinId);
                    RoomIdArray.forEach(element => {
                        console.log("ROOMIDARRAY: " + element);
                    });
                    LockedRoomIdArray.forEach(element => {
                        console.log("LOCKED: " + element);
                    });
                }
            } else {
                console.log("ROOM DOESNT EXIST");
                socket.emit("RoomExist", false);
            }
        }
    });

    socket.on("PlayerData", Data => {

        if (Data.action == 1) {
            var SendNotif = "Player bought " + Data.orderSize + " shares of " + Data.company;
        } else if (Data.action == 2) {
            var SendNotif = "Player sold " + Data.orderSize + " shares of " + Data.company;
        } else {
            var SendNotif = "Player passed a turn";
        }

        io.emit("NotifResponse", SendNotif);
    })

    socket.on('SaveUsername', data => {
        userId[socket.id] = data;
        userId[socket.id] = new RoundStart(data, 500000, 1, 0, 0, 0, 0, 0, 0,
            20, 30, 40, 50, 60, 80)
        socket.emit("YourUserId", socket.id)
    });

    var Cards = [];

    socket.on("SendCards", IdForCards => {
        Cards[IdForCards] = []
        for (var i = 0; i < 6; i++) {
            var index = Math.floor((Math.random() * 46) + 1);
            Cards[IdForCards][i] = CardsData[index];
            socket.emit("ReceiveCard", CardsData[index]);
        }
    })

    socket.on("SendEndResult", data => {

        data.RoundNumber = data.RoundNumber.substr(6)
        var incRound = data.RoundNumber
        incRound++
        data.RoundNumber = incRound;

        for (var i = 0; i < 6; i++) {
            if (data.cards[i][1] == "Wockhardt") {
                data.WockPrice = data.WockPrice + data.cards[i][2]
            } else if (data.cards[i][1] == "HDFC") {
                data.HdfcPrice = data.HdfcPrice + data.cards[i][2]
            } else if (data.cards[i][1] == "TATA") {
                data.TataPrice = data.TataPrice + data.cards[i][2]
            } else if (data.cards[i][1] == "ONGC") {
                data.OngcPrice = data.OngcPrice + data.cards[i][2]
            } else if (data.cards[i][1] == "Reliance") {
                data.RelPrice = data.RelPrice + data.cards[i][2]
            } else {
                data.InfoPrice = data.InfoPrice + data.cards[i][2]
            }
        }
        userId[data.userID] = data;
        console.log(userId[data.userID])
    })

    socket.on("SendPlayerData", userID => {
        socket.emit("RecievePlayerData", userId[userID]);
    })

});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ' + PORT + ' '));