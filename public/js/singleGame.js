const socket = io();

var UserId = localStorage['UserIdPass'];

class DataToSend {
    constructor(action, company, orderSize) {
        this.action = action
        this.company = company
        this.orderSize = orderSize
    }
}

class RoundEndData {
    constructor(userID,WockHolding,HdfcHolding,TataHolding,OngcHolding,
        RelHolding,InfoHolding,money,RoundNumber,
        WockPrice,HdfcPrice,TataPrice,OngcPrice,RelPrice,InfoPrice,
        cards) {
        this.userID = userID
        this.WockHolding = WockHolding
        this.HdfcHolding = HdfcHolding
        this.TataHolding = TataHolding
        this.OngcHolding = OngcHolding
        this.RelHolding = RelHolding
        this.InfoHolding = InfoHolding
        this.money = money
        this.RoundNumber = RoundNumber
        this.WockPrice = WockPrice
        this.HdfcPrice = HdfcPrice
        this.TataPrice = TataPrice
        this.OngcPrice = OngcPrice
        this.RelPrice = RelPrice
        this.InfoPrice = InfoPrice
        this.cards = cards
    }
}

socket.emit("SendPlayerData", UserId);

socket.on("RecievePlayerData", data => {
    console.log(data)
    document.getElementById("RoundNumber").innerHTML = "Round " + data.RoundNumber;
    document.getElementById("wockHold").innerHTML = data.WockHolding
    document.getElementById("hdfcHold").innerHTML = data.HdfcHolding
    document.getElementById("tataHold").innerHTML = data.TataHolding
    document.getElementById("ongcHold").innerHTML = data.OngcHolding
    document.getElementById("relHold").innerHTML = data.RelHolding
    document.getElementById("infoHold").innerHTML = data.InfoHolding
    document.getElementById("cashInHand").innerHTML = data.money
    document.getElementById("wockRate").innerHTML = data.WockPrice
    document.getElementById("hdfcRate").innerHTML = data.HdfcPrice
    document.getElementById("tataRate").innerHTML = data.TataPrice
    document.getElementById("ongcRate").innerHTML = data.OngcPrice
    document.getElementById("relianceRate").innerHTML = data.RelPrice
    document.getElementById("infosysRate").innerHTML = data.InfoPrice
})

var cardIndex = 1
var Cash;
var wockHold;
var hdfcHold;
var tataHold;
var ongcHold;
var relHold;
var infoHold;

var CardsData = []

setTimeout(() => {
    Cash = document.getElementById("cashInHand").innerHTML
    wockHold = document.getElementById("wockHold").innerHTML
    hdfcHold = document.getElementById("hdfcHold").innerHTML
    tataHold = document.getElementById("tataHold").innerHTML
    ongcHold = document.getElementById("ongcHold").innerHTML
    relHold = document.getElementById("relHold").innerHTML
    infoHold = document.getElementById("infoHold").innerHTML
}, 1000);

socket.emit("SendCards", UserId);
socket.on("ReceiveCard", cardsRecd => {
    document.getElementById("cardPoint" + cardIndex).innerText = cardsRecd[2]
    document.getElementById("cardCompany" + cardIndex).innerText = cardsRecd[1]
    document.getElementById("cardDes" + cardIndex).innerText = cardsRecd[3]
    CardsData[cardIndex-1] = cardsRecd;
    cardIndex++;
})

