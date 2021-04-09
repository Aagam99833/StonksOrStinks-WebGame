const socket = io();

function form1DynamicPrice() {
    var company = document.getElementById("Company1").value;

    if(company == 1){
        document.getElementById("dynamicPrice1").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }else if(company == 2){
        document.getElementById("dynamicPrice1").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }else if(company == 3){
        document.getElementById("dynamicPrice1").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }else if(company == 4){
        document.getElementById("dynamicPrice1").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }else if(company == 5){
        document.getElementById("dynamicPrice1").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal1").value = document.getElementById("dynamicPrice1").value * document.getElementById("purchaseOrder1").value;
    }else if(company == 6){
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
    console.log(action + " " + company + " " + orderSize + " " + dynamicPrice + " " + TotalCost);

    socket.emit("PlayerActions", (action,company,orderSize));
}

function ifPass1() {
    if(document.getElementById("action1").value == 3){
        document.getElementById("Company1").disabled = true;
        document.getElementById("purchaseOrder1").disabled = true;
    }else{
        document.getElementById("Company1").disabled = false;
        document.getElementById("purchaseOrder1").disabled = false;
    }
}

function form2DynamicPrice() {
    var company = document.getElementById("Company2").value;

    if(company == 1){
        document.getElementById("dynamicPrice2").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }else if(company == 2){
        document.getElementById("dynamicPrice2").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }else if(company == 3){
        document.getElementById("dynamicPrice2").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }else if(company == 4){
        document.getElementById("dynamicPrice2").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }else if(company == 5){
        document.getElementById("dynamicPrice2").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }else if(company == 6){
        document.getElementById("dynamicPrice2").value = document.getElementById("infosysRate").innerHTML;
        document.getElementById("dynamicTotal2").value = document.getElementById("dynamicPrice2").value * document.getElementById("purchaseOrder2").value;
    }

}

function form2() {
    var action = document.getElementById("action2").value;
    var company = document.getElementById("Company2").value;
    var orderSize = document.getElementById("purchaseOrder2").value;
    var dynamicPrice = document.getElementById("dynamicPrice2").value;
    console.log(action + " " + company + " " + orderSize + " " + dynamicPrice);

}

function ifPass2() {
    if(document.getElementById("action2").value == 3){
        document.getElementById("Company2").disabled = true;
        document.getElementById("purchaseOrder2").disabled = true;
    }else{
        document.getElementById("Company2").disabled = false;
        document.getElementById("purchaseOrder2").disabled = false;
    }
}

function form3DynamicPrice() {
    var company = document.getElementById("Company3").value;

    if(company == 1){
        document.getElementById("dynamicPrice3").value = document.getElementById("wockRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }else if(company == 2){
        document.getElementById("dynamicPrice3").value = document.getElementById("hdfcRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }else if(company == 3){
        document.getElementById("dynamicPrice3").value = document.getElementById("tataRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }else if(company == 4){
        document.getElementById("dynamicPrice3").value = document.getElementById("ongcRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }else if(company == 5){
        document.getElementById("dynamicPrice3").value = document.getElementById("relianceRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }else if(company == 6){
        document.getElementById("dynamicPrice3").value = document.getElementById("infosysRate").innerHTML;
        document.getElementById("dynamicTotal3").value = document.getElementById("dynamicPrice3").value * document.getElementById("purchaseOrder3").value;
    }

}

function form3() {
    var action = document.getElementById("action3").value;
    var company = document.getElementById("Company3").value;
    var orderSize = document.getElementById("purchaseOrder3").value;
    var dynamicPrice = document.getElementById("dynamicPrice3").value;
    console.log(action + " " + company + " " + orderSize + " " + dynamicPrice);

}

function ifPass3() {
    if(document.getElementById("action3").value == 3){
        document.getElementById("Company3").disabled = true;
        document.getElementById("purchaseOrder3").disabled = true;
    }else{
        document.getElementById("Company3").disabled = false;
        document.getElementById("purchaseOrder3").disabled = false;
    }
}