function form1DynamicPrice() {

    var company = document.getElementById("Company1").value;

    if (company == 1) {
        document.getElementById("dynamicPrice1").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    } else if (company == 2) {
        document.getElementById("dynamicPrice1").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    } else if (company == 3) {
        document.getElementById("dynamicPrice1").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    } else if (company == 4) {
        document.getElementById("dynamicPrice1").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    } else if (company == 5) {
        document.getElementById("dynamicPrice1").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    } else if (company == 6) {
        document.getElementById("dynamicPrice1").value = document.getElementById("infosysRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }

}

function form1() {

    var action = document.getElementById("action1").value;
    var company = document.getElementById("Company1").value;
    var orderSize = document.getElementById("purchaseOrder1").value;
    var dynamicPrice = document.getElementById("dynamicPrice1").value;
    var TotalCost = dynamicPrice * orderSize;

    if (company == 1) {
        company = "Wockhardt"
    } else if (company == 2) {
        company = "HDFC"
    } else if (company == 3) {
        company = "TATA"
    } else if (company == 4) {
        company = "ONGC"
    } else if (company == 5) {
        company = "Reliance"
    } else {
        company = "Infosys"
    }

    if (action == 1) {

        if (TotalCost <= Cash) {
            document.getElementById("action1").disabled = true;
            document.getElementById("Company1").disabled = true;
            document.getElementById("purchaseOrder1").disabled = true;
            document.getElementById("form1Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            Cash = Cash - TotalCost;
            if (company == "Wockhardt") {
                wockHold = parseInt(wockHold) + parseInt(orderSize);
                document.getElementById("wockHold").innerHTML = wockHold;
            } else if (company == "HDFC") {
                hdfcHold = parseInt(hdfcHold) + parseInt(orderSize);
                document.getElementById("hdfcHold").innerHTML = hdfcHold;
            } else if (company == "TATA") {
                tataHold = parseInt(tataHold) + parseInt(orderSize);
                document.getElementById("tataHold").innerHTML = tataHold;
            } else if (company == "ONGC") {
                ongcHold = parseInt(ongcHold) + parseInt(orderSize);
                document.getElementById("ongcHold").innerHTML = ongcHold;
            } else if (company == "Reliance") {
                relHold = parseInt(relHold) + parseInt(orderSize);
                document.getElementById("relHold").innerHTML = relHold;
            } else {
                infoHold = parseInt(infoHold) + parseInt(orderSize);
                document.getElementById("infoHold").innerHTML = infoHold;
            }
            document.getElementById("cashInHand").innerHTML = Cash
            socket.emit("PlayerData", DataSending);
        } else {
            alert("Not Enough Cash!")
        }

    } else if (action == 2) {
        var Temp;
        if (company == "Wockhardt") {
            Temp = "wockHold"
        } else if (company == "HDFC") {
            Temp = "hdfcHold"
        } else if (company == "TATA") {
            Temp = "tataHold"
        } else if (company == "ONGC") {
            Temp = "ongcHold"
        } else if (company == "Reliance") {
            Temp = "relHold"
        } else {
            Temp = "infoHold"
        }

        if (orderSize <= document.getElementById(Temp).innerHTML) {
            document.getElementById(Temp).innerHTML = parseInt(document.getElementById(Temp).innerHTML) - parseInt(orderSize);
            document.getElementById("action1").disabled = true;
            document.getElementById("Company1").disabled = true;
            document.getElementById("purchaseOrder1").disabled = true;
            document.getElementById("form1Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            document.getElementById("cashInHand").innerHTML = parseInt(document.getElementById("cashInHand").innerHTML) + TotalCost;
            socket.emit("PlayerData", DataSending);
        } else {
            alert("Not Enough Holding!")
        }
    }


}

function ifPass1() {
    if (document.getElementById("action1").value == 3) {
        document.getElementById("Company1").disabled = true;
        document.getElementById("purchaseOrder1").disabled = true;
    } else {
        document.getElementById("Company1").disabled = false;
        document.getElementById("purchaseOrder1").disabled = false;
    }
}

function form2DynamicPrice() {
    var company = document.getElementById("Company2").value;

    if (company == 1) {
        document.getElementById("dynamicPrice2").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    } else if (company == 2) {
        document.getElementById("dynamicPrice2").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    } else if (company == 3) {
        document.getElementById("dynamicPrice2").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    } else if (company == 4) {
        document.getElementById("dynamicPrice2").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    } else if (company == 5) {
        document.getElementById("dynamicPrice2").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    } else if (company == 6) {
        document.getElementById("dynamicPrice2").value = document.getElementById("infosysRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }

}

function form2() {
    var action = document.getElementById("action2").value;
    var company = document.getElementById("Company2").value;
    var orderSize = document.getElementById("purchaseOrder2").value;
    var dynamicPrice = document.getElementById("dynamicPrice2").value;
    var Cash = document.getElementById("cashInHand").innerHTML;
    var TotalCost = dynamicPrice * orderSize;

    if (company == 1) {
        company = "Wockhardt"
    } else if (company == 2) {
        company = "HDFC"
    } else if (company == 3) {
        company = "TATA"
    } else if (company == 4) {
        company = "ONGC"
    } else if (company == 5) {
        company = "Reliance"
    } else {
        company = "Infosys"
    }

    if (action == 1) {

        if (TotalCost <= Cash) {
            
            document.getElementById("action2").disabled = true;
            document.getElementById("Company2").disabled = true;
            document.getElementById("purchaseOrder2").disabled = true;
            document.getElementById("form2Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            socket.emit("PlayerData", DataSending);
            Cash = Cash - TotalCost;
            if (company == "Wockhardt") {
                wockHold = parseInt(wockHold) + parseInt(orderSize);
                document.getElementById("wockHold").innerHTML = wockHold;
            } else if (company == "HDFC") {
                hdfcHold = parseInt(hdfcHold) + parseInt(orderSize);
                document.getElementById("hdfcHold").innerHTML = hdfcHold;
            } else if (company == "TATA") {
                tataHold = parseInt(tataHold) + parseInt(orderSize);
                document.getElementById("tataHold").innerHTML = tataHold;
            } else if (company == "ONGC") {
                ongcHold = parseInt(ongcHold) + parseInt(orderSize);
                document.getElementById("ongcHold").innerHTML = ongcHold;
            } else if (company == "Reliance") {
                relHold = parseInt(relHold) + parseInt(orderSize);
                document.getElementById("relHold").innerHTML = relHold;
            } else {
                infoHold = parseInt(infoHold) + parseInt(orderSize);
                document.getElementById("infoHold").innerHTML = infoHold;
            }
            document.getElementById("cashInHand").innerHTML = Cash
        }
    } else if (action == 2) {
        var Temp;
        if (company == "Wockhardt") {
            Temp = "wockHold"
        } else if (company == "HDFC") {
            Temp = "hdfcHold"
        } else if (company == "TATA") {
            Temp = "tataHold"
        } else if (company == "ONGC") {
            Temp = "ongcHold"
        } else if (company == "Reliance") {
            Temp = "relHold"
        } else {
            Temp = "infoHold"
        }
        
        if (orderSize <= document.getElementById(Temp).innerHTML) {
            document.getElementById(Temp).innerHTML = parseInt(document.getElementById(Temp).innerHTML) - parseInt(orderSize);
            document.getElementById("action2").disabled = true;
            document.getElementById("Company2").disabled = true;
            document.getElementById("purchaseOrder2").disabled = true;
            document.getElementById("form2Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            document.getElementById("cashInHand").innerHTML = parseInt(document.getElementById("cashInHand").innerHTML) + TotalCost;
            socket.emit("PlayerData", DataSending);
        } else {
            alert("Not Enough Holding!")
        }
    }
}

function ifPass2() {
    if (document.getElementById("action2").value == 3) {
        document.getElementById("Company2").disabled = true;
        document.getElementById("purchaseOrder2").disabled = true;
    } else {
        document.getElementById("Company2").disabled = false;
        document.getElementById("purchaseOrder2").disabled = false;
    }
}

function form3DynamicPrice() {
    var company = document.getElementById("Company3").value;

    if (company == 1) {
        document.getElementById("dynamicPrice3").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    } else if (company == 2) {
        document.getElementById("dynamicPrice3").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    } else if (company == 3) {
        document.getElementById("dynamicPrice3").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    } else if (company == 4) {
        document.getElementById("dynamicPrice3").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    } else if (company == 5) {
        document.getElementById("dynamicPrice3").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    } else if (company == 6) {
        document.getElementById("dynamicPrice3").value = document.getElementById("infosysRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }

}

function form3() {
    var action = document.getElementById("action3").value;
    var company = document.getElementById("Company3").value;
    var orderSize = document.getElementById("purchaseOrder3").value;
    var dynamicPrice = document.getElementById("dynamicPrice3").value;
    var Cash = document.getElementById("cashInHand").innerHTML;
    var TotalCost = dynamicPrice * orderSize;

    if (company == 1) {
        company = "Wockhardt"
    } else if (company == 2) {
        company = "HDFC"
    } else if (company == 3) {
        company = "TATA"
    } else if (company == 4) {
        company = "ONGC"
    } else if (company == 5) {
        company = "Reliance"
    } else {
        company = "Infosys"
    }

    if (action == 1) {

        if (TotalCost <= Cash) {

            document.getElementById("action3").disabled = true;
            document.getElementById("Company3").disabled = true;
            document.getElementById("purchaseOrder3").disabled = true;
            document.getElementById("form3Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            socket.emit("PlayerData", DataSending);
            Cash = Cash - TotalCost;
            if (company == "Wockhardt") {
                wockHold = parseInt(wockHold) + parseInt(orderSize);
                document.getElementById("wockHold").innerHTML = wockHold;
            } else if (company == "HDFC") {
                hdfcHold = parseInt(hdfcHold) + parseInt(orderSize);
                document.getElementById("hdfcHold").innerHTML = hdfcHold;
            } else if (company == "TATA") {
                tataHold = parseInt(tataHold) + parseInt(orderSize);
                document.getElementById("tataHold").innerHTML = tataHold;
            } else if (company == "ONGC") {
                ongcHold = parseInt(ongcHold) + parseInt(orderSize);
                document.getElementById("ongcHold").innerHTML = ongcHold;
            } else if (company == "Reliance") {
                relHold = parseInt(relHold) + parseInt(orderSize);
                document.getElementById("relHold").innerHTML = relHold;
            } else {
                infoHold = parseInt(infoHold) + parseInt(orderSize);
                document.getElementById("infoHold").innerHTML = infoHold;
            }
            document.getElementById("cashInHand").innerHTML = Cash
        }
    } else if (action == 2) {
        var Temp;
        if (company == "Wockhardt") {
            Temp = "wockHold"
        } else if (company == "HDFC") {
            Temp = "hdfcHold"
        } else if (company == "TATA") {
            Temp = "tataHold"
        } else if (company == "ONGC") {
            Temp = "ongcHold"
        } else if (company == "Reliance") {
            Temp = "relHold"
        } else {
            Temp = "infoHold"
        }

        if (orderSize <= document.getElementById(Temp).innerHTML) {
            document.getElementById(Temp).innerHTML = parseInt(document.getElementById(Temp).innerHTML) - parseInt(orderSize);
            document.getElementById("action3").disabled = true;
            document.getElementById("Company3").disabled = true;
            document.getElementById("purchaseOrder3").disabled = true;
            document.getElementById("form3Submit").disabled = true;
            let DataSending = new DataToSend(action, company, orderSize)
            document.getElementById("cashInHand").innerHTML = parseInt(document.getElementById("cashInHand").innerHTML) + TotalCost;
            socket.emit("PlayerData", DataSending);
        } else {
            alert("Not Enough Holding!")
        }
    }
}

function ifPass3() {
    if (document.getElementById("action3").value == 3) {
        document.getElementById("Company3").disabled = true;
        document.getElementById("purchaseOrder3").disabled = true;
    } else {
        document.getElementById("Company3").disabled = false;
        document.getElementById("purchaseOrder3").disabled = false;
    }
}

const ActionLogs = document.getElementById("logsOfActions");

socket.on("NotifResponse", ReceiveNotif => {
    const logsRecd = document.createElement('div')
    logsRecd.innerText = ReceiveNotif;
    ActionLogs.appendChild(logsRecd);
